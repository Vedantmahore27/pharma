import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DRUGS } from '../constants/drugs'

export default function DrugSelectCard({ selected, onChange }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleDrug(d) {
    if (selected.includes(d)) {
      onChange(selected.filter(s => s !== d))
    } else {
      onChange([...selected, d])
    }
  }

  function removeDrug(d, e) {
    e.stopPropagation()
    onChange(selected.filter(s => s !== d))
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-purpleTheme-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
        </svg>
        <h3 className="text-lg font-semibold text-white">Select Drugs</h3>
      </div>

      {/* Dropdown trigger */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full p-3.5 text-left rounded-xl glass transition-all duration-200 hover:border-purpleTheme-400/30 flex items-center justify-between"
        >
          <span className="text-slate-300 text-sm">
            {selected.length === 0 ? 'Choose drugs to analyze...' : `${selected.length} drug${selected.length > 1 ? 's' : ''} selected`}
          </span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-slate-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute z-50 mt-2 w-full rounded-xl overflow-hidden bg-[#05000a] backdrop-blur-xl border border-purpleTheme-500/30 shadow-2xl shadow-black"
            >
              <div className="py-1 max-h-52 overflow-y-auto">
                {DRUGS.map((d, i) => {
                  const isSelected = selected.includes(d)
                  return (
                    <motion.button
                      key={d}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => toggleDrug(d)}
                      className={`
                        w-full px-4 py-2.5 text-left text-sm flex items-center justify-between
                        transition-colors duration-150
                        ${isSelected
                          ? 'bg-purpleTheme-400/15 text-purpleTheme-300'
                          : 'text-slate-300 hover:bg-white/[0.03]'
                        }
                      `}
                    >
                      <span>{d}</span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-purpleTheme-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected chips */}
      <div className="mt-3 flex flex-wrap gap-2 min-h-[32px]">
        <AnimatePresence>
          {selected.map(d => (
            <motion.span
              key={d}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              className="chip"
            >
              {d}
              <button
                onClick={(e) => removeDrug(d, e)}
                className="hover:text-red-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {selected.length === 0 && (
        <p className="text-xs text-slate-600 mt-2">Select one or more drugs for analysis</p>
      )}
    </div>
  )
}
