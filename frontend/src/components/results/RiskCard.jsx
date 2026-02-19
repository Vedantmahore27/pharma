import React from 'react'
import { motion } from 'framer-motion'

const RISK_MAP = {
  safe: { label: 'Safe', bg: 'bg-purpleTheme-500/15', border: 'border-purpleTheme-500/30', text: 'text-purpleTheme-300', dot: 'bg-purpleTheme-400', glow: 'shadow-[0_0_20px_rgba(106,13,173,0.3)]' },
  adjust: { label: 'Adjust Dosage', bg: 'bg-purpleTheme-800/40', border: 'border-purpleTheme-500/50', text: 'text-purpleTheme-200', dot: 'bg-medicalRed-light', glow: 'shadow-[0_0_30px_rgba(106,13,173,0.5),0_0_20px_rgba(255,76,76,0.4)]' },
  toxic: { label: 'Toxic', bg: 'bg-medicalRed-dark/30', border: 'border-medicalRed-DEFAULT/50', text: 'text-medicalRed-light', dot: 'bg-medicalRed-light', glow: 'glow-red' },
  ineffective: { label: 'Ineffective', bg: 'bg-medicalRed-dark/10', border: 'border-medicalRed-light border-pulse-red', text: 'text-medicalRed-light', dot: 'bg-medicalRed-light', glow: 'error-shake shadow-[0_0_15px_rgba(211,47,47,0.2)]' },
}

function normalizeLevel(raw) {
  const l = (raw || '').toLowerCase()
  if (l === 'green' || l === 'safe' || l === 'low risk' || l === 'normal risk') return 'safe'
  if (l === 'yellow' || l === 'adjust' || l === 'moderate' || l === 'medium' || l === 'moderate risk' || l === 'adjusted dosing') return 'adjust'
  if (l === 'ineffective' || l === 'no effect') return 'ineffective'
  return 'toxic' // Default instead of danger
}

export default function RiskCard({ riskLabel, confidence, severity }) {
  const level = normalizeLevel(riskLabel)
  // confidence_score from backend is 0-1 float, convert to percentage
  const confPct = typeof confidence === 'number'
    ? (confidence <= 1 ? Math.round(confidence * 100) : Math.round(confidence))
    : 0
  const r = RISK_MAP[level]

  return (
    <div className={`glass glass-hover p-6 rounded-2xl h-full transition-all duration-300 ${r.glow} ${r.border ? 'border ' + r.border : ''}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-5 h-5 text-purpleTheme-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <h4 className="font-semibold text-white">Risk Assessment</h4>
      </div>

      {/* Risk Label Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[15px] font-bold border ${r.bg} ${r.border} ${r.text} shadow-lg`}
      >
        <span className={`w-2.5 h-2.5 rounded-full ${r.dot}`} />
        {riskLabel || r.label}
      </motion.div>

      {/* Confidence */}
      <div className="mt-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Confidence Score</span>
          <span className="text-sm font-semibold text-white">{confPct}%</span>
        </div>
        <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
          <motion.div
            className={`h-2.5 rounded-full bg-gradient-to-r ${level === 'safe' ? 'from-purpleTheme-500 to-purpleTheme-300' : 'from-medicalRed-dark to-medicalRed-light'}`}
            initial={{ width: 0 }}
            animate={{ width: `${confPct}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Severity */}
      <div className="mt-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
        <span className="text-sm text-slate-400">Severity:</span>
        <span className="text-sm text-white font-medium capitalize">{severity ?? 'N/A'}</span>
      </div>
    </div>
  )
}
