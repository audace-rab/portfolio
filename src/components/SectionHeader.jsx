export default function SectionHeader({ kicker, title, intro, id, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="kicker">{kicker}</span>
        <span className="h-px w-12 bg-hairline" aria-hidden="true" />
      </div>
      <h2 id={id} className="font-serif text-3xl sm:text-4xl text-graphite tracking-tight font-bold">
        {title}
      </h2>
      {intro && <p className="text-sm text-muted max-w-2xl leading-relaxed">{intro}</p>}
      {children}
    </div>
  )
}
