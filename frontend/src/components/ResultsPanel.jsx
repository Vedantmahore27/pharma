import React from 'react'
import { motion } from 'framer-motion'
import RiskCard from './results/RiskCard'
import ProfileCard from './results/ProfileCard'
import RecommendationCard from './results/RecommendationCard'
import ExplanationCard from './results/ExplanationCard'
import JsonViewer from './results/JsonViewer'

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function ResultsPanel({ data, isClinicalMode = true }) {
  if (!data) return null

  // Normalize backend response: handle both single-drug object and multi-drug array
  const result = Array.isArray(data) ? data[0] : data

  // Map from backend snake_case structure to component-friendly props
  const riskAssessment = result.risk_assessment || {}
  const profile = result.pharmacogenomic_profile || {}
  const recommendation = result.clinical_recommendation || {}
  const explanation = result.llm_generated_explanation || {}

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      <motion.div
        className="col-span-1"
        variants={cardVariant} custom={0}
        initial="hidden" animate="visible"
      >
        <RiskCard
          riskLabel={riskAssessment.risk_label}
          confidence={riskAssessment.confidence_score}
          severity={riskAssessment.severity}
        />
      </motion.div>

      <motion.div
        className="col-span-1"
        variants={cardVariant} custom={1}
        initial="hidden" animate="visible"
      >
        <ProfileCard
          gene={profile.primary_gene}
          diplotype={profile.diplotype}
          phenotype={profile.phenotype}
          variants={profile.detected_variants}
        />
      </motion.div>

      <motion.div
        className="col-span-1"
        variants={cardVariant} custom={2}
        initial="hidden" animate="visible"
      >
        <RecommendationCard
          suggestion={recommendation.suggestion}
          drug={result.drug}
        />
      </motion.div>

      {isClinicalMode && (
        <>
          <motion.div
            className="col-span-1 md:col-span-2"
            variants={cardVariant} custom={3}
            initial="hidden" animate="visible"
          >
            <ExplanationCard
              summary={explanation.summary}
              mechanism={explanation.mechanism}
              clinicalImpact={explanation.clinical_impact}
            />
          </motion.div>

          <motion.div
            className="col-span-1"
            variants={cardVariant} custom={4}
            initial="hidden" animate="visible"
          >
            <JsonViewer json={result} />
          </motion.div>
        </>
      )}
    </div>
  )
}
