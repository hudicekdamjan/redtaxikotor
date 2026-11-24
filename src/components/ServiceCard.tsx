import type { LucideIcon } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, text, index }: { icon: LucideIcon; title: string; text: string; index?: number }) {
  return (
    <article className="group relative h-full rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 text-red transition group-hover:bg-red group-hover:text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        {index !== undefined && <span className="font-display text-sm font-bold text-black/15">{String(index + 1).padStart(2, '0')}</span>}
      </div>
      <h3 className="mt-6 font-display text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-stone">{text}</p>
    </article>
  )
}
