import React from 'react'

function Badge({ level }){
  const map = {
    safe: ['bg-emerald-600','Safe'],
    adjust: ['bg-amber-500','Adjust Dosage'],
    danger: ['bg-rose-600','Toxic / Ineffective']
  }
  const [c,label] = map[level] || map.danger
  return <span className={`px-3 py-1 rounded-full text-sm ${c}`}>{label}</span>
}

export default function RiskCard({ result }){
  const level = (result.risk || 'danger').toLowerCase()
  const conf = result.confidence ?? 0
  return (
    <div className="glass p-5 rounded-2xl">
      <h4 className="font-semibold mb-3">Risk Assessment</h4>
      <div className="flex items-center gap-4">
        <Badge level={level === 'green' || level === 'safe' ? 'safe' : (level === 'yellow' || level === 'adjust' ? 'adjust' : 'danger')} />
        <div className="flex-1">
          <div className="text-sm text-slate-300">Confidence</div>
          <div className="w-full bg-white/6 h-3 rounded mt-2 overflow-hidden">
            <div className="h-3 bg-teal-400" style={{width: `${conf}%`}} />
          </div>
          <div className="mt-2 text-xs text-slate-400">Severity: {result.severity ?? 'N/A'}</div>
        </div>
      </div>
    </div>
  )
}
