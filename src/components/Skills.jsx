import { skills } from '../data'
import Reveal from './Reveal'
import { useLanguage } from '../contexts/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h3 className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-2">
            {t.skills.kicker}
          </h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">{t.skills.title}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group) => (
            <Reveal key={group.categoryKey} className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {t.skills.categories[group.categoryKey] ?? group.category}
              </h3>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-400">
                        {item.proficiency}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden"
                      role="img"
                      aria-label={t.skills.ariaProficiency
                        .replace('{name}', item.name)
                        .replace('{value}', item.proficiency)}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}