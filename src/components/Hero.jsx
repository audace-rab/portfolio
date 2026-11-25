import { profile, experiences, keyTechnologies } from '../data'
import AnimatedCounter from './AnimatedCounter'
import Icon from './Icon'
import portrait768 from '../assets/portrait-768.webp'
import portrait384 from '../assets/portrait-384.webp'
import { useLanguage } from '../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const years = profile.experienceYears

  const stats = [
    { icon: 'history', value: Number(years), suffix: '+', label: t.hero.stats[0].label },
    { icon: 'layers', value: 10, suffix: '+', label: t.hero.stats[1].label },
    { icon: 'briefcase', value: experiences.length, suffix: '', label: t.hero.stats[2].label },
  ]

  return (
    <section id="home" className="container-page pt-32 pb-12">
      <link
        rel="preload"
        as="image"
        imageSrcSet={`${portrait768} 768w, ${portrait384} 384w`}
        imageSizes="14rem"
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-hairline w-fit">
            <span className="w-2 h-2 rounded-full bg-cobalt" aria-hidden="true" />
            <span className="label-mono text-graphite">{t.hero.badge.replace('{years}', years)}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="kicker">{t.hero.hello}</span>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-graphite tracking-tight leading-[1.05]">
              {profile.name}
            </h1>
            <p className="text-lg sm:text-xl text-muted font-medium mt-1">{t.hero.subtitle}</p>
          </div>

          <p className="text-base text-muted leading-relaxed max-w-xl">
            {t.hero.paragraph.replace('{years}', years)}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href="#projects" className="btn-primary">
              {t.hero.exploreProjects}
              <Icon name="arrowDown" size={18} />
            </a>
            <a href="#contact" className="btn-ghost">
              <Icon name="chat" size={18} className="text-cobalt" />
              {t.hero.contact}
            </a>
            <a
              href={`${import.meta.env.BASE_URL}CV-Audace-Rabarison.pdf`}
              download
              className="btn-ghost"
            >
              <Icon name="download" size={18} className="text-cobalt" />
              {t.hero.downloadCv}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-lg bg-paper border border-hairline text-muted hover:text-cobalt transition-colors"
            >
              <Icon name="linkedin" size={18} />
            </a>
          </div>

          <dl className="grid grid-cols-3 gap-3 pt-4 max-w-md">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse p-3.5 rounded-xl bg-paper border border-hairline">
                <dt className="label-mono mt-1">{s.label}</dt>
                <dd className="flex items-center gap-1.5">
                  <Icon name={s.icon} size={16} className="text-cobalt" />
                  <span className="font-serif text-2xl font-bold text-graphite">
                    <AnimatedCounter value={s.value} />
                    {s.suffix}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-2xl bg-paper border border-hairline p-5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between" aria-hidden="true">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              </div>
              <span className="font-mono text-xs text-subtle uppercase">Audace_Profile.cs</span>
            </div>

            <div className="mx-auto my-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 border border-hairline bg-chalk">
              <div className="w-full h-full rounded-full overflow-hidden bg-paper">
                <picture>
                  <source type="image/webp" srcSet={portrait768} media="(min-width: 768px)" />
                  <source type="image/webp" srcSet={portrait384} />
                  <img
                    src={portrait384}
                    alt={t.hero.portraitAlt}
                    fetchPriority="high"
                    decoding="async"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </picture>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-chalk border border-hairline flex items-center justify-between gap-2" role="status">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-cobalt shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs text-graphite truncate">{t.hero.available}</span>
              </div>
              <span className="font-mono text-xs text-cobalt bg-paper border border-hairline px-2 py-0.5 rounded shrink-0" aria-hidden="true">
                {t.hero.availableShort}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-5 rounded-xl bg-paper border border-hairline flex flex-wrap items-center justify-between gap-4">
        <span className="label-mono">{t.hero.techKicker}</span>
        <ul className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {keyTechnologies.map((tech, i) => (
            <li
              key={tech}
              className={`px-3 py-1 rounded-md bg-chalk border border-hairline ${
                i === 0 ? 'text-graphite font-semibold' : 'text-muted'
              }`}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
