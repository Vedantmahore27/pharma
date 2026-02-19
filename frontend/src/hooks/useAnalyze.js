import { useState, useCallback } from 'react'
import { analyze } from '../services/api'

export default function useAnalyze(){
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const run = useCallback(async (file, drug) => {
    setError(null)
    setLoading(true)
    setProgress(0)
    try{
      const form = new FormData()
      form.append('file', file)
      form.append('drug_name', drug)
      const data = await analyze(form, (ev) => {
        if(ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100))
      })
      setLoading(false)
      setProgress(100)
      return data
    }catch(err){
      setError(err?.response?.data?.message || err.message || 'Analyze failed')
      setLoading(false)
      throw err
    }
  }, [])

  return { run, loading, progress, error, setError }
}
