import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FileUploadCard from '../components/FileUploadCard'
import DrugSelectCard from '../components/DrugSelectCard'
import AnalyzeButton from '../components/AnalyzeButton'
import ResultsPanel from '../components/ResultsPanel'
import DNAHelix from '../components/DNAHelix'
import useAnalyze from '../hooks/useAnalyze'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function Home() {
  const [file, setFile] = useState(null)
  const [drugs, setDrugs] = useState(['WARFARIN'])
  const [result, setResult] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isClinicalMode, setIsClinicalMode] = useState(true)
  const { run, loading, progress, error, setError } = useAnalyze()
  const resultsRef = useRef()

  async function handleAnalyze() {
    if (!file) { setError('Please upload a .vcf file first'); return }
    if (drugs.length === 0) { setError('Please select at least one drug'); return }
    setShowSuccess(false)
    try {
      const data = await run(file, drugs[0])
      setResult(data)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(resultsRef.current, { offset: -40, duration: 1.5 })
        } else {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 200)
    } catch (e) { /* error handled in hook */ }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:px-12 relative overflow-x-hidden">
      <DNAHelix />
      {/* ── Background Elements ──────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purpleTheme-600/20 rounded-full blur-[120px] mix-blend-screen float-anim"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-medicalRed-dark/20 rounded-full blur-[120px] mix-blend-screen float-anim" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ── Landing Hero ─────────────────────────── */}
      <header className="relative z-10 max-w-5xl mx-auto pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none flex justify-center">
            <span className="gradient-text inline-block cursor-default">
              PharmaGuard
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-4 text-lg sm:text-xl text-slate-400 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          AI-Powered Pharmacogenomic Risk Prediction System
        </motion.p>

        <motion.p
          className="mt-2 text-sm text-slate-500 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Upload patient DNA &middot; Select drugs &middot; Get instant risk intelligence
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button
            onClick={() => {
              if (window.lenis) {
                window.lenis.scrollTo(500, { duration: 1 })
              } else {
                window.scrollTo({ top: 500, behavior: 'smooth' })
              }
            }}
            className="glow-btn px-8 py-3.5 rounded-full bg-gradient-to-r from-purpleTheme-500 to-purpleTheme-400 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-[1.04] hover:brightness-110 active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              Analyze DNA
            </span>
          </button>
        </motion.div>

        {/* ── Toggle Switch ─────────────────────────── */}
        <motion.div
          className="flex justify-center mt-12 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative inline-flex items-center p-1 bg-darkPurple-800 rounded-full border border-white/5 shadow-inner">
            <div
              className={`absolute left-1 top-1 bottom-1 w-[130px] rounded-full transition-all duration-300 ease-out bg-gradient-to-r ${isClinicalMode ? 'from-purpleTheme-600 to-purpleTheme-400 translate-x-0' : 'from-medicalRed-dark to-medicalRed-light translate-x-full'}`}
            />
            <button
              onClick={() => setIsClinicalMode(true)}
              className={`relative z-10 w-[130px] py-2 text-xs font-bold tracking-wide transition-colors duration-300 ${isClinicalMode ? 'text-white' : 'text-slate-400'}`}
            >
              CLINICAL MODE
            </button>
            <button
              onClick={() => setIsClinicalMode(false)}
              className={`relative z-10 w-[130px] py-2 text-xs font-bold tracking-wide transition-colors duration-300 ${!isClinicalMode ? 'text-white' : 'text-slate-400'}`}
            >
              SIMPLE MODE
            </button>
          </div>
        </motion.div>
      </header>

      {/* ── Section Divider ──────────────────────── */}
      <div className="section-divider max-w-4xl mx-auto mb-10" />

      {/* ── Dashboard Cards ──────────────────────── */}
      <main className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
        <motion.div
          className="glass glass-hover p-6 rounded-2xl"
          variants={fadeUp} custom={0}
          initial="hidden" animate="visible"
        >
          <FileUploadCard file={file} onFile={setFile} progress={progress} />
        </motion.div>

        <motion.div
          className="glass glass-hover p-6 rounded-2xl"
          variants={fadeUp} custom={1}
          initial="hidden" animate="visible"
        >
          <DrugSelectCard selected={drugs} onChange={setDrugs} />
        </motion.div>

        <motion.div
          className="glass glass-hover p-6 rounded-2xl flex flex-col items-center justify-center"
          variants={fadeUp} custom={2}
          initial="hidden" animate="visible"
        >
          <AnalyzeButton onClick={handleAnalyze} loading={loading} disabled={!file} />
          {/* Success check */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium"
              >
                <svg className="w-5 h-5 success-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Analysis Complete
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* ── Error Alert ──────────────────────────── */}
      <div className="max-w-6xl mx-auto mt-6">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              className="error-shake flex items-center justify-between p-4 rounded-xl bg-red-900/30 border border-red-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span className="text-red-200 text-sm">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Results Section ──────────────────────── */}
      <div ref={resultsRef} className="max-w-6xl mx-auto mt-10">
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <h2 className="text-xl font-bold text-white">Analysis Results</h2>
                <div className="flex-1 section-divider" />
              </div>
              <div className="relative z-10">
                <ResultsPanel data={result} isClinicalMode={isClinicalMode} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center gap-3 text-slate-500 text-sm">
              <svg className="w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
              </svg>
              Upload a VCF file and run analysis to see results
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="relative z-10 max-w-6xl mx-auto mt-16 pb-8 text-center">
        <div className="section-divider mb-6" />
        <p className="text-xs text-slate-600">
          PharmaGuard &middot; DNA Drug Risk Intelligence &middot; For research purposes only
        </p>
      </footer>
    </div>
  )
}
