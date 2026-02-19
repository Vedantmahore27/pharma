import React, { useState } from 'react'
import { DRUGS } from '../constants/drugs'

export default function DrugSelectCard({ value, onChange }){
  const [open, setOpen] = useState(false)

  function toggleDrug(d){
    onChange(d)
    setOpen(false)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Select Drug</h3>
      <div className="relative">
        <button onClick={()=>setOpen(!open)} className="w-full p-3 text-left rounded-lg glass">
          {value}
        </button>
        {open && (
          <div className="absolute z-20 mt-2 w-full bg-[#031426] rounded-lg p-3 shadow-lg">
            {DRUGS.map(d => (
              <div key={d} className="py-2 hover:bg-white/2 rounded-sm cursor-pointer" onClick={()=>toggleDrug(d)}>
                {d}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-sm text-slate-400 mt-2">Multi-select supported in UI via repeated selects</div>
    </div>
  )
}
