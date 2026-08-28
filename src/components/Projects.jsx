import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { useLanguage } from '../contexts/LanguageContext'

const projectMeta = [
  {
    stack: ['C#', '.NET', 'SQL Server', 'Angular', 'TypeScript'],
    icon: '💼',
  },
  {
    stack: ['React', 'Python', 'Fast API', 'Oracle', 'Jupyter Lab', 'TensorFlow'],
    icon: '🤖',
  },
  {
    stack: ['C#', '.NET', '.NET Framework', 'Vue.js', 'Oracle', 'TDump Studio'],
    icon: '🎫',
  },
  {
    stack: ['C#', '.NET', 'SQL Server', 'React'],
    icon: '📄',
  },
]

function ProjectCard({ p }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [reduced, setReduced] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const onMove = (e) => {
    const el = cardRef.current
    if (!el || reduced) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    setTilt({ rx: (0.5 - py) * 8, ry: (px - 0.5) * 8 })
    setSpot({ x: px * 100, y: py * 100 })
  }

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setSpot({ x: 50, y: 50 })
  }

  return (
    <Reveal>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: reduced
            ? undefined
            : `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
        className={`project-card glass rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl dark:hover:bg-white/10 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-accent-violet ${
          reduced ? '' : 'transition-transform duration-200 will-change-transform relative'
        }`}
      >
        {!reduced && (
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              opacity: tilt.rx === 0 && tilt.ry === 0 ? 0 : 1,
              background: `radial-gradient(300px circle at ${spot.x}% ${spot.y}%, rgba(245,158,11,0.12) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="flex items-center gap-3 relative">
          <span
            className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-accent-violet/10 flex items-center justify-center text-2xl"
            aria-hidden="true"
          >
            {p.icon}
          </span>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {p.title}
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed relative">
          {p.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 relative">{p.role}</p>
        <div className="flex flex-wrap gap-2 mt-auto relative">
          {p.stack.map((t) => (
            <span
              key={t}
              className="tech-badge text-xs px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 dark:bg-accent-violet/10 dark:border-accent-violet/30 dark:text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const projects = t.projects.data.map((p, i) => ({
    ...p,
    stack: projectMeta[i].stack,
    icon: projectMeta[i].icon,
  }))
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h3 className="text-amber-700 dark:text-accent-cyan font-medium tracking-widest uppercase text-sm mb-2">
            {t.projects.kicker}
          </h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
            {t.projects.title}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
