import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const sectionOrder = ['home', 'about', 'experience', 'skills', 'education', 'projects', 'contact']

export default function NavDots() {
  const { t } = useLanguage()
  const [active, setActive] = useState('home')
  const [reduced, setReduced] = useState(false)

  const sections = [
    { id: 'home', label: t.dots.home },
    { id: 'about', label: t.dots.about },
    { id: 'experience', label: t.dots.experience },
    { id: 'skills', label: t.dots.skills },
    { id: 'education', label: t.dots.education },
    { id: 'projects', label: t.dots.projects },
    { id: 'contact', label: t.dots.contact },
  ]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActive(sectionOrder[sectionOrder.length - 1])
        return
      }
      const mid = window.scrollY + window.innerHeight * 0.4
      let current = sectionOrder[0]
      for (const id of sectionOrder) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (reduced) return null

  return (
    <div
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex-col items-center gap-3"
      aria-label={t.dots.navLabel}
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className={`block rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet ${
              isActive
                ? 'w-3.5 h-3.5 bg-amber-600 dark:bg-accent-violet'
                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-white/25 dark:hover:bg-white/40'
            }`}
          />
        )
      })}
    </div>
  )
}
