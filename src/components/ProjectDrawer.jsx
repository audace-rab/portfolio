import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { useLanguage } from '../contexts/LanguageContext'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectDrawer({ project, onClose }) {
  const { t } = useLanguage()
  const d = t.projects.drawer
  const [shown, setShown] = useState(false)
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const closing = useRef(false)

  const requestClose = (afterClose) => {
    if (closing.current) return
    closing.current = true
    setShown(false)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTimeout(() => {
      onClose({ restoreFocus: !afterClose })
      // après le démontage (scroll de la page restauré)
      if (afterClose) requestAnimationFrame(afterClose)
    }, reduced ? 0 : 280)
  }
  const requestCloseRef = useRef(requestClose)
  requestCloseRef.current = requestClose

  const goToContact = (e) => {
    e.preventDefault()
    requestClose(() => {
      const target = document.getElementById('contact')
      target?.scrollIntoView({ behavior: 'smooth' })
      target?.querySelector('input')?.focus({ preventScroll: true })
    })
  }

  // Entrée animée + blocage du scroll de la page
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true))
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // ESC + piège de focus
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        requestCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll(FOCUSABLE)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const hasContext = Boolean(project.context)
  const hasHighlights = project.highlights?.length > 0

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => requestClose()}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`absolute inset-y-0 right-0 w-full sm:max-w-2xl bg-[#FCFCFD] border-l border-hairline shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 sm:px-7 py-5 border-b border-hairline flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-paper border border-hairline flex items-center justify-center text-cobalt shadow-sm">
              <Icon name={project.icon} size={22} />
            </div>
            <div className="flex flex-col">
              <span className="label-mono font-semibold">{project.categoryLabel}</span>
              <span className="text-xs text-cobalt font-mono font-medium">{d.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-paper border border-hairline text-subtle rounded">
              ESC
            </kbd>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => requestClose()}
              aria-label={d.close}
              className="w-9 h-9 rounded-xl bg-paper border border-hairline flex items-center justify-center text-muted hover:text-graphite hover:bg-chalk transition-colors"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-7 flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <h2 id="drawer-title" className="font-serif text-3xl sm:text-4xl font-bold text-graphite tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-base text-muted leading-relaxed pt-1">{project.description}</p>
          </div>

          <div className="p-5 card flex flex-col gap-2">
            <div className="flex items-center gap-2 text-graphite">
              <Icon name="user" size={18} className="text-cobalt" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">{d.role}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">{project.role}</p>
          </div>

          {hasContext && (
            <div className="p-5 card flex flex-col gap-2">
              <div className="flex items-center gap-2 text-graphite">
                <Icon name="briefcase" size={18} className="text-cobalt" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">{d.context}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{project.context}</p>
            </div>
          )}

          {hasHighlights && (
            <div className="p-5 card flex flex-col gap-3">
              <div className="flex items-center gap-2 text-graphite">
                <Icon name="checkCircle" size={18} className="text-cobalt" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">{d.highlights}</span>
              </div>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cobalt shrink-0" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-subtle">{d.stack}</span>
              <span className="font-mono text-[11px] text-cobalt">
                {d.technologies.replace('{count}', project.stack.length)}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="px-3 py-1 rounded-md bg-paper border border-hairline text-graphite font-mono text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-5 bg-paper border-t border-hairline flex flex-wrap items-center justify-between gap-3 shrink-0">
          <a
            href="#contact"
            onClick={goToContact}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-graphite text-white hover:bg-black font-mono text-xs font-semibold transition-colors"
          >
            <Icon name="chat" size={16} />
            {d.contact}
          </a>
          <button
            type="button"
            onClick={() => requestClose()}
            className="px-4 py-2.5 rounded-lg bg-chalk border border-hairline text-muted hover:text-graphite text-xs font-mono font-medium transition-colors"
          >
            {d.close}
          </button>
        </div>
      </aside>
    </div>
  )
}
