import { useEffect, useRef } from 'react'
import { useAnalytics } from '../contexts/AnalyticsContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function CookieConsent() {
  const { consent, acceptCookies, declineCookies } = useAnalytics()
  const { t } = useLanguage()
  const dialogRef = useRef(null)
  const acceptRef = useRef(null)

  useEffect(() => {
    if (consent !== 'undecided') return
    acceptRef.current?.focus()

    const dialog = dialogRef.current
    if (!dialog) return
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusables = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    dialog.addEventListener('keydown', onKeyDown)
    return () => dialog.removeEventListener('keydown', onKeyDown)
  }, [consent])

  if (consent !== 'undecided') return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.cookies.intro}
      className="fixed bottom-4 inset-x-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl z-[120] glass rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-slate-900 dark:text-white">{t.cookies.intro}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.cookies.description}</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            ref={acceptRef}
            onClick={acceptCookies}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet text-white text-sm font-medium hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            {t.cookies.accept}
          </button>
          <button
            type="button"
            onClick={declineCookies}
            className="px-5 py-2 rounded-full glass text-slate-800 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
          >
            {t.cookies.decline}
          </button>
        </div>
      </div>
    </div>
  )
}
