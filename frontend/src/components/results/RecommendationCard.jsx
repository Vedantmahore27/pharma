import React from 'react'

export default function RecommendationCard({ rec }){
  return (
    <div className="glass p-5 rounded-2xl">
      <h4 className="font-semibold mb-3">Clinical Recommendation</h4>
      <div className="text-sm text-slate-300">Dosage Advice:</div>
      <div className="mt-2 text-white">{rec.dosage || 'No recommendation provided.'}</div>
      <div className="mt-3 text-sm text-slate-300">Alternatives:</div>
      <div className="mt-2 text-white">{rec.alternatives || '—'}</div>
    </div>
  )
}
