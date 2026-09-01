import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgressBar from './components/ScrollProgressBar'
import BackToTop from './components/BackToTop'
import NavDots from './components/NavDots'
import CookieConsent from './components/CookieConsent'
import { useLanguage } from './contexts/LanguageContext'

function App() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t.meta.title
  }, [t])

  return (
    <div className="bg-white text-slate-600 dark:bg-base dark:text-slate-300 min-h-screen">
      <a href="#contenu" className="a11y-skip">
        {t.nav.skipLink}
      </a>
      <ScrollProgressBar />
      <Navbar />
      <main id="contenu">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <NavDots />
      <CookieConsent />
    </div>
  )
}

export default App