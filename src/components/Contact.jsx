import { useState, useEffect, useRef } from 'react'
import { profile } from '../data'
import Reveal from './Reveal'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../contexts/LanguageContext'

const FORMSPREE_FORM_ID = 'xkjwqega'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function Contact() {
  const { t } = useLanguage()
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

  const fieldClass = (name) =>
    `input ${errors[name] ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5 flex flex-col gap-5">
            <SectionHeader id="contact-title" kicker={t.contact.kicker} title={t.contact.title} />
            <p className="text-base text-muted leading-relaxed">{t.contact.intro}</p>

            <ul className="flex flex-col gap-3 mt-2">
              <li className="p-4 rounded-xl bg-paper border border-hairline flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-chalk border border-hairline flex items-center justify-center text-cobalt shrink-0">
                    <Icon name="mail" size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="label-mono">{t.contact.email}</span>
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-graphite hover:text-cobalt transition-colors truncate">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? t.contact.emailCopied : t.contact.copyEmail}
                  title={copied ? t.contact.emailCopied : t.contact.copyEmail}
                  className="p-2 rounded-lg text-subtle hover:text-cobalt transition-colors shrink-0"
                >
                  <Icon name={copied ? 'check' : 'copy'} size={18} className={copied ? 'text-cobalt' : ''} />
                </button>
              </li>

              <li className="p-4 rounded-xl bg-paper border border-hairline flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-chalk border border-hairline flex items-center justify-center text-cobalt shrink-0">
                    <Icon name="phone" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="label-mono">{t.contact.phone}</span>
                    <a href={profile.phoneHref} className="text-sm font-semibold text-graphite hover:text-cobalt transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.contact.whatsapp}
                  title={t.contact.whatsapp}
                  className="p-2 rounded-lg text-subtle hover:text-cobalt transition-colors shrink-0"
                >
                  <Icon name="whatsapp" size={18} />
                </a>
              </li>

              <li className="p-4 rounded-xl bg-paper border border-hairline flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chalk border border-hairline flex items-center justify-center text-cobalt shrink-0">
                  <Icon name="pin" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="label-mono">{t.contact.address}</span>
                  <span className="text-sm font-semibold text-graphite">{profile.address}</span>
                </div>
              </li>

              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-paper border border-hairline flex items-center justify-between gap-3 hover:border-graphite transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-chalk border border-hairline flex items-center justify-center text-cobalt shrink-0">
                      <Icon name="linkedin" size={18} />
                    </span>
                    <span className="text-sm font-semibold text-graphite">{t.contact.linkedin}</span>
                  </span>
                  <Icon name="arrowRight" size={18} className="text-subtle" />
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-7 p-7 card">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-mono text-xs text-graphite">
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
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    value={form.name}
                    onChange={handleChange}
                    className={fieldClass('name')}
                    placeholder={t.contact.namePlaceholder}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-mono text-xs text-graphite">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    value={form.email}
                    onChange={handleChange}
                    className={fieldClass('email')}
                    placeholder={t.contact.emailPlaceholder}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-mono text-xs text-graphite">
                  {t.contact.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className={`${fieldClass('message')} resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-xs text-red-600">{errors.message}</p>
                )}
              </div>
              {TURNSTILE_SITE_KEY && (
                <div
                  ref={turnstileRef}
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_SITE_KEY}
                  data-theme="light"
                  data-callback="onTurnstileSuccess"
                />
              )}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? t.contact.sending : t.contact.send}
                  <Icon name="send" size={18} />
                </button>
              </div>
              <div aria-live="polite">
                {sent && (
                  <p className="p-3 rounded-lg bg-chalk border border-hairline text-cobalt font-mono text-xs flex items-center gap-2">
                    <Icon name="checkCircle" size={18} />
                    {t.contact.success}
                  </p>
                )}
                {error && (
                  <p className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-mono text-xs">{error}</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
