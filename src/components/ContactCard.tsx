import { MapPin, Phone } from 'lucide-react'
import { MUNICIPALITIES, mapsEmbed, mapsLink, telMobile, type MunicipalityId } from '../config/contacts'
import { fmt, useLang } from '../context/LangContext'
import ContactButtons from './ContactButtons'

/** Large contact card for one municipality: hotline + CALL · VIBER · WHATSAPP (+ optional map). */
export default function ContactCard({ id, tone = 'light', withMap = false }: { id: MunicipalityId; tone?: 'light' | 'dark'; withMap?: boolean }) {
  const { t } = useLang()
  const m = MUNICIPALITIES[id]
  const dark = tone === 'dark'
  return (
    <article className={`flex flex-col overflow-hidden rounded-2xl ${dark ? 'bg-ink-800 text-white ring-1 ring-white/10' : 'bg-white text-ink shadow-card ring-1 ring-black/5'}`}>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-white/60' : 'text-stone'}`}>Red Taxi</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">{t.common[id === 'kotor' ? 'kotorMunicipality' : 'tivatMunicipality']}</h3>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red/10 text-red"><MapPin className="h-5 w-5" aria-hidden="true" /></span>
        </div>
        <p className={`mt-3 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-stone'}`}>{t.location[id === 'kotor' ? 'kotorDesc' : 'tivatDesc']}</p>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-current/10 pt-5" style={{ borderColor: dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)' }}>
          <div>
            <p className={`text-xs font-medium uppercase tracking-wider ${dark ? 'text-white/50' : 'text-stone'}`}>{t.common.hotline}</p>
            <p className="font-display text-5xl font-extrabold leading-none tracking-tight text-red">{m.hotline}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs font-medium uppercase tracking-wider ${dark ? 'text-white/50' : 'text-stone'}`}>{t.common.mobile}</p>
            <a href={telMobile(m)} className="mt-1 inline-flex items-center gap-1.5 font-semibold hover:text-red"><Phone className="h-4 w-4" aria-hidden="true" />{m.mobileDisplay}</a>
          </div>
        </div>
        <ContactButtons id={id} className="mt-6" />
        <p className={`mt-3 text-xs ${dark ? 'text-white/50' : 'text-stone'}`}>{fmt(t.location.fromForeignSim, { m: m.mobileDisplay })}</p>
      </div>
      {withMap && (
        <div className="relative">
          <iframe title={`Google Maps – ${t.common[id]}`} src={mapsEmbed(m)} className="block h-64 w-full border-0 grayscale-[30%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a href={mapsLink(m)} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-ink shadow-card hover:text-red">{t.common.openInMaps}</a>
        </div>
      )}
    </article>
  )
}
