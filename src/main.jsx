import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)