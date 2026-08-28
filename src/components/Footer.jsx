import { profile } from '../data'
import { useLanguage } from '../contexts/LanguageContext'

const socials = [
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/audace-rabarison/' 
  },
]

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const quickLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#education', label: t.nav.education },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Audace<span className="text-gradient">.dev</span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {profile.title} — {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet rounded"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{t.footer.networks}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full glass text-lg transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
                >
                  <span aria-hidden="true">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            © {year} {profile.name} — {profile.title}
          </p>
        </div>
      </div>
    </footer>
  )
}