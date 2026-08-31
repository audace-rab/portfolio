import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'
import TechMarquee from './TechMarquee'
import AnimatedCounter from './AnimatedCounter'
import portrait768 from '../assets/portrait-768.webp'
import portrait384 from '../assets/portrait-384.webp'
import { useLanguage } from '../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [offset, setOffset] = useState(0)
  const blobRef = useRef(null)

  const stats = [
    { icon: '⚡', value: 5, suffix: '+', label: t.hero.stats[0].label },
    { icon: '🚀', value: 10, suffix: '+', label: t.hero.stats[1].label },
    { icon: '🛠️', value: 5, suffix: '+', label: t.hero.stats[2].label },
  ]


  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (mq.matches || isTouch) return

    let raf = 0
    const update = () => {
      setOffset(window.scrollY * 0.05)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div
        ref={blobRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-100 dark:bg-accent-violet/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-amber-100 dark:bg-accent-blue/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-amber-100 dark:bg-accent-cyan/20 blur-2xl animate-float" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-4">
              {t.hero.hello}
            </p>
            <h1 className="text-[clamp(2.5rem,8vw,3.75rem)] font-extrabold text-slate-900 dark:text-white leading-tight">
              {profile.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gradient mt-3">
              {t.hero.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-5 max-w-md text-lg">
              {t.hero.tagline.replace('{years}', profile.experienceYears)}
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 mt-6"
              role="status"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t.hero.available}
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              <a
                href="#contact"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet text-white font-medium hover:opacity-90 transition-opacity glow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
              >
                {t.hero.contact}
              </a>
              <a
                href="#experience"
                className="px-7 py-3 rounded-full glass text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet"
              >
                {t.hero.viewExperience}
              </a>
              <a
                href={`${import.meta.env.BASE_URL}CV-Audace-Rabarison.pdf`}
                download
                className="px-7 py-3 rounded-full border-2 border-amber-600 dark:border-accent-violet text-amber-700 dark:text-slate-200 font-medium hover:bg-amber-50 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t.hero.downloadCv}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <span className="block text-2xl mb-1" aria-hidden="true">
                    {s.icon}
                  </span>
                  <p className="text-2xl font-bold text-gradient">
                    <AnimatedCounter value={s.value} />
                    {s.suffix}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full p-1 bg-gradient-to-br from-amber-600 to-amber-800 dark:from-accent-blue dark:to-accent-violet animate-float shadow-lg shadow-amber-500/20 dark:shadow-accent-violet/30">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-400 portrait-dark-bg">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={portrait768}
                      media="(min-width: 768px)"
                    />
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
            </div>
          </div>
        </div>
      </div>

      <TechMarquee />
    </section>
  )
}