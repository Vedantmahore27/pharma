import React from 'react'
import { motion } from 'framer-motion'

/* Custom DNA-style spinner SVG */
function DNASpinner() {
  return (
    <svg className="w-6 h-6 dna-spin" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="17" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
      <path
        d="M20 3 C28 8, 28 14, 20 20 C12 26, 12 32, 20 37"
        stroke="url(#dnaGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="dnaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4c4" />
          <stop offset="100%" stopColor="#6fe8dd" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function AnalyzeButton({ onClick, loading, disabled }) {
  const isDisabled = loading || disabled

  return (
    <div className="w-full text-center">
      <motion.button
        onClick={onClick}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.04, brightness: 1.1 } : {}}
        whileTap={!isDisabled ? { scale: 0.97 } : {}}
        className={`
          relative px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider
          transition-all duration-300
          ${isDisabled
            ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 text-navy-900 glow-btn shadow-lg hover:shadow-teal-400/20'
          }
        `}
      >
        {loading ? (
          <div className="flex items-center gap-3 justify-center">
            <DNASpinner />
            <span className="text-white font-semibold normal-case tracking-normal">
              Analyzing DNA...
            </span>
          </div>
        ) : (
          <span className="flex items-center gap-2 justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Run Analysis
          </span>
        )}
      </motion.button>

      {!loading && disabled && (
        <p className="text-xs text-slate-600 mt-3">Upload a VCF file to begin</p>
      )}
    </div>
  )
}
