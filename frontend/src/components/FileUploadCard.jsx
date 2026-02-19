import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function FileUploadCard({ file, onFile, progress }) {
  const inputRef = useRef()
  const [hover, setHover] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  function handleDrop(e) {
    e.preventDefault()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0]
    if (f && f.name.endsWith('.vcf')) onFile(f)
  }

  function handlePick(e) {
    const f = e.target.files?.[0]
    if (f && f.name.endsWith('.vcf')) onFile(f)
  }

  function clearFile(e) {
    e.stopPropagation()
    onFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-purpleTheme-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <h3 className="text-lg font-semibold text-white">Upload VCF File</h3>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => inputRef.current?.click()}
        className={`
          relative p-8 rounded-xl cursor-pointer transition-all duration-300
          border-2 border-dashed
          ${dragActive
            ? 'border-purpleTheme-400/60 bg-purpleTheme-400/5 shadow-[0_0_30px_rgba(106,13,173,0.2)]'
            : hover
              ? 'border-purpleTheme-400/30 bg-white/[0.02] border-pulse'
              : 'border-white/10 bg-transparent'
          }
        `}
      >
        <input ref={inputRef} type="file" accept=".vcf" className="hidden" onChange={handlePick} />

        <div className="text-center">
          {/* Upload icon */}
          <motion.div
            animate={dragActive ? { y: -4 } : { y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="mx-auto mb-3"
          >
            <svg className={`w-10 h-10 mx-auto transition-colors duration-300 ${dragActive ? 'text-purpleTheme-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </motion.div>

          <p className="text-sm text-slate-400">
            {dragActive ? 'Drop your file here' : 'Drag & drop a .vcf file, or click to browse'}
          </p>
          <p className="text-xs text-slate-600 mt-1">Variant Call Format files only</p>
        </div>
      </motion.div>

      {/* File status */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400 success-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-emerald-300 truncate max-w-[180px]">{file.name}</span>
          </div>
          <button
            onClick={clearFile}
            className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Progress bar */}
      {progress > 0 && progress < 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 rounded-full progress-shimmer"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
