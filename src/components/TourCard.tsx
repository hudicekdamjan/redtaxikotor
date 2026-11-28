import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import { EXCURSION_IMAGE } from '../config/images'
import { pathFor } from '../config/routes'
import type { Excursion } from '../data/excursions'
import { fmt, useLang } from '../context/LangContext'
import Img from './Img'

export default function TourCard({ tour, compact = false }: { tour: Excursion; compact?: boolean }) {
  const { lang, t } = useLang()
  const copy = t.excursions.items[tour.slug]
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={`relative overflow-hidden bg-ink ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <Img name={EXCURSION_IMAGE[tour.image]} sizes="(min-width:1024px) 400px, 100vw" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
        <p className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 font-display text-sm font-extrabold text-ink">€{tour.price}<span className="ml-1 text-xs font-medium text-stone">/ {t.common.perTrip}</span></p>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
          <Link to={pathFor(lang, 'excursions', tour.slug)} className="after:absolute after:inset-0">{copy.name}</Link>
        </h3>
        {!compact && <p className="mt-2 text-[15px] leading-relaxed text-stone">{copy.short}</p>}
        <div className={`mt-auto flex items-center pt-5 text-sm ${compact ? "justify-end" : "justify-between gap-3"}`}>
          {!compact && <span className="inline-flex items-center gap-1.5 text-stone"><Clock className="h-4 w-4" aria-hidden="true" />{fmt(t.common.waitIncluded, { h: tour.waitHours })}{tour.extraHour ? ` · ${fmt(t.common.extraHour, { p: tour.extraHour })}` : ''}</span>}
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-red">{t.common.discoverMore}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span>
        </div>
      </div>
    </article>
  )
}
