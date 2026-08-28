import { profile } from '../data'
import Reveal from './Reveal'
import { useLanguage } from '../contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const facts = [
    { icon: '⚡', value: '5+', label: t.about.facts[0].label },
    { icon: '🛠️', value: '3+', label: t.about.facts[1].label },
    { icon: '🚀', value: '100%', label: t.about.facts[2].label },
  ]

  const paragraphTemplate = t.about.paragraph
    .replace('{years}', profile.experienceYears)

  const beforeBackend = paragraphTemplate.split('{backend}')[0]
  const middle = paragraphTemplate.split('{backend}')[1]?.split('{front}')[0] ?? ''
  const afterFront = paragraphTemplate.split('{front}')[1] ?? ''

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h3 className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-2">
            {t.about.kicker}
          </h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-10">{t.about.title}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass rounded-3xl p-8">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                {beforeBackend}
                <span className="text-slate-900 dark:text-white font-medium">C#/.NET</span>
                {middle}
                <span className="text-slate-900 dark:text-white font-medium">
                  React, Angular et Vue.js
                </span>
                {afterFront}
              </p>
              <div className="mt-6 space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                <p>
                  <span aria-hidden="true">✉️</span> {profile.email}
                </p>
                <p>
                  <span aria-hidden="true">📞</span> {profile.phone}
                </p>
                <p>
                  <span aria-hidden="true">📍</span> {profile.address}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {facts.map((f) => (
                <div key={f.label} className="glass rounded-3xl p-6 flex items-center gap-4">
                  <span className="text-3xl" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-3xl font-bold text-gradient">{f.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
