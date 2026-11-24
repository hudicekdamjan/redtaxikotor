import type { Lang } from './site'

export type PageKey = 'home' | 'taxi' | 'airport' | 'excursions' | 'prices' | 'about' | 'contact'

export const SLUGS: Record<PageKey, Record<Lang, string>> = {
  home: { en: '', me: '' },
  taxi: { en: 'taxi-services', me: 'taxi-usluge' },
  airport: { en: 'airport-transfers', me: 'aerodromski-transferi' },
  excursions: { en: 'excursions', me: 'izleti' },
  prices: { en: 'price-list', me: 'cjenovnik' },
  about: { en: 'about-us', me: 'o-nama' },
  contact: { en: 'contact', me: 'kontakt' },
}

export const NAV_KEYS: PageKey[] = ['home', 'taxi', 'airport', 'excursions', 'prices', 'about', 'contact']

export const pathFor = (lang: Lang, key: PageKey, sub?: string) =>
  key === 'home' ? `/${lang}/` : `/${lang}/${SLUGS[key][lang]}${sub ? `/${sub}` : ''}`

/** Maps the current URL to its equivalent page in another language. */
export function alternatePath(pathname: string, to: Lang): string {
  const [, from, slug = '', sub] = pathname.split('/')
  const key = (Object.keys(SLUGS) as PageKey[]).find((k) => SLUGS[k][from as Lang] === slug)
  return key ? pathFor(to, key, sub) : `/${to}/`
}
