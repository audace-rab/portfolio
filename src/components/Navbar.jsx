import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

const sectionIds = ['home', 'about', 'experience', 'skills', 'education', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuRef = useRef(null)
  const openBtnRef = useRef(null)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLanguage()

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#education', label: t.nav.education },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]

  const desktopLinks = links.filter((l) => l.href !== '#contact')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // M6 - track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // H5 - close on Escape, manage focus
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector('a')?.focus()
    } else {
      openBtnRef.current?.focus()
    }
  }, [open])

  const isActive = (href) => active === href.replace('#', '')

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-base/80 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold text-slate-900 dark:text-white tracking-tight focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet rounded"
        >
          Audace<span className="text-gradient">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {desktopLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive(l.href) ? 'true' : undefined}
                  className={`text-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet rounded ${
                    isActive(l.href)
                      ? 'text-amber-700 dark:text-accent-cyan font-medium'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet text-white hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            {t.nav.letsTalk}
          </a>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.changeLanguage}
            className="text-sm font-semibold flex items-center gap-1 px-2 py-1 rounded-full glass focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            <span className={lang === 'fr' ? 'text-amber-700 dark:text-accent-cyan' : 'text-slate-500 dark:text-slate-400'}>
              FR
            </span>
            <span className="text-slate-400 dark:text-slate-500">|</span>
            <span className={lang === 'en' ? 'text-amber-700 dark:text-accent-cyan' : 'text-slate-500 dark:text-slate-400'}>
              EN
            </span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.nav.lightTheme : t.nav.darkTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full glass text-lg transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.changeLanguage}
            className="text-sm font-semibold flex items-center gap-1 px-2 py-1 rounded-full glass focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            <span className={lang === 'fr' ? 'text-amber-700 dark:text-accent-cyan' : 'text-slate-500 dark:text-slate-400'}>
              FR
            </span>
            <span className="text-slate-400 dark:text-slate-500">|</span>
            <span className={lang === 'en' ? 'text-amber-700 dark:text-accent-cyan' : 'text-slate-500 dark:text-slate-400'}>
              EN
            </span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.nav.lightTheme : t.nav.darkTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full glass text-lg focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <button
            ref={openBtnRef}
            onClick={() => setOpen((o) => !o)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="text-slate-900 dark:text-white text-2xl focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet rounded"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden bg-white dark:bg-surface border-t border-slate-200 dark:border-white/10"
        >
          <ul className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? 'true' : undefined}
                  className={`block text-sm py-1 focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet rounded ${
                    isActive(l.href)
                      ? 'text-amber-700 dark:text-accent-cyan font-medium'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}