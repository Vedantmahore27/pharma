import React from 'react'

export default function ProfileCard({ profile }){
  return (
    <div className="glass p-5 rounded-2xl">
      <h4 className="font-semibold mb-3">Pharmacogenomic Profile</h4>
      <div className="text-sm text-slate-300">Primary gene: <span className="text-white">{profile.gene || '—'}</span></div>
      <div className="text-sm text-slate-300 mt-2">Diplotype: <span className="text-white">{profile.diplotype || '—'}</span></div>
      <div className="text-sm text-slate-300 mt-2">Phenotype: <span className="text-white">{profile.phenotype || '—'}</span></div>
      <div className="mt-3">
        <div className="text-sm text-slate-300">Variants:</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(profile.variants || []).map(v => (
            <span key={v} className="px-2 py-1 bg-white/6 rounded text-xs text-teal-200">{v}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
