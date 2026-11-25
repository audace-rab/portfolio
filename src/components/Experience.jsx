import { experiences } from '../data'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../contexts/LanguageContext'

export default function Experience() {
  const { t, lang } = useLanguage()
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container-page">
        <Reveal className="mb-10">
          <SectionHeader
            id="experience-title"
            kicker={t.experience.kicker}
            title={t.experience.title}
            intro={t.experience.intro}
          />
        </Reveal>

        <Reveal as="ol" className="card overflow-hidden">
          {experiences.map((exp, i) => (
            <li
              key={exp.company}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-6 sm:p-8 ${
                i < experiences.length - 1 ? 'border-b border-hairline' : ''
              }`}
            >
              <div className="lg:col-span-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-subtle">{exp.period}</span>
                <span className="text-sm font-semibold text-graphite">{exp.company}</span>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-3">
                <h3 className="font-serif text-xl text-graphite font-bold">{exp.role[lang]}</h3>
                <p className="text-sm text-muted leading-relaxed">{exp.description[lang]}</p>
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tech.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
