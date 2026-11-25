import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import CookieConsent from './components/CookieConsent'
import { useLanguage } from './contexts/LanguageContext'

function App() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t.meta.title
  }, [t])

  return (
    <div className="bg-chalk text-graphite min-h-screen">
      <a href="#contenu" className="a11y-skip">
        {t.nav.skipLink}
      </a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  )
}

export default App
