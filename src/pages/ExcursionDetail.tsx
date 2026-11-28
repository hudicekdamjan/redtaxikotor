import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, MapPin, Wallet } from 'lucide-react'
import BookingForm from '../components/BookingForm'
import Img from '../components/Img'
import { Container, Eyebrow, SectionHeading } from '../components/Section'
import Seo, { breadcrumbLd } from '../components/Seo'
import TourCard from '../components/TourCard'
import { EXCURSION_IMAGE } from '../config/images'
import { pathFor } from '../config/routes'
import { SITE_URL } from '../config/site'
import { fmt, useLang } from '../context/LangContext'
import { EXCURSIONS } from '../data/excursions'
import NotFound from './NotFound'

export default function ExcursionDetail() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const tour = EXCURSIONS.find((x) => x.slug === slug)
  if (!tour) return <NotFound />
  const c = t.excursions.items[tour.slug]
  const d = t.excursions.detail
  const path = pathFor(lang, 'excursions', tour.slug)
  const ld = [
    breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.excursions, path: pathFor(lang, 'excursions') }, { name: c.name, path }]),
    { '@context': 'https://schema.org', '@type': 'TouristTrip', name: c.name, description: c.long, url: SITE_URL + path, itinerary: { '@type': 'ItemList', itemListElement: tour.stops.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s[lang] })) }, offers: { '@type': 'Offer', price: tour.price, priceCurrency: 'EUR' }, provider: { '@id': `${SITE_URL}/#kotor` } },
  ]
  return (
    <>
      <Seo title={fmt(t.meta.excursionDetail.title, { name: c.name })} description={fmt(t.meta.excursionDetail.description, { name: c.name, price: tour.price, short: c.short })} jsonLd={ld} />
      <section className="relative isolate overflow-hidden bg-ink pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Img name={EXCURSION_IMAGE[tour.image]} priority className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden="true" />
        <Container>
          <Link to={pathFor(lang, 'excursions')} className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{d.back}</Link>
          <div className="mt-6 max-w-3xl animate-rise">
            <Eyebrow light>{t.excursions.hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">{c.name}</h1>
            <p className="mt-5 text-lg text-white/75 sm:text-xl">{c.short}</p>
            <dl className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-white"><Wallet className="h-4 w-4" aria-hidden="true" /><dt className="sr-only">{d.price}</dt><dd className="font-display text-lg font-extrabold">€{tour.price} <span className="text-sm font-medium opacity-80">/ {t.common.perTrip}</span></dd></div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-white ring-1 ring-white/20"><Clock className="h-4 w-4" aria-hidden="true" /><dt className="sr-only">{d.duration}</dt><dd className="text-sm font-semibold">{fmt(t.common.waitIncluded, { h: tour.waitHours })}{tour.extraHour ? ` · ${fmt(t.common.extraHour, { p: tour.extraHour })}` : ''}</dd></div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading title={d.about} />
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{c.long}</p>
            <h2 className="mt-12 font-display text-2xl font-extrabold text-ink">{d.route}</h2>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {tour.stops.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-4 py-2 text-sm font-semibold text-ink"><MapPin className="h-3.5 w-3.5 text-red" aria-hidden="true" />{s[lang]}</span>
                  {i < tour.stops.length - 1 && <span className="h-px w-4 bg-red" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <h2 className="mt-12 font-display text-2xl font-extrabold text-ink">{d.highlights}</h2>
            <ul className="mt-5 space-y-3">
              {c.highlights.map((h) => <li key={h} className="flex items-start gap-3 text-[17px] text-ink/80"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red text-white"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>{h}</li>)}
            </ul>
            <p className="mt-10 rounded-xl bg-mist p-4 text-sm text-stone">{d.note} {t.common.allPricesEur}</p>
          </div>
          <aside id="book" className="scroll-mt-24 lg:col-span-5">
            <div className="rounded-3xl bg-ink p-6 shadow-lift sm:p-8 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-extrabold text-white">{d.book}</h2>
              <p className="mt-2 text-sm text-white/65">{d.bookText}</p>
              <div className="mt-6"><BookingForm idPrefix="tour" excursionName={c.name} defaults={{ pickup: 'Kotor', destination: c.name }} /></div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-mist py-20">
        <Container>
          <SectionHeading title={d.other} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXCURSIONS.filter((x) => x.slug !== tour.slug).slice(0, 3).map((x) => <TourCard key={x.slug} tour={x} />)}
          </div>
        </Container>
      </section>
    </>
  )
}
