/**
 * services/geminiService.js
 *
 * Generates clinically-grounded pharmacogenomic explanations using Google Gemini.
 *
 * CRITICAL DESIGN RULE:
 *   The LLM does NOT perform risk calculations.
 *   Risk is determined by riskEngine.js (deterministic rules).
 *   Gemini is used ONLY to produce human-readable explanations for pre-computed findings.
 *
 * Gemini is prompted to return strict JSON:
 *   { "summary": "...", "mechanism": "...", "clinical_impact": "..." }
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Lazy-initialized Gemini model (avoids crashes if key is missing at import time)
let geminiModel = null;
let geminiModelName = null;

/**
 * Initialize and cache the Gemini GenerativeModel instance.
 * Returns null if GEMINI_API_KEY is not set in the environment.
 */
async function getGeminiModel(refresh = false) {
  if (geminiModel && !refresh) return geminiModel;
  if (!process.env.GEMINI_API_KEY) return null;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Try to discover a supported model. Prefer a short list, but fall back to any available model.
  const preferred = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'text-bison@001'];
  let chosen = null;

  if (typeof genAI.listModels === 'function') {
    try {
      const listResp = await genAI.listModels();
      const models = Array.isArray(listResp?.models) ? listResp.models : listResp || [];
      const names = models.map((m) => m.name || m.id || m.model).filter(Boolean);
      chosen = preferred.find((p) => names.includes(p));
      if (!chosen) chosen = names.find((n) => /gemini|bison|palm|palm2/i.test(n));
    } catch (err) {
      console.warn('[Gemini] Failed to list models:', err.message);
    }
  }

  if (!chosen) chosen = preferred[0];

  try {
    geminiModel = genAI.getGenerativeModel({
      model: chosen,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 700,
        responseMimeType: 'application/json',
      },
    });
    geminiModelName = chosen;
    console.log(`[Gemini] Using model: ${chosen}`);
    return geminiModel;
  } catch (err) {
    console.error(`[Gemini] Failed to initialize model ${chosen}: ${err.message}`);
    geminiModel = null;
    geminiModelName = null;
    return null;
  }
}

/**
 * Build the structured Gemini prompt.
 * Provides the pre-computed risk findings and asks for a three-field JSON explanation.
 *
 * @param {object} params
 * @param {string} params.drug
 * @param {string} params.gene
 * @param {string} params.diplotype
 * @param {string} params.phenotype
 * @param {string} params.riskLabel
 * @param {Array}  params.detectedVariants  - [{ rsid: 'rs...' }]
 * @returns {string} Prompt string
 */
function buildPrompt({ drug, gene, diplotype, phenotype, riskLabel, detectedVariants }) {
  const rsidList = detectedVariants.map((v) => v.rsid).join(', ') || 'none detected';

  return `You are a pharmacogenomics assistant explaining genetic drug risk in simple, easy-to-understand language.

IMPORTANT:
The risk has ALREADY been calculated. 
Do NOT change or question the risk label.
Your job is only to explain it clearly.

Pre-computed findings:
- Drug: ${drug}
- Gene involved: ${gene}
- Patient Diplotype: ${diplotype}
- Metabolizer Type: ${phenotype}
- Risk Label: ${riskLabel}
- Detected Variant rsIDs: ${rsidList}

Instructions:
1. Return ONLY a valid JSON object — no markdown, no code fences, no extra text.
2. Use simple language. Avoid complex medical terms.
3. If a medical term must be used, explain it briefly.
4. Do NOT fabricate claims.
5. If scientific evidence is limited, clearly mention uncertainty.
6. Keep tone informative and reassuring — not alarming.

Required JSON schema:
{
  "summary": "2–3 sentences explaining in simple terms what this result means for the patient.",
  "mechanism": "2–3 sentences explaining in easy language how this gene affects how the body handles the drug.",
  "clinical_impact": "2–3 sentences explaining what this means for dosing or treatment decisions."
}`;
}


/**
 * Rule-based fallback explanation — used when Gemini is unavailable or fails.
 * Ensures the API always returns a complete response even without LLM access.
 */
function generateFallbackExplanation({ drug, gene, diplotype, phenotype, riskLabel }) {
  const drugName = drug.charAt(0) + drug.slice(1).toLowerCase();

  const summaries = {
    Safe: `This patient's ${gene} diplotype (${diplotype}) confers a ${phenotype} phenotype, indicating standard ${drugName} metabolism. No pharmacogenomic dose adjustment is required.`,
    'Adjust Dosage': `The ${gene} ${diplotype} diplotype results in a ${phenotype} phenotype with reduced enzymatic activity. ${drugName} dosing may need adjustment to prevent suboptimal plasma levels.`,
    Toxic: `The patient's ${gene} ${diplotype} diplotype yields a ${phenotype} phenotype that substantially impairs ${drugName} clearance or over-produces its active metabolite, posing a high toxicity risk.`,
    Ineffective: `With ${gene} diplotype ${diplotype} and a ${phenotype} phenotype, the patient lacks sufficient enzymatic capacity to activate ${drugName} (a prodrug). The drug is unlikely to provide therapeutic benefit.`,
    Unknown: `Pharmacogenomic guidance is unavailable for ${drugName}. Standard clinical protocols should be followed.`,
  };

  const mechanisms = {
    Safe: `${gene} encodes a key phase-I drug-metabolizing enzyme. A normal diplotype preserves full enzymatic activity, ensuring ${drugName} is processed at expected rates without accumulation or under-conversion.`,
    'Adjust Dosage': `Reduced-function alleles in ${gene} lower enzyme expression or catalytic efficiency. This impairs normal ${drugName} processing, leading to altered plasma pharmacokinetics compared to normal metabolizers.`,
    Toxic: `Non-functional alleles in ${gene} abolish or critically reduce enzymatic capacity. Depending on drug type, this results in either accumulation of the parent drug or excessive production of an active and potentially harmful metabolite.`,
    Ineffective: `${gene} is required to bioactivate ${drugName} from its prodrug form. Loss-of-function variants prevent this metabolic step, meaning the active moiety is never adequately formed at the target site.`,
    Unknown: `The drug-gene interaction for ${drugName} has not been fully characterized in available pharmacogenomic evidence bases, or no relevant variants were detected in the uploaded VCF file.`,
  };

  const impacts = {
    Safe: `Standard dosing per the FDA label is appropriate. Routine therapeutic drug monitoring is recommended per institutional protocol. No CPIC-based dose modification is indicated for this phenotype.`,
    'Adjust Dosage': `CPIC guidelines recommend a dose reduction or extended dosing interval. Therapeutic drug monitoring is advised to individualize therapy. Clinical pharmacist consultation is recommended.`,
    Toxic: `CPIC strongly recommends avoiding this drug or using the minimum effective dose with intensive monitoring. A pharmacogenomically-appropriate alternative therapy should be selected in consultation with a clinical pharmacist or geneticist.`,
    Ineffective: `Select an alternative medication with a different metabolic pathway. CPIC guidelines do not recommend this prodrug in patients with a PM phenotype. Review alternative agents with the prescribing team.`,
    Unknown: `Manual clinical review is required. Comprehensive pharmacogenomic panel testing may be warranted if clinically indicated. Adhere to standard evidence-based prescribing guidelines in the absence of PGx data.`,
  };

  return {
    summary: summaries[riskLabel] ?? summaries['Unknown'],
    mechanism: mechanisms[riskLabel] ?? mechanisms['Unknown'],
    clinical_impact: impacts[riskLabel] ?? impacts['Unknown'],
  };
}

/**
 * Main entry point: generate an LLM-based explanation for a pharmacogenomic finding.
 * Falls back to rule-based templates gracefully on any error or missing API key.
 *
 * @param {object} params - { drug, gene, diplotype, phenotype, riskLabel, detectedVariants }
 * @returns {Promise<{ summary: string, mechanism: string, clinical_impact: string }>}
 */
async function generateExplanation(params) {
  let model = await getGeminiModel();

  if (!model) {
    console.warn('[Gemini] GEMINI_API_KEY not set or model init failed — using rule-based fallback explanation.');
    return generateFallbackExplanation(params);
  }

  try {
    const prompt = buildPrompt(params);
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    if (!rawText) throw new Error('Gemini returned an empty response.');

    // Strip any accidental markdown code fences before parsing
    const cleanText = rawText.replace(/```json|```/gi, '').trim();
    const parsed = JSON.parse(cleanText);

    // Validate all required fields are present and non-empty
    if (!parsed.summary || !parsed.mechanism || !parsed.clinical_impact) {
      throw new Error('Gemini JSON response is missing required fields.');
    }

    return {
      summary: parsed.summary,
      mechanism: parsed.mechanism,
      clinical_impact: parsed.clinical_impact,
    };
  } catch (err) {
    console.error(`[Gemini] API call failed: ${err.message}`);

    // If error indicates model not found, try refreshing model selection once
    if (/not found|404|is not found/i.test(err.message)) {
      console.warn('[Gemini] Model not found — refreshing model list and retrying once.');
      const refreshed = await getGeminiModel(true);
      if (refreshed) {
        try {
          const prompt = buildPrompt(params);
          const result = await refreshed.generateContent(prompt);
          const rawText = result.response.text();
          const cleanText = rawText.replace(/```json|```/gi, '').trim();
          const parsed = JSON.parse(cleanText);
          if (parsed.summary && parsed.mechanism && parsed.clinical_impact) {
            return {
              summary: parsed.summary,
              mechanism: parsed.mechanism,
              clinical_impact: parsed.clinical_impact,
            };
          }
        } catch (retryErr) {
          console.error('[Gemini] Retry failed:', retryErr.message);
        }
      }
    }

    console.error('[Gemini] Falling back to rule-based templates.');
    return generateFallbackExplanation(params);
  }
}

module.exports = { generateExplanation };
