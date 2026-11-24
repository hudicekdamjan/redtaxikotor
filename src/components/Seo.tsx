import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { alternatePath } from '../config/routes'
import { HREFLANG, HTML_LANG, LANGS, OG_LOCALE, SITE_NAME, SITE_URL } from '../config/site'
import { MUNICIPALITIES, EMAIL } from '../config/contacts'
import { useLang } from '../context/LangContext'

/** Page metadata: title, description, canonical, hreflang, Open Graph, JSON-LD (React 19 hoists to <head>). */
export default function Seo({ title, description, jsonLd, image = '/images/og-red-taxi.jpg' }: { title: string; description: string; jsonLd?: object | object[]; image?: string }) {
  const { lang } = useLang()
  const { pathname } = useLocation()
  const canonical = SITE_URL + pathname
  useEffect(() => { document.documentElement.lang = HTML_LANG[lang] }, [lang])
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {LANGS.map((l) => <link key={l} rel="alternate" hrefLang={HREFLANG[l]} href={SITE_URL + alternatePath(pathname, l)} />)}
      <link rel="alternate" hrefLang="x-default" href={SITE_URL + alternatePath(pathname, 'en')} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={SITE_URL + image} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      <meta name="twitter:card" content="summary_large_image" />
      {ld.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />)}
    </>
  )
}

/** LocalBusiness structured data for both dispatch branches. */
export function localBusinessLd(lang: 'en' | 'me') {
  return Object.values(MUNICIPALITIES).map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#${m.id}`,
    name: `Red Taxi ${m.id === 'kotor' ? 'Kotor' : 'Tivat'}`,
    description: lang === 'en' ? `Taxi service and airport transfers in ${m.id === 'kotor' ? 'Kotor' : 'Tivat'} Municipality, Montenegro.` : `Taxi služba i aerodromski transferi u opštini ${m.id === 'kotor' ? 'Kotor' : 'Tivat'}, Crna Gora.`,
    url: `${SITE_URL}/${lang}/`,
    image: `${SITE_URL}/images/og-red-taxi.jpg`,
    telephone: `+${m.mobileE164}`,
    email: EMAIL,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    address: { '@type': 'PostalAddress', addressLocality: m.id === 'kotor' ? 'Kotor' : 'Tivat', addressCountry: 'ME' },
    areaServed: { '@type': 'AdministrativeArea', name: m.id === 'kotor' ? 'Kotor Municipality' : 'Tivat Municipality' },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: m.hotline, contactType: 'customer service', areaServed: 'ME', availableLanguage: ['English', 'Montenegrin'] },
      { '@type': 'ContactPoint', telephone: `+${m.mobileE164}`, contactType: 'reservations', availableLanguage: ['English', 'Montenegrin'] },
    ],
  }))
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + it.path })),
  }
}
