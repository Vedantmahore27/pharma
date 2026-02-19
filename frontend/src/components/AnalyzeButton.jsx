import React from 'react'

export default function AnalyzeButton({ onClick, loading }){
  return (
    <div className="w-full text-center">
      <button onClick={onClick} disabled={loading} className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg ${loading ? 'opacity-60' : 'bg-gradient-to-r from-[#00d4c4] to-[#6fe8dd] hover:scale-[1.02]'} `}>
        {loading ? (
          <div className="flex items-center gap-3 justify-center">
            <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            Analyzing...
          </div>
        ) : (
          <span className="glow">Run Analysis</span>
        )}
      </button>
    </div>
  )
}
