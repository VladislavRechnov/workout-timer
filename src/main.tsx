import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!(rootElement instanceof HTMLElement)) {
  throw new Error("Root element '#root' not found or invalid type")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
