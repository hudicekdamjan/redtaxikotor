import { createContext, useContext, type ReactNode } from 'react'
import type { Lang } from '../config/site'
import en, { type Dict } from '../translations/en'
import me from '../translations/me'

export const DICTS: Record<Lang, Dict> = { en, me }
const LangContext = createContext<{ lang: Lang; t: Dict }>({ lang: 'en', t: en })

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={{ lang, t: DICTS[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

/** Simple {placeholder} interpolation */
export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

export const LANG_STORAGE_KEY = 'redtaxi.lang'
export function readStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY)
    return v === 'en' || v === 'me' ? v : null
  } catch {
    return null
  }
}
export function storeLang(lang: Lang) {
  try { localStorage.setItem(LANG_STORAGE_KEY, lang) } catch { /* storage unavailable */ }
}
