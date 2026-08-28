import { experiences } from '../data'
import Reveal from './Reveal'
import { useLanguage } from '../contexts/LanguageContext'

export default function Experience() {
  const { t, lang } = useLanguage()
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-surface/50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h3 className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-2">
            {t.experience.kicker}
          </h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
            {t.experience.title}
          </h2>
        </Reveal>

        <div className="relative border-l border-slate-200 dark:border-white/10 ml-4">
          {experiences.map((exp) => (
            <Reveal key={exp.company} className="ml-8 pb-12 relative">
              <span
                className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet"
                aria-hidden="true"
              />
              <div className="glass rounded-3xl p-6 md:p-8 hover:shadow-xl dark:hover:bg-white/10 active:scale-[0.99] transition-shadow dark:transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{exp.role[lang]}</h3>
                  <span className="text-sm text-amber-700 dark:text-accent-cyan font-medium">{exp.period}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{exp.company}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{exp.description[lang]}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 dark:bg-accent-violet/10 dark:border-accent-violet/30 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}