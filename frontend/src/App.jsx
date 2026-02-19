import React from 'react'
import DNAHelix from './components/DNAHelix'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="animated-bg min-h-screen text-slate-100 font-manrope relative">
      <DNAHelix />
      <div className="relative z-10">
        <Home />
      </div>
    </div>
  )
}
