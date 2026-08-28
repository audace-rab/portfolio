const techs = [
  'C#',
  '.NET',
  'React',
  'Angular',
  'Vue.js',
  'Oracle',
  'SQL Server',
  'TypeScript',
  'Git',
  'Azure DevOps',
  'REST API',
  'Entity Framework',
  'Docker',
]

export default function TechMarquee() {
  const doubled = [...techs, ...techs]
  return (
    <div className="marquee-mask overflow-hidden py-6" aria-hidden="true">
      <div className="marquee-track gap-4 pr-4 hover:[animation-play-state:paused]">
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="shrink-0 glass rounded-full px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}