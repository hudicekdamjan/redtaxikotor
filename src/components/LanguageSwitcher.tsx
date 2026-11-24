import { Link, useLocation } from 'react-router-dom'
import { alternatePath } from '../config/routes'
import { LANGS } from '../config/site'
import { storeLang, useLang } from '../context/LangContext'

/** EN | ME — links to the equivalent page in the other language. */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, t } = useLang()
  const { pathname } = useLocation()
  return (
    <nav aria-label={t.common.language} className={`flex items-center rounded-full bg-white/10 p-0.5 text-xs font-bold ${className}`}>
      {LANGS.map((l) => (
        <Link
          key={l}
          to={alternatePath(pathname, l)}
          onClick={() => storeLang(l)}
          hrefLang={l === 'me' ? 'sr-ME' : 'en'}
          aria-current={l === lang ? 'true' : undefined}
          className={`rounded-full px-2.5 py-1.5 uppercase tracking-wider transition ${l === lang ? 'bg-white text-ink' : 'text-white/70 hover:text-white'}`}
        >
          {l}
        </Link>
      ))}
    </nav>
  )
}
