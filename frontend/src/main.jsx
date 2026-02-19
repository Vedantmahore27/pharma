import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Lenis from 'lenis'
import './styles/index.css'

// Initialize smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

// Expose to window for programmatic scrolling in components
window.lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
