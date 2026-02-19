import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExplanationCard({ summary, mechanism, clinicalImpact }) {
  const [open, setOpen] = useState(false)
  const hasContent = summary || mechanism || clinicalImpact

  if (!hasContent) return (
    <div className="glass glass-hover p-6 rounded-2xl h-full">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
        <h4 className="font-semibold text-white">AI Explanation</h4>
      </div>
      <p className="text-sm text-slate-600 mt-3">No explanation available for this analysis.</p>
    </div>
  )

  /* Highlight variant references like rs12345, CYP2D6, *1/*2 etc. */
  function highlightText(text) {
    if (!text) return ''
    return text.replace(
      /(rs\d+|CYP\w+|\*\d+\/\*\d+)/gi,
      '<mark class="bg-teal-400/15 text-teal-300 px-1 rounded font-medium">$1</mark>'
    )
  }

  return (
    <div className="glass glass-hover p-6 rounded-2xl h-full">
      {/* Header with toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <h4 className="font-semibold text-white">AI Explanation</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-teal-400 group-hover:text-teal-300 transition-colors">
            {open ? 'Collapse' : 'Expand'}
          </span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-4 h-4 text-slate-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/5 space-y-4">
              {/* Summary */}
              {summary && (
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Summary</div>
                  <div
                    className="text-sm text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightText(summary) }}
                  />
                </div>
              )}

              {/* Mechanism */}
              {mechanism && (
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Mechanism</div>
                  <div
                    className="text-sm text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightText(mechanism) }}
                  />
                </div>
              )}

              {/* Clinical Impact */}
              {clinicalImpact && (
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Clinical Impact</div>
                  <div
                    className="text-sm text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightText(clinicalImpact) }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
