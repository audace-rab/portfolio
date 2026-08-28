import { educations } from '../data'
import Reveal from './Reveal'
import { useLanguage } from '../contexts/LanguageContext'

export default function Education() {
  const { t, lang } = useLanguage()
  return (
    <section id="education" className="py-24 bg-slate-50 dark:bg-surface/50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h3 className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-2">
            {t.education.kicker}
          </h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">{t.education.title}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {educations.map((ed) => (
            <Reveal
              key={ed.degree[lang]}
              className="glass rounded-3xl p-6 flex items-start gap-4 hover:shadow-xl dark:hover:bg-white/10 active:scale-[0.99] transition-shadow dark:transition-colors"
            >
              <span className="text-3xl" aria-hidden="true">
                🎓
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{ed.degree[lang]}</h3>
                <p className="text-slate-600 dark:text-slate-300">{ed.school[lang]}</p>
                <span className="inline-block mt-2 text-sm text-amber-700 dark:text-accent-cyan font-medium">
                  {ed.period}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}