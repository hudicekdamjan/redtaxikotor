import { ArrowLeftRight, Phone } from 'lucide-react'
import { MUNICIPALITIES, MUNICIPALITY_IDS, telHotline, viberLink, whatsappLink } from '../config/contacts'
import { useLang } from '../context/LangContext'
import { useMunicipality } from '../context/MunicipalityContext'
import { ViberIcon, WhatsAppIcon } from './BrandIcons'

/**
 * Fixed bottom bar on mobile. Until the visitor picks where they ARE,
 * it offers Kotor and Tivat as two choices — it never guesses.
 */
export default function MobileContactBar() {
  const { t } = useLang()
  const { selected, select } = useMunicipality()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-3 pb-[max(env(safe-area-inset-bottom),10px)] pt-2.5 backdrop-blur-md md:hidden">
      {!selected ? (
        <div>
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">{t.location.pick}</p>
          <div className="grid grid-cols-2 gap-2">
            {MUNICIPALITY_IDS.map((id) => (
              <button key={id} type="button" onClick={() => select(id)} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 text-white ring-1 ring-white/15 active:bg-white/20">
                <span className="text-sm font-bold uppercase tracking-wide">{t.common[id]}</span>
                <span className="font-display text-base font-extrabold text-red">{MUNICIPALITIES[id].hotline}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => select(selected === 'kotor' ? 'tivat' : 'kotor')} className="flex h-12 shrink-0 flex-col items-center justify-center rounded-xl px-2 text-white/80 ring-1 ring-white/15" aria-label={`${t.location.change}: ${t.common[selected]}`}>
            <span className="text-[10px] font-bold uppercase leading-none tracking-wider">{t.common[selected]}</span>
            <ArrowLeftRight className="mt-1 h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <div className="grid flex-1 grid-cols-3 gap-2">
            <a href={telHotline(MUNICIPALITIES[selected])} className="flex h-12 flex-col items-center justify-center rounded-xl bg-red text-white">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="mt-0.5 text-[11px] font-bold uppercase">{t.common.call} {MUNICIPALITIES[selected].hotline}</span>
            </a>
            <a href={viberLink(MUNICIPALITIES[selected])} className="flex h-12 flex-col items-center justify-center rounded-xl bg-viber text-white">
              <ViberIcon className="h-[18px] w-[18px]" />
              <span className="mt-0.5 text-[11px] font-bold uppercase">{t.common.viber}</span>
            </a>
            <a href={whatsappLink(MUNICIPALITIES[selected])} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-col items-center justify-center rounded-xl bg-whatsapp text-white">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              <span className="mt-0.5 text-[11px] font-bold uppercase">{t.common.whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
