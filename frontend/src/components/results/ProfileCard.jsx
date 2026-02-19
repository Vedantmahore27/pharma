import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 text-purpleTheme-400/70">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
        <div className="text-sm text-white font-medium">{value || '—'}</div>
      </div>
    </div>
  )
}

export default function ProfileCard({ gene, diplotype, phenotype, variants }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass glass-hover p-6 rounded-2xl h-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-purpleTheme-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
          </svg>
          <h4 className="font-semibold text-white">Pharmacogenomic Profile</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-purpleTheme-400 group-hover:text-purpleTheme-300 transition-colors">
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/5 space-y-4 divide-y divide-white/5">
              <div className="divide-y divide-white/5">
                <InfoRow
                  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5" /></svg>}
                  label="Primary Gene"
                  value={gene}
                />
                <InfoRow
                  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>}
                  label="Diplotype"
                  value={diplotype}
                />
                <InfoRow
                  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>}
                  label="Phenotype"
                  value={phenotype}
                />
              </div>

              {/* Variants */}
              <div className="pt-4">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2.5">Detected Variants</div>
                <div className="flex flex-wrap gap-2">
                  {(variants || []).length > 0 ? (
                    variants.map((v, i) => (
                      <motion.span
                        key={typeof v === 'string' ? v : JSON.stringify(v)}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="chip"
                      >
                        {typeof v === 'string' ? v : v.rsid || v.id || JSON.stringify(v)}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-600">No variants detected</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
