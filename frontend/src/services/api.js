import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: { 'Accept': 'application/json' }
})

export async function analyze(formData, onUploadProgress){
  const res = await api.post('/analyze', formData, { onUploadProgress })
  return res.data
}

export default api
