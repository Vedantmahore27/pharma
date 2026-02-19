import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JsonViewer({ json }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!json) return null
  const dump = JSON.stringify(json, null, 2)

  function copy() {
    navigator.clipboard.writeText(dump)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function download() {
    const blob = new Blob([dump], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pharmaguard-result.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="glass glass-hover p-6 rounded-2xl h-full flex flex-col">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          <h4 className="font-semibold text-white">Raw JSON</h4>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col min-h-0">
        <div className="border-t border-white/5 pt-4 flex flex-col h-full">
          {/* Action buttons */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={copy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-teal-400/20"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  <span className="text-slate-400">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={download}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-teal-400/20"
            >
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span className="text-slate-400">Download</span>
            </button>
          </div>

          {/* JSON content */}
          <pre className="mono-block max-h-64 overflow-auto text-slate-400 whitespace-pre-wrap break-all flex-grow">
            {dump}
          </pre>
        </div>
      </div>
    </div>
  )
}
