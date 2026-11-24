import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { MUNICIPALITY_IDS, MUNICIPALITIES } from '../config/contacts'
import { NAV_KEYS, pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'
import ContactButtons from './ContactButtons'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

function CallPanel({ onDone }: { onDone?: () => void }) {
  const { t } = useLang()
  return (
    <div className="space-y-3" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) onDone?.() }}>
      <div>
        <p className="font-display text-base font-bold text-ink">{t.header.dropdownTitle}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-stone">{t.header.dropdownHint}</p>
      </div>
      {MUNICIPALITY_IDS.map((id) => (
        <div key={id} className="rounded-xl bg-mist p-3">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-ink">{t.common[id]}</span>
            <span className="font-display text-xl font-extrabold text-red">{MUNICIPALITIES[id].hotline}</span>
          </div>
          <ContactButtons id={id} variant="compact" />
        </div>
      ))}
    </div>
  )
}

export default function Header() {
  const { lang, t } = useLang()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const callRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setMenuOpen(false); setCallOpen(false) }, [pathname])
  useEffect(() => {
    if (!callOpen) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !callRef.current?.contains(e.target as Node)) setCallOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close) }
  }, [callOpen])
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])

  const solid = scrolled || menuOpen
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'bg-ink/95 shadow-lg backdrop-blur-md' : 'bg-gradient-to-b from-black/50 to-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-ink">{t.common.skipToContent}</a>
      <div className="mx-auto flex h-[72px] max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link to={pathFor(lang, 'home')} className="text-white" aria-label="Red Taxi – Kotor · Tivat">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_KEYS.map((k) => (
              <li key={k}>
                <NavLink
                  to={pathFor(lang, k)}
                  end={k === 'home'}
                  className={({ isActive }) => `relative rounded-full px-3.5 py-2 text-[14px] font-medium transition ${isActive ? 'text-white after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-red' : 'text-white/75 hover:text-white'}`}
                >
                  {t.nav[k]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <div ref={callRef} className="relative">
            <button
              type="button"
              onClick={() => setCallOpen((v) => !v)}
              aria-expanded={callOpen}
              aria-haspopup="dialog"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-red px-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(215,25,32,.8)] transition hover:bg-red-dark sm:px-5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t.common.callTaxi}</span>
              <ChevronDown className={`h-4 w-4 transition ${callOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {callOpen && (
              <div role="dialog" aria-label={t.common.callTaxi} className="absolute right-0 top-[calc(100%+10px)] w-[min(92vw,360px)] animate-rise rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/5">
                <CallPanel onDone={() => setCallOpen(false)} />
              </div>
            )}
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-controls="mobile-menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/25 xl:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{menuOpen ? t.common.close : t.common.menu}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-ink px-4 pb-28 pt-4 xl:hidden">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-white/10">
              {NAV_KEYS.map((k) => (
                <li key={k}>
                  <NavLink to={pathFor(lang, k)} end={k === 'home'} className={({ isActive }) => `flex items-center justify-between py-4 font-display text-2xl font-bold ${isActive ? 'text-red' : 'text-white'}`}>
                    {t.nav[k]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-white/60">{t.common.language}</span>
            <LanguageSwitcher />
          </div>
          <div className="mt-6 rounded-2xl bg-white p-4"><CallPanel /></div>
        </div>
      )}
    </header>
  )
}
