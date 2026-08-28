import { createContext, useContext, useEffect, useState } from 'react'

const AnalyticsContext = createContext()

const GA4_ID = import.meta.env.VITE_GA4_ID

function getInitialConsent() {
  if (typeof window === 'undefined') return 'undecided'
  const saved = localStorage.getItem('cookie-consent')
  if (saved === 'accepted' || saved === 'declined') return saved
  return 'undecided'
}

function injectGtag(id) {
  if (window.document.getElementById('ga-script')) return
  const script = window.document.createElement('script')
  script.id = 'ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  window.document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  const gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', id)
}

export function AnalyticsProvider({ children }) {
  const [consent, setConsent] = useState(getInitialConsent)

  useEffect(() => {
    if (consent === 'accepted' && GA4_ID) {
      injectGtag(GA4_ID)
    }
  }, [consent])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setConsent('declined')
  }

  return (
    <AnalyticsContext.Provider value={{ consent, acceptCookies, declineCookies }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}
