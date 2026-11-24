import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { EMAIL, MUNICIPALITIES, MUNICIPALITY_IDS, telHotline, telMobile } from '../config/contacts'
import { IMAGES } from '../config/images'
import { NAV_KEYS, pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'
import ContactButtons from './ContactButtons'
import Logo from './Logo'

export default function Footer() {
  const { lang, t } = useLang()
  const credits = Object.values(IMAGES).flatMap((i) => ('credit' in i && i.credit ? [i.credit] : []))
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

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-start sm:justify-between">
          <p>© {new Date().getFullYear()} Red Taxi Kotor &amp; Tivat. {t.footer.rights}</p>
          {credits.length > 0 && <p className="max-w-xl sm:text-right">{t.footer.credits}: {credits.join(' · ')}</p>}
        </div>
      </div>
    </footer>
  )
}
