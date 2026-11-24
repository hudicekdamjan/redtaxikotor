import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { PLACE_ME, type PriceRow } from '../data/prices'
import { useLang } from '../context/LangContext'

export const place = (name: string, lang: 'en' | 'me') => (lang === 'me' ? PLACE_ME[name] ?? name : name)

/** Price category: rows render as a table on desktop and as stacked cards on mobile. */
export default function PriceCard({ title, text, rows, icon, footer, id }: { title: string; text?: string; rows: PriceRow[]; icon?: ReactNode; footer?: ReactNode; id?: string }) {
  const { lang, t } = useLang()
  return (
    <section id={id} className="scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
      <header className="flex items-center gap-4 border-b border-black/5 p-6 sm:p-8">
        {icon && <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red text-white">{icon}</span>}
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">{title}</h2>
          {text && <p className="mt-0.5 text-sm text-stone">{text}</p>}
        </div>
      </header>
      <ul className="divide-y divide-black/5">
        {rows.map((r) => (
          <li key={r.from + r.to} className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-mist/60 sm:px-8">
            <div className="min-w-0 text-[15px]">
              <span className="block text-xs text-stone sm:inline sm:text-[15px]">{place(r.from, lang)}</span>
              <ArrowRight className="mx-2 hidden h-4 w-4 text-red sm:inline" aria-hidden="true" />
              <span className="font-semibold text-ink">{place(r.to, lang)}</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-display text-2xl font-extrabold text-red">{r.price === null ? t.common.priceOnRequest : `€${r.price}`}</span>
              {r.seasonal && <span className="block text-xs text-stone">{t.prices.julyAugust}: €{r.seasonal.price}</span>}
            </div>
          </li>
        ))}
      </ul>
      {footer && <div className="border-t border-black/5 bg-mist/60 p-6 sm:px-8">{footer}</div>}
    </section>
  )
}
