import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Briefcase, Car, Clock, MapPin, Mountain, Plane, ShieldCheck, Star } from 'lucide-react'
import BookingForm from '../components/BookingForm'
import ContactButtons from '../components/ContactButtons'
import Img from '../components/Img'
import LocationSection from '../components/LocationSection'
import { place } from '../components/PriceCard'
import { Container, Eyebrow, SectionHeading } from '../components/Section'
import Seo, { localBusinessLd } from '../components/Seo'
import TourCard from '../components/TourCard'
import { MUNICIPALITIES, MUNICIPALITY_IDS } from '../config/contacts'
import type { ImageKey } from '../config/images'
import { pathFor, type PageKey } from '../config/routes'
import { useLang } from '../context/LangContext'
import { EXCURSIONS } from '../data/excursions'
import { AIRPORT_TRANSFERS } from '../data/prices'

const SERVICE_LINKS: { key: PageKey; img: ImageKey; icon: typeof Car; hash?: string }[] = [
  { key: 'taxi', img: 'kotorNight', icon: Car },
  { key: 'airport', img: 'tivatAirport', icon: Plane },
  { key: 'excursions', img: 'gospa', icon: Mountain },
  { key: 'taxi', img: 'interior', icon: Briefcase },
]
const DESTINATIONS: { to: string; img: ImageKey }[] = [
  { to: 'Kotor Old Town', img: 'kotor' },
  { to: 'Perast', img: 'perastPanorama' },
  { to: 'Budva', img: 'budva' },
  { to: 'Sveti Stefan', img: 'svetiStefan' },
]
const WHY_ICONS = [Clock, ShieldCheck, MapPin, Car]

export default function Home() {
  const { lang, t } = useLang()
  const h = t.home
  const featured = AIRPORT_TRANSFERS.filter((r) => r.featured)
  const kotorPrice = AIRPORT_TRANSFERS[0].price

  return (
    <>
      <Seo title={t.meta.home.title} description={t.meta.home.description} jsonLd={localBusinessLd(lang)} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Img name="heroBay" priority className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/20" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
        <Container className="grid items-center gap-12 pb-40 pt-32 sm:pt-40 lg:grid-cols-12 lg:pb-48 lg:pt-44">
          <div className="animate-rise lg:col-span-6">
            <Eyebrow light>{h.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-[52px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl xl:text-[88px]">
              {h.hero.title1}
              <span className="block italic text-red">{h.hero.title2}</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl">{h.hero.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#location" className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-red px-8 text-sm font-bold uppercase tracking-wide text-white shadow-[0_14px_34px_-10px_rgba(215,25,32,.9)] transition hover:bg-red-dark">
                {t.common.callTaxi}
                <span className="font-display text-base">{MUNICIPALITIES.kotor.hotline} · {MUNICIPALITIES.tivat.hotline}</span>
              </a>
              <Link to={`${pathFor(lang, 'airport')}#book`} className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold uppercase tracking-wide text-white ring-1 ring-white/40 transition hover:bg-white hover:text-ink">
                {t.common.bookTransfer}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative animate-rise [animation-delay:150ms] lg:col-span-6">
            <div className="overflow-hidden rounded-[28px] shadow-lift ring-1 ring-white/15">
              <Img name="car" priority sizes="(min-width:1024px) 600px, 100vw" className="aspect-[2/1] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:left-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red text-white"><Plane className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-medium text-stone">{h.hero.badge}</p>
                <p className="font-display text-xl font-extrabold leading-tight text-ink">€{kotorPrice}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES OVERVIEW — overlaps hero */}
      <section aria-labelledby="services-title" className="relative z-10 -mt-24 lg:-mt-28">
        <Container>
          <h2 id="services-title" className="sr-only">{h.services.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {h.services.items.map((s, i) => {
              const l = SERVICE_LINKS[i]
              const Icon = l.icon
              return (
                <Link key={s.title} to={pathFor(lang, l.key)} className="group relative block overflow-hidden rounded-2xl bg-ink shadow-lift">
                  <Img name={l.img} sizes="(min-width:1024px) 300px, (min-width:640px) 50vw, 100vw" className="aspect-[16/9] w-full object-cover opacity-80 sm:aspect-[4/3] transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <Icon className="h-5 w-5 text-red" aria-hidden="true" />
                    <h3 className="mt-2 font-display text-xl font-bold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-white/75">{s.text}</p>
                  </div>
                  <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red text-white transition group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* AIRPORT PRICES + BOOKING */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={h.airport.eyebrow} title={h.airport.title} subtitle={h.airport.subtitle} />
            <ul className="mt-8 divide-y divide-black/5 rounded-2xl bg-white shadow-card ring-1 ring-black/5">
              {featured.map((r) => (
                <li key={r.to} className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="flex items-center gap-3 text-[15px]">
                    <MapPin className="h-4 w-4 shrink-0 text-red" aria-hidden="true" />
                    <span><span className="text-stone">{place(r.from, lang)}</span> <ArrowRight className="mx-1 inline h-3.5 w-3.5 text-stone" aria-hidden="true" /> <strong className="font-semibold text-ink">{place(r.to, lang)}</strong></span>
                  </span>
                  <span className="font-display text-2xl font-extrabold text-red">€{r.price}</span>
                </li>
              ))}
            </ul>
            <Link to={pathFor(lang, 'prices')} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red">
              {t.common.viewFullPriceList}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div id="book-home" className="relative overflow-hidden rounded-3xl bg-ink p-6 shadow-lift sm:p-10 lg:col-span-7">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red/20 blur-3xl" aria-hidden="true" />
            <h2 className="relative font-display text-3xl font-extrabold text-white">{t.airport.book.title}</h2>
            <p className="relative mt-2 text-white/65">{t.airport.book.subtitle}</p>
            <div className="relative mt-8"><BookingForm idPrefix="home" /></div>
          </div>
        </Container>
      </section>

      {/* WHERE ARE YOU LOCATED */}
      <LocationSection />

      {/* POPULAR DESTINATIONS */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow={h.destinations.eyebrow} title={h.destinations.title} subtitle={h.destinations.subtitle} />
            <Link to={pathFor(lang, 'airport')} className="inline-flex items-center gap-2 font-semibold text-red hover:underline">{t.nav.airport}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => {
              const row = AIRPORT_TRANSFERS.find((r) => r.to === d.to)!
              return (
                <Link key={d.to} to={pathFor(lang, 'airport')} className="group relative block overflow-hidden rounded-2xl bg-ink">
                  <Img name={d.img} sizes="(min-width:1024px) 300px, 50vw" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/60">{place('Tivat Airport', lang)} →</p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white">{place(d.to, lang)}</h3>
                    </div>
                    <span className="rounded-full bg-red px-3 py-1 font-display text-lg font-extrabold text-white">€{row.price}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* EXCURSIONS */}
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow={h.excursions.eyebrow} title={h.excursions.title} subtitle={h.excursions.subtitle} />
            <Link to={pathFor(lang, 'excursions')} className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-red px-6 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-dark">{t.common.viewAllExcursions}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXCURSIONS.slice(0, 4).map((x) => <TourCard key={x.slug} tour={x} compact />)}
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative isolate overflow-hidden bg-ink py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Eyebrow light>{h.why.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">{h.why.title}</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:col-span-8">
            {h.why.items.map((w, i) => {
              const Icon = WHY_ICONS[i]
              return (
                <li key={w.title} className="bg-ink p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red text-white"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">{w.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{w.text}</p>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* REVIEWS (no invented testimonials — invites real feedback) */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col items-start gap-8 rounded-3xl bg-white p-8 shadow-card ring-1 ring-black/5 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex gap-1 text-red" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-red">{h.reviews.eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">{h.reviews.title}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-stone">{h.reviews.text}</p>
            </div>
            <Link to={`${pathFor(lang, 'contact')}#message`} className="inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-ink px-8 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red">{h.reviews.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section className="bg-red py-16 text-white sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">{h.contact.title}</h2>
            <p className="mt-3 text-lg text-white/85">{h.contact.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {MUNICIPALITY_IDS.map((id) => (
              <div key={id} className="rounded-2xl bg-ink p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider text-white/70">{t.common[id]}</span>
                  <span className="font-display text-3xl font-extrabold text-white">{MUNICIPALITIES[id].hotline}</span>
                </div>
                <ContactButtons id={id} variant="compact" className="mt-4" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
