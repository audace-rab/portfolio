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
      className="fixed bottom-4 inset-x-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl z-[120] card p-6 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-serif text-lg font-bold text-graphite">{t.cookies.intro}</p>
          <p className="mt-1 text-sm text-muted">{t.cookies.description}</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            ref={acceptRef}
            onClick={acceptCookies}
            className="btn px-5 py-2 bg-cobalt text-white hover:bg-cobalt-hover"
          >
            {t.cookies.accept}
          </button>
          <button
            type="button"
            onClick={declineCookies}
            className="btn px-5 py-2 bg-paper border border-hairline text-graphite hover:bg-chalk"
          >
            {t.cookies.decline}
          </button>
        </div>
      </div>
    </div>
  )
}
