import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { EMAIL, MUNICIPALITIES, MUNICIPALITY_IDS, telHotline, telMobile } from '../config/contacts'
import { PHOTOGRAPHER } from '../config/images'
import { InstagramIcon } from './BrandIcons'
import { NAV_KEYS, pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'
import ContactButtons from './ContactButtons'
import Logo from './Logo'
import BokaLabSignature from './BokaLabSignature'

export default function Footer() {
  const { lang, t } = useLang()
  return (
    <footer className="bg-[#0F0F0F] pb-32 pt-16 text-white md:pb-10">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to={pathFor(lang, 'home')} aria-label="Red Taxi"><Logo /></Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
            <a href={`mailto:${EMAIL}`} className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 hover:text-red"><Mail className="h-4 w-4" aria-hidden="true" />{EMAIL}</a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
            {MUNICIPALITY_IDS.map((id) => {
              const m = MUNICIPALITIES[id]
              return (
                <div key={id}>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{t.common[id === 'kotor' ? 'kotorMunicipality' : 'tivatMunicipality']}</h2>
                  <a href={telHotline(m)} className="mt-3 block font-display text-4xl font-extrabold text-red hover:text-white">{m.hotline}</a>
                  <a href={telMobile(m)} className="mt-1 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"><Phone className="h-3.5 w-3.5" aria-hidden="true" />{m.mobileDisplay}</a>
                  <ContactButtons id={id} variant="icon" className="mt-4 w-max" />
                </div>
              )
            })}
          </div>

          <nav aria-label={t.footer.quickLinks} className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{t.footer.quickLinks}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm lg:grid-cols-1">
              {NAV_KEYS.map((k) => (
                <li key={k}><Link to={pathFor(lang, k)} className="text-white/75 hover:text-white">{t.nav[k]}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          <p>© {new Date().getFullYear()} Red Taxi Kotor &amp; Tivat. {t.footer.rights}</p>
          {/* Studio credit: centred between copyright and photo credits on desktop, last on mobile */}
          <div className="order-last flex justify-center lg:order-none">
            <BokaLabSignature />
          </div>
          <div className="space-y-1.5 lg:text-right">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/60 lg:justify-end">
              <span>{t.footer.photos} © <span className="font-semibold text-white/85">{PHOTOGRAPHER.name}</span></span>
              {PHOTOGRAPHER.instagram && (
                <a href={`https://www.instagram.com/${PHOTOGRAPHER.instagram}/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 hover:text-red">
                  <InstagramIcon className="h-4 w-4" />@{PHOTOGRAPHER.instagram}
                </a>
              )}
              <span>· {t.footer.photoRights}</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
