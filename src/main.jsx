import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { AnalyticsProvider } from './contexts/AnalyticsContext.jsx'

const fontLink = document.getElementById('font-css')
if (fontLink) {
  if (fontLink.sheet) {
    fontLink.media = 'all'
  } else {
    const applyFont = () => {
      fontLink.media = 'all'
    }
    fontLink.addEventListener('load', applyFont)
    fontLink.addEventListener('error', applyFont)
  }
}

// Ancien thème sombre : nettoyer la préférence persistée
try {
  localStorage.removeItem('theme')
} catch {
  /* stockage indisponible */
}
document.documentElement.classList.remove('dark')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </LanguageProvider>
  </StrictMode>,
)
