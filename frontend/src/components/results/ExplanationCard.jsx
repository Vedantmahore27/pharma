import React, { useState } from 'react'

export default function ExplanationCard({ explanation }){
  const [open, setOpen] = useState(false)
  if(!explanation) return (
    <div className="glass p-5 rounded-2xl">
      <h4 className="font-semibold mb-3">AI Explanation</h4>
      <div className="text-sm text-slate-400">No explanation available.</div>
    </div>
  )

  return (
    <div className="glass p-5 rounded-2xl">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">AI Explanation</h4>
        <button onClick={()=>setOpen(!open)} className="text-sm text-teal-200">{open ? 'Collapse' : 'Expand'}</button>
      </div>
      {open && (
        <div className="mt-3 text-sm text-slate-300">
          <div>{explanation.summary}</div>
          <div className="mt-3 text-xs text-slate-400">Citations:</div>
          <ul className="mt-2 text-xs text-teal-200">
            {(explanation.citations||[]).map((c,i)=> <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
