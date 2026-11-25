import { useRef, useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icon'
import SectionHeader from './SectionHeader'
import ProjectDrawer from './ProjectDrawer'
import { projects as projectMeta } from '../data'
import { useLanguage } from '../contexts/LanguageContext'

const FILTERS = ['all', 'enterprise', 'transport', 'ai']

function ProjectCard({ p, onOpen, viewDetail }) {
  return (
    <article className="group relative flex flex-col justify-between p-7 card-interactive">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="icon-tile">
            <Icon name={p.icon} size={22} />
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-chalk border border-hairline text-muted font-medium">
            {p.categoryLabel}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl text-graphite font-bold">{p.title}</h3>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{p.description}</p>
        </div>
        <div className="p-3 rounded-lg bg-chalk border border-hairline flex flex-wrap items-center justify-between gap-2 text-muted font-mono text-xs">
          <span>{p.stack.slice(0, 2).join(' + ')}</span>
          <span className="text-graphite font-semibold">{p.role}</span>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {p.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 pt-4 border-t border-hairline">
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="w-full flex items-center justify-between text-cobalt text-sm font-semibold rounded after:absolute after:inset-0 after:rounded-2xl after:content-['']"
        >
          <span className="group-hover:underline">
            {viewDetail}
            <span className="sr-only"> — {p.title}</span>
          </span>
          <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)
  const triggerRef = useRef(null)

  const projects = t.projects.data.map((p, i) => ({
    ...p,
    ...projectMeta[i],
    categoryLabel: t.projects.filters[projectMeta[i].category],
  }))

  const count = (f) => (f === 'all' ? projects.length : projects.filter((p) => p.category === f).length)
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const open = (index) => {
    triggerRef.current = document.activeElement
    setOpenIndex(index)
  }
  const close = ({ restoreFocus = true } = {}) => {
    setOpenIndex(null)
    if (restoreFocus) triggerRef.current?.focus?.()
  }

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 mb-10">
          <SectionHeader
            id="projects-title"
            kicker={t.projects.kicker}
            title={t.projects.title}
            intro={t.projects.intro}
          />
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-hairline" role="group" aria-label={t.projects.filterLabel}>
            <span className="font-mono text-xs text-subtle uppercase mr-2" aria-hidden="true">
              {t.projects.filterLabel}
            </span>
            {FILTERS.filter((f) => count(f) > 0).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all ${
                  filter === f
                    ? 'bg-graphite text-white border-graphite'
                    : 'bg-paper text-muted border-hairline hover:border-graphite hover:text-graphite'
                }`}
              >
                {t.projects.filters[f]} ({count(f)})
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((p) => (
            <ProjectCard
              key={p.id}
              p={p}
              viewDetail={t.projects.viewDetail}
              onOpen={() => open(projects.indexOf(p))}
            />
          ))}
        </div>
      </div>

      {openIndex !== null && <ProjectDrawer project={projects[openIndex]} onClose={close} />}
    </section>
  )
}
