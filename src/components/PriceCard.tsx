import type { ReactNode } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { PLACE_ME, type PriceRow } from '../data/prices'
import { useLang } from '../context/LangContext'

export const place = (name: string, lang: 'en' | 'me') => (lang === 'me' ? PLACE_ME[name] ?? name : name)

/**
 * Price category: one row per route.
 * `seasonal` shows two price columns (season / off-season); rows without an off-season price show the same price in both.
 */
export default function PriceCard({ title, text, rows, icon, footer, intro, id, seasonal = false }: { title: string; text?: string; rows: PriceRow[]; icon?: ReactNode; footer?: ReactNode; intro?: ReactNode; id?: string; seasonal?: boolean }) {
  const { lang, t } = useLang()
  const eur = (n: number | null) => (n === null ? t.common.priceOnRequest : `€${n}`)
  return (
    <section id={id} className="scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
      <header className="flex items-center gap-4 border-b border-black/5 p-6 sm:p-8">
        {icon && <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red text-white">{icon}</span>}
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">{title}</h2>
          {text && <p className="mt-0.5 text-sm text-stone">{text}</p>}
        </div>
      </header>
      {intro && <div className="border-b border-black/5 bg-mist/60 px-6 py-4 sm:px-8">{intro}</div>}
      {seasonal && (
        <>
          <p className="flex items-start gap-2.5 border-b border-red/15 bg-red/5 px-6 py-3 text-sm font-bold leading-snug text-red sm:px-8"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{t.prices.seasonDates}</p>
          <div className="flex items-end justify-end gap-2 border-b border-black/5 px-6 pb-2.5 pt-3 sm:px-8" aria-hidden="true">
            {[[t.prices.season, t.prices.seasonRange], [t.prices.offSeason, t.prices.offSeasonRange]].map(([label, range]) => (
              <span key={label} className="w-[76px] text-center leading-tight sm:w-24">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-ink">{label}</span>
                <span className="block whitespace-nowrap text-[11px] font-bold text-red sm:text-xs">{range}</span>
              </span>
            ))}
          </div>
        </>
      )}
      <ul className="divide-y divide-black/5">
        {rows.map((r) => (
          <li key={r.from + r.to} className="flex items-center justify-between gap-3 px-6 py-4 transition hover:bg-mist/60 sm:px-8">
            <div className="min-w-0 text-[15px]">
              <span className="block text-xs text-stone sm:inline sm:text-[15px]">{place(r.from, lang)}</span>
              <ArrowRight className="mx-2 hidden h-4 w-4 text-red sm:inline" aria-hidden="true" />
              <span className="font-semibold text-ink">{place(r.to, lang)}</span>
            </div>
            {seasonal ? (
              <div className="flex shrink-0 gap-2 text-center">
                <span className="w-[76px] font-display text-2xl font-extrabold text-red sm:w-24"><span className="sr-only">{t.prices.season} ({t.prices.seasonRange}): </span>{eur(r.price)}</span>
                <span className="w-[76px] font-display text-2xl font-extrabold text-ink/70 sm:w-24"><span className="sr-only">{t.prices.offSeason} ({t.prices.offSeasonRange}): </span>{eur(r.offSeason ?? r.price)}</span>
              </div>
            ) : (
              <div className="shrink-0 text-right">
                <span className="font-display text-2xl font-extrabold text-red">{eur(r.price)}</span>
                {r.note && <span className="ml-auto block max-w-[8.5rem] text-xs leading-snug text-stone sm:max-w-none">{t.prices.notes[r.note]}</span>}
              </div>
            )}
          </li>
        ))}
      </ul>
      {footer && <div className="border-t border-black/5 bg-mist/60 p-6 sm:px-8">{footer}</div>}
    </section>
  )
}
