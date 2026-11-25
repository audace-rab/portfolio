import { skills } from '../data'
import Reveal from './Reveal'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../contexts/LanguageContext'

const categoryIcons = {
  Backend: 'server',
  Frontend: 'devices',
  'Base de données': 'database',
  'Outils & Autres': 'tools',
}

export default function Skills() {
  const { t } = useLanguage()
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-page">
        <Reveal className="mb-10">
          <SectionHeader
            id="skills-title"
            kicker={t.skills.kicker}
            title={t.skills.title}
            intro={t.skills.intro}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group) => (
            <Reveal key={group.categoryKey} className="p-6 card">
              <div className="flex items-center gap-2 mb-5">
                <Icon name={categoryIcons[group.categoryKey] ?? 'code'} size={20} className="text-cobalt" />
                <h3 className="font-serif text-lg font-bold text-graphite">
                  {t.skills.categories[group.categoryKey] ?? group.category}
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2 text-sm text-graphite">
                    <span className="w-1.5 h-1.5 rounded-full bg-cobalt/60 shrink-0" aria-hidden="true" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
