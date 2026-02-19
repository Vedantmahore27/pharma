import React from 'react'

export default function JsonViewer({ json }){
  if(!json) return null
  const dump = JSON.stringify(json, null, 2)

  function copy(){
    navigator.clipboard.writeText(dump)
  }

  function download(){
    const blob = new Blob([dump], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pharmaguard-result.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="glass p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Raw JSON</h4>
        <div className="flex gap-2">
          <button onClick={copy} className="text-sm px-3 py-1 bg-white/6 rounded">Copy</button>
          <button onClick={download} className="text-sm px-3 py-1 bg-white/6 rounded">Download</button>
        </div>
      </div>
      <pre className="text-xs text-slate-300 overflow-auto max-h-72 bg-transparent whitespace-pre-wrap">{dump}</pre>
    </div>
  )
}
