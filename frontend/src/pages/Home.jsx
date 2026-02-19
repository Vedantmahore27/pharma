import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Helix from '../assets/helix.svg'
import FileUploadCard from '../components/FileUploadCard'
import DrugSelectCard from '../components/DrugSelectCard'
import AnalyzeButton from '../components/AnalyzeButton'
import ResultsPanel from '../components/ResultsPanel'
import useAnalyze from '../hooks/useAnalyze'

export default function Home(){
  const [file, setFile] = useState(null)
  const [drug, setDrug] = useState('WARFARIN')
  const [result, setResult] = useState(null)
  const { run, loading, progress, error, setError } = useAnalyze()
  const containerRef = useRef()

  async function handleAnalyze(){
    if(!file){ setError('Please upload a .vcf file'); return }
    try{
      const data = await run(file, drug)
      setResult(data)
      containerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }catch(e){ /* error handled in hook */ }
  }

  return (
    <div className="relative overflow-hidden min-h-screen py-12 px-6 md:px-12">
      <img src={Helix} className="absolute right-[-10%] top-0 w-96 helix-rot" alt="helix" />

      <header className="max-w-6xl mx-auto mb-8 text-center">
        <motion.h1 initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-5xl md:text-6xl font-extrabold tracking-tight">
          PharmaGuard
        </motion.h1>
        <motion.p className="mt-3 text-lg text-slate-300" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
          AI-Powered Pharmacogenomic Risk Prediction
        </motion.p>
        <motion.div className="mt-6" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}>
          <button onClick={() => window.scrollTo({ top: 220, behavior: 'smooth' })} className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-[#6fe8dd] text-[#022124] font-semibold shadow-lg">
            Analyze Patient DNA
          </button>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
        <motion.div className="glass p-6 rounded-2xl slide-up" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>
          <FileUploadCard file={file} onFile={setFile} progress={progress} />
        </motion.div>

        <motion.div className="glass p-6 rounded-2xl slide-up" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}}>
          <DrugSelectCard value={drug} onChange={setDrug} />
        </motion.div>

        <motion.div className="glass p-6 rounded-2xl flex items-center justify-center slide-up" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
          <AnalyzeButton onClick={handleAnalyze} loading={loading} />
        </motion.div>
      </main>

      <div ref={containerRef} className="max-w-6xl mx-auto mt-8">
        <AnimatePresence>
          {error && (
            <motion.div initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mb-4 p-4 rounded-lg bg-red-800/40 text-red-200">
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          <ResultsPanel data={result} />
        </div>
      </div>
    </div>
  )
}
