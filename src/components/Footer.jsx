import { profile } from '../data'
import Icon from './Icon'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const quickLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="w-full bg-paper border-t border-hairline mt-16">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-serif text-xl font-bold text-graphite">{profile.name}</span>
            <p className="text-sm text-muted max-w-md leading-relaxed">{t.footer.tagline}</p>
            <div className="flex items-center gap-1.5 text-subtle font-mono text-xs mt-1">
              <Icon name="pin" size={16} className="text-cobalt" />
              <span>{profile.address}</span>
            </div>
          </div>

          <nav aria-label={t.footer.quickLinks} className="flex flex-col gap-3">
            <span className="label-mono">{t.footer.quickLinks}</span>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted hover:text-cobalt transition-colors rounded">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="label-mono">{t.footer.networks}</span>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-cobalt transition-colors rounded"
                >
                  <Icon name="linkedin" size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-cobalt transition-colors rounded"
                >
                  <Icon name="whatsapp" size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`${import.meta.env.BASE_URL}CV-Audace-Rabarison.pdf`}
                  download
                  className="flex items-center gap-2 text-sm text-cobalt font-semibold hover:underline mt-1 rounded"
                >
                  <Icon name="download" size={16} />
                  {t.hero.downloadCv} (.PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-subtle">
            © {year} {profile.name}. {t.footer.rights}.
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt" aria-hidden="true" />
            {profile.title}
          </span>
        </div>
      </div>
    </footer>
  )
}
