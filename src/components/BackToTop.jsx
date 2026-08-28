import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function BackToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label={t.footer.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full glass flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-lg shadow-slate-900/10 dark:shadow-black/40 hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
      }`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  )
}
