import { Repeat, Info } from 'lucide-react'
import { useLang } from '../context/LangContext'

/** Price note + "only within Kotor and Tivat municipalities" rule for return transfers. */
export default function ReturnIntro() {
  const { t } = useLang()
  const r = t.prices.returnTrips
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="flex items-start gap-2.5 font-semibold text-ink"><Repeat className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />{r.bothRides}</p>
      <p className="flex items-start gap-2.5 text-stone"><Info className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />{r.rule}</p>
    </div>
  )
}
