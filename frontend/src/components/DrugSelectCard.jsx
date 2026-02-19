import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DRUGS } from '../constants/drugs'

export default function DrugSelectCard({ selected, onChange }) {
  function toggleDrug(d) {
    if (selected.includes(d)) {
      onChange(selected.filter(s => s !== d))
    } else {
      onChange([...selected, d])
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-purpleTheme-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
        </svg>
        <h3 className="text-lg font-semibold text-white">Select Drugs</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-grow">
        {DRUGS.map((d, i) => {
          const isSelected = selected.includes(d)
          return (
            <motion.button
              key={d}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleDrug(d)}
              className={`
                w-full px-3 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between
                transition-all duration-200 rounded-xl border
                ${isSelected
                  ? 'bg-purpleTheme-500/20 border-purpleTheme-500/50 text-purpleTheme-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10 hover:text-slate-200'
                }
              `}
            >
              <span className="truncate font-medium">{d}</span>
              {isSelected && (
                <svg className="w-4 h-4 text-purpleTheme-400 flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {selected.length === 0 && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-slate-500 mt-4 text-center overflow-hidden"
          >
            Select one or more drugs for analysis
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
