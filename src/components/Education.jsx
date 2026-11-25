import { educations } from '../data'
import Reveal from './Reveal'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../contexts/LanguageContext'

const icons = ['school', 'scroll']

export default function Education() {
  const { t, lang } = useLanguage()
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container-page">
        <Reveal className="mb-10">
          <SectionHeader id="education-title" kicker={t.education.kicker} title={t.education.title} />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map((ed, i) => (
            <Reveal key={ed.degree[lang]} className="p-7 card flex items-start gap-4">
              <div className="icon-tile">
                <Icon name={icons[i] ?? 'school'} size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-subtle font-semibold">{ed.period}</span>
                <h3 className="font-serif text-xl text-graphite font-bold">{ed.degree[lang]}</h3>
                <p className="text-sm text-muted">{ed.school[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
