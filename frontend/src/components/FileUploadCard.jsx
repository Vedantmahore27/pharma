import React, { useRef, useState } from 'react'

export default function FileUploadCard({ file, onFile, progress }){
  const inputRef = useRef()
  const [hover, setHover] = useState(false)

  function handleDrop(e){
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if(f && f.name.endsWith('.vcf')) onFile(f)
  }

  function handlePick(e){
    const f = e.target.files?.[0]
    if(f && f.name.endsWith('.vcf')) onFile(f)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Upload .vcf</h3>
      <div
        onDragOver={(e)=>{e.preventDefault(); setHover(true)}}
        onDragLeave={()=>setHover(false)}
        onDrop={handleDrop}
        className={`p-6 rounded-lg border-dashed border-2 ${hover ? 'border-teal-300/60' : 'border-white/8'} bg-transparent cursor-pointer`}
        onClick={()=>inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept=".vcf" className="hidden" onChange={handlePick} />
        <div className="text-sm text-slate-300">Drag & drop a .vcf file here, or click to select</div>
        {file && <div className="mt-3 text-sm text-teal-200">Uploaded: {file.name}</div>}
        {progress > 0 && (
          <div className="mt-4 w-full bg-white/6 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-teal-400" style={{width: `${progress}%`}} />
          </div>
        )}
      </div>
    </div>
  )
}
