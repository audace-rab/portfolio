import { useState, useEffect, useRef } from 'react'
import { profile } from '../data'
import Reveal from './Reveal'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

const FORMSPREE_FORM_ID = 'xkjwqega'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function Contact() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const copyTimer = useRef(null)
  const turnstileRef = useRef(null)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    if (document.getElementById('turnstile-script')) return
    const script = document.createElement('script')
    script.id = 'turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    return () => {
      const s = document.getElementById('turnstile-script')
      if (s) s.remove()
    }
  }, [])

  const handleCopyEmail = async () => {
    const email = profile.email
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        const ta = document.createElement('textarea')
        ta.value = email
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      if (copyTimer.current) clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current)
  }, [])

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    window.onTurnstileSuccess = (token) => setTurnstileToken(token)
    return () => {
      const fn = window.onTurnstileSuccess
      if (fn) delete window.onTurnstileSuccess
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t.contact.errors.name
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    if (!form.email.trim()) next.email = t.contact.errors.emailEmpty
    else if (!emailOk) next.email = t.contact.errors.emailInvalid
    if (!form.message.trim()) next.message = t.contact.errors.message
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSent(false)

    if (!validate()) return

    setLoading(true)

    try {
      const payload = {
        name: form.name,
        email: form.email,
        message: form.message,
        _replyto: form.email,
        _subject: `[Portfolio] Message de ${form.name}`,
      }
      if (TURNSTILE_SITE_KEY) payload['cf-turnstile-response'] = turnstileToken

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setLoading(false)
        setSent(true)
        setForm({ name: '', email: '', message: '' })
      } else {
        const data = await res.json()
        setLoading(false)
        setError(data.error || t.contact.failure)
      }
    } catch (err) {
      setLoading(false)
      setError(t.contact.failure)
      console.error('Formspree error:', err)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-amber-100 dark:bg-accent-violet/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <h3 className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-2">
            {t.contact.kicker}
          </h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
            {t.contact.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: '✉️', label: t.contact.email, value: profile.email, isEmail: true },
                { icon: '📞', label: t.contact.phone, value: profile.phone, isEmail: false },
                { icon: '📍', label: t.contact.address, value: profile.address, isEmail: false },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5 flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl" aria-hidden="true">
                      {c.icon}
                    </span>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{c.label}</p>
                      <p className="text-slate-900 dark:text-white font-medium">{c.value}</p>
                    </div>
                  </div>
                  {c.isEmail && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={copied ? t.contact.emailCopied : t.contact.copyEmail}
                      className="shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-white/10 hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
                    >
                      <span aria-hidden="true">
                        {copied ? (
                          <svg className="w-4 h-4 text-amber-700 dark:text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                          </svg>
                        )}
                      </span>
                    </button>
                  )}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                    label: t.contact.linkedin,
                    href: 'https://www.linkedin.com/in/audace-rabarison/',
                    className:
                      'hover:border-amber-400 dark:hover:border-accent-violet hover:bg-amber-50 dark:hover:bg-white/10',
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    ),
                    label: t.contact.whatsapp,
                    href: 'https://wa.me/261347650918',
                    className:
                      'hover:border-amber-400 dark:hover:border-accent-violet hover:bg-amber-50 dark:hover:bg-white/10',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className={`glass rounded-2xl p-4 flex flex-col items-center gap-1 text-center transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet ${s.className}`}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {s.icon}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                  {t.contact.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 dark:bg-white/5 dark:text-white ${
                    errors.name
                      ? 'border-red-400 dark:border-red-400 focus:border-red-400'
                      : 'border-slate-200 focus:border-amber-500 dark:border-white/10 dark:focus:border-accent-violet'
                  } focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet`}
                  placeholder={t.contact.namePlaceholder}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 dark:bg-white/5 dark:text-white ${
                    errors.email
                      ? 'border-red-400 dark:border-red-400 focus:border-red-400'
                      : 'border-slate-200 focus:border-amber-500 dark:border-white/10 dark:focus:border-accent-violet'
                  } focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet`}
                  placeholder={t.contact.emailPlaceholder}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                  {t.contact.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 resize-none dark:bg-white/5 dark:text-white ${
                    errors.message
                      ? 'border-red-400 dark:border-red-400 focus:border-red-400'
                      : 'border-slate-200 focus:border-amber-500 dark:border-white/10 dark:focus:border-accent-violet'
                  } focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet`}
                  placeholder={t.contact.messagePlaceholder}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message}</p>
                )}
              </div>
              {TURNSTILE_SITE_KEY && (
                <div
                  ref={turnstileRef}
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_SITE_KEY}
                  data-theme={theme === 'dark' ? 'dark' : 'light'}
                  data-callback="onTurnstileSuccess"
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
              >
                {loading ? t.contact.sending : t.contact.send}
              </button>
              <div aria-live="polite">
                {sent && (
                  <p className="text-center text-amber-700 dark:text-accent-cyan text-sm font-medium">
                    <span aria-hidden="true">✅</span> {t.contact.success}
                  </p>
                )}
                {error && <p className="text-center text-red-400 text-sm">{error}</p>}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}