import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Remove head tags baked in by the prerender step; React re-creates them on mount.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove())

// Single-file preview build uses hash URLs (#/en/...) so it works from one HTML file.
const Router = import.meta.env.VITE_SINGLE ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
