import { createContext, useContext, useEffect, useState } from 'react'
import fr from '../i18n/fr.js'
import en from '../i18n/en.js'

const translations = { fr, en }
const LanguageContext = createContext()

function getInitialLang() {
  if (typeof window === 'undefined') return 'fr'
  const saved = localStorage.getItem('lang')
  if (saved === 'fr' || saved === 'en') return saved
  return (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  const value = {
    lang,
    setLang,
    toggleLang: () => setLang((l) => (l === 'fr' ? 'en' : 'fr')),
    t: translations[lang],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
