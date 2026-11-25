import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Icon from './Icon'

const sectionIds = ['home', 'projects', 'experience', 'skills', 'education', 'contact']

function LangSwitch({ lang, setLang, label }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center p-0.5 rounded-lg bg-paper border border-hairline"
    >
      {['fr', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2 py-0.5 rounded font-mono text-xs uppercase transition-colors ${
            lang === l ? 'text-graphite font-semibold bg-chalk' : 'text-subtle hover:text-graphite'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuRef = useRef(null)
  const openBtnRef = useRef(null)
  const wasOpen = useRef(false)
  const { lang, setLang, t } = useLanguage()

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ]

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
      wasOpen.current = true
    } else if (wasOpen.current) {
      openBtnRef.current?.focus()
      wasOpen.current = false
    }
  }, [open])

  const isActive = (href) => active === href.replace('#', '')

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-chalk/90 backdrop-blur-md border-b border-hairline">
      <nav className="container-page h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="#home" className="flex items-baseline gap-0.5 rounded">
            <span className="font-serif text-xl font-bold tracking-tight text-graphite">Audace</span>
            <span className="font-mono text-sm text-subtle">.dev</span>
          </a>
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-hairline">
            <span className="w-2 h-2 rounded-full bg-cobalt" aria-hidden="true" />
            <span className="label-mono text-muted">{t.hero.available}</span>
          </div>
        </div>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={isActive(l.href) ? 'true' : undefined}
                className={`text-sm transition-colors rounded ${
                  isActive(l.href) ? 'text-cobalt font-semibold' : 'text-muted hover:text-graphite'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} setLang={setLang} label={t.nav.changeLanguage} />
          <a href="#contact" className="hidden sm:inline-flex btn px-4 py-2 bg-cobalt text-white hover:bg-cobalt-hover">
            {t.nav.letsTalk}
          </a>
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden w-9 h-9 rounded-lg bg-paper border border-hairline flex items-center justify-center text-graphite"
          >
            <Icon name={open ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="lg:hidden bg-paper border-t border-hairline">
          <ul className="container-page flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? 'true' : undefined}
                  className={`block py-2.5 text-sm rounded ${
                    isActive(l.href) ? 'text-cobalt font-semibold' : 'text-muted hover:text-graphite'
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
