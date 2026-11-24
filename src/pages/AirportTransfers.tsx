import { ArrowRight, Car, Clock, Hotel, PlaneLanding, Ship, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import CtaBand from '../components/CtaBand'
import Hero from '../components/Hero'
import PriceCard from '../components/PriceCard'
import { Container, SectionHeading } from '../components/Section'
import Seo, { breadcrumbLd } from '../components/Seo'
import ServiceCard from '../components/ServiceCard'
import { pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'
import { AIRPORT_TRANSFERS, INTERCITY_TRANSFERS } from '../data/prices'
import { Plane } from 'lucide-react'

const ICONS = [PlaneLanding, UserRound, Hotel, Ship, Clock, Car]

export default function AirportTransfers() {
  const { lang, t } = useLang()
  const p = t.airport
  const ld = [
    breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.airport, path: pathFor(lang, 'airport') }]),
    {
      '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Airport transfer', name: p.hero.title,
      provider: { '@id': 'https://www.redtaxikotor.com/#kotor' }, areaServed: 'Montenegro',
      offers: AIRPORT_TRANSFERS.map((r) => ({ '@type': 'Offer', name: `${r.from} – ${r.to}`, price: r.price, priceCurrency: 'EUR' })),
    },
  ]
  return (
    <>
      <Seo title={t.meta.airport.title} description={t.meta.airport.description} jsonLd={ld} />
      <Hero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} image="tivatAirport">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#book" className="inline-flex h-14 items-center justify-center rounded-full bg-red px-8 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-dark">{t.common.bookTransfer}</a>
          <a href="#routes" className="inline-flex h-14 items-center justify-center rounded-full px-8 text-sm font-bold uppercase tracking-wide text-white ring-1 ring-white/40 hover:bg-white hover:text-ink">{p.routes.title}</a>
        </div>
      </Hero>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={p.services.eyebrow} title={p.services.title} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.services.items.map((s, i) => <ServiceCard key={s.title} icon={ICONS[i]} title={s.title} text={s.text} />)}
          </div>
        </Container>
      </section>

      <section id="routes" className="scroll-mt-24 bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={p.routes.eyebrow} title={p.routes.title} subtitle={p.routes.subtitle} />
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
            <PriceCard title={p.routes.tivat} rows={AIRPORT_TRANSFERS} icon={<Plane className="h-6 w-6" aria-hidden="true" />} />
            <div className="space-y-6">
              <PriceCard title={p.routes.other} rows={INTERCITY_TRANSFERS} icon={<Car className="h-6 w-6" aria-hidden="true" />} />
              <p className="text-sm text-stone">{t.common.allPricesEur}</p>
              <Link to={pathFor(lang, 'prices')} className="inline-flex items-center gap-2 font-semibold text-red hover:underline">{t.common.viewFullPriceList}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="book" className="scroll-mt-20 bg-ink py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={p.book.eyebrow} title={p.book.title} subtitle={p.book.subtitle} light />
            <p className="mt-6 rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-white/75 ring-1 ring-white/10">{t.location.rule}</p>
          </div>
          <div className="rounded-3xl bg-ink-800 p-6 ring-1 ring-white/10 sm:p-10 lg:col-span-8">
            <BookingForm idPrefix="airport" defaults={{ pickup: lang === 'me' ? 'Aerodrom Tivat' : 'Tivat Airport' }} />
          </div>
        </Container>
      </section>

      <CtaBand title={t.location.question} text={t.location.rule} />
    </>
  )
}
