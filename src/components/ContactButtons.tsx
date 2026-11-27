import { Phone } from 'lucide-react'
import { MUNICIPALITIES, telHotline, viberLink, whatsappLink, type MunicipalityId } from '../config/contacts'
import { useLang, fmt } from '../context/LangContext'
import { useMunicipality } from '../context/MunicipalityContext'
import { ViberIcon, WhatsAppIcon } from './BrandIcons'

type Variant = 'large' | 'compact' | 'icon'

const base = 'inline-flex min-w-0 items-center justify-center font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
const styles = {
  call: 'bg-red text-white hover:bg-red-dark focus-visible:outline-red',
  viber: 'bg-viber text-white hover:brightness-110 focus-visible:outline-viber',
  whatsapp: 'bg-whatsapp text-white hover:brightness-110 focus-visible:outline-whatsapp',
}
const sizes: Record<Variant, string> = {
  // Phones: icon above the label so "WhatsApp" fits three-in-a-row; wider screens: side by side.
  large: 'h-14 w-full flex-col gap-1 rounded-xl px-1 text-[12px] leading-none sm:flex-row sm:gap-2 sm:px-4 sm:text-[15px]',
  // Compact (call dropdown, contact bands): always icon above label — the buttons are narrow everywhere.
  compact: 'h-14 w-full flex-col gap-1 rounded-lg px-1 text-[12px] leading-none',
  icon: 'h-10 w-10 rounded-lg',
}

/** CALL · VIBER · WHATSAPP for one municipality. All links come from config/contacts.ts. */
export default function ContactButtons({ id, variant = 'large', message, className = '' }: { id: MunicipalityId; variant?: Variant; message?: string; className?: string }) {
  const { t } = useLang()
  const { select } = useMunicipality()
  const m = MUNICIPALITIES[id]
  const name = t.common[id]
  const iconCls = `shrink-0 ${variant === 'large' ? 'h-5 w-5' : 'h-[18px] w-[18px]'}`
  const label = (s: string) => (variant === 'icon' ? <span className="sr-only">{s}</span> : <span>{s}</span>)
  const remember = () => select(id)
  return (
    <div className={`grid grid-cols-3 gap-2 ${variant === 'icon' ? 'w-auto' : ''} ${className}`}>
      <a href={telHotline(m)} onClick={remember} className={`${base} ${styles.call} ${sizes[variant]}`} aria-label={`${fmt(t.location.callHotline, { n: m.hotline })} – ${name}`}>
        <Phone className={iconCls} aria-hidden="true" />
        {label(t.common.call)}
      </a>
      <a href={viberLink(m)} onClick={remember} className={`${base} ${styles.viber} ${sizes[variant]}`} aria-label={`Viber ${m.mobileDisplay} – ${name}`}>
        <ViberIcon className={iconCls} />
        {label(t.common.viber)}
      </a>
      <a href={whatsappLink(m, message)} onClick={remember} target="_blank" rel="noopener noreferrer" className={`${base} ${styles.whatsapp} ${sizes[variant]}`} aria-label={`WhatsApp ${m.mobileDisplay} – ${name}`}>
        <WhatsAppIcon className={iconCls} />
        {label(t.common.whatsapp)}
      </a>
    </div>
  )
}
