import { useState, useCallback } from 'react'
import { analyze } from '../services/api'

export default function useAnalyze() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const run = useCallback(async (file, drugs) => {
    setError(null)
    setLoading(true)
    setProgress(0)
    try {
      const form = new FormData()
      form.append('vcf_file', file)
      // Backend accepts comma-separated drug names
      const drugStr = Array.isArray(drugs) ? drugs.join(',') : drugs
      form.append('drug_name', drugStr)

      const data = await analyze(form, (ev) => {
        if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100))
      })
      setLoading(false)
      setProgress(100)
      return data
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        'Analysis failed'
      setError(msg)
      setLoading(false)
      throw err
    }
  }, [])

  return { run, loading, progress, error, setError }
}
