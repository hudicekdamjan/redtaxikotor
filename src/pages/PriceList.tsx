import { Link } from 'react-router-dom'
import { ArrowRight, Car, Info, Mountain, Plane } from 'lucide-react'
import ContactButtons from '../components/ContactButtons'
import Hero from '../components/Hero'
import PriceCard from '../components/PriceCard'
import { Container } from '../components/Section'
import Seo, { breadcrumbLd } from '../components/Seo'
import { MUNICIPALITIES, MUNICIPALITY_IDS } from '../config/contacts'
import { pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'
import { EXCURSIONS } from '../data/excursions'
import { AIRPORT_TRANSFERS, INTERCITY_TRANSFERS } from '../data/prices'

function CroatiaNote() {
  const { t } = useLang()
  return <p className="mb-5 flex items-start gap-2.5 rounded-xl bg-red/5 p-4 text-sm leading-relaxed text-ink ring-1 ring-red/15"><Info className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />{t.prices.croatiaNote}</p>
}

function CategoryCta() {
  const { t } = useLang()
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{t.prices.ctaTitle} <span className="font-normal text-stone">{t.prices.ctaText}</span></p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {MUNICIPALITY_IDS.map((id) => (
          <div key={id} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-ink">{t.common[id]} <span className="block text-red">{MUNICIPALITIES[id].hotline}</span></span>
            <ContactButtons id={id} variant="icon" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PriceList() {
  const { lang, t } = useLang()
  const p = t.prices
  const cats = [
    { id: 'airport', label: p.airport.title, icon: Plane },
    { id: 'intercity', label: p.intercity.title, icon: Car },
    { id: 'excursions', label: p.excursions.title, icon: Mountain },
  ]
  return (
    <>
      <Seo title={t.meta.prices.title} description={t.meta.prices.description} jsonLd={breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.prices, path: pathFor(lang, 'prices') }])} />
      <Hero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} image="heroBay" />

      <nav aria-label={p.hero.eyebrow} className="sticky top-[72px] z-30 border-b border-black/5 bg-white/90 backdrop-blur lg:top-20">
        <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {cats.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-semibold text-ink hover:bg-red hover:text-white">
              <c.icon className="h-4 w-4" aria-hidden="true" />{c.label}
            </a>
          ))}
        </Container>
      </nav>

      <section className="bg-mist py-16 sm:py-24">
        <Container className="space-y-8">

          <PriceCard id="airport" title={p.airport.title} text={p.airport.text} rows={AIRPORT_TRANSFERS} icon={<Plane className="h-6 w-6" aria-hidden="true" />} footer={<CategoryCta />} />
          <PriceCard id="intercity" title={p.intercity.title} text={p.intercity.text} rows={INTERCITY_TRANSFERS} icon={<Car className="h-6 w-6" aria-hidden="true" />} footer={<><CroatiaNote /><CategoryCta /></>} />

          <section id="excursions" className="scroll-mt-40 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
            <header className="flex items-center gap-4 border-b border-black/5 p-6 sm:p-8">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red text-white"><Mountain className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <h2 className="font-display text-2xl font-extrabold text-ink">{p.excursions.title}</h2>
                <p className="mt-0.5 text-sm text-stone">{p.excursions.text}</p>
              </div>
            </header>
            <ul className="divide-y divide-black/5">
              {EXCURSIONS.map((x) => (
                <li key={x.slug}>
                  <Link to={pathFor(lang, 'excursions', x.slug)} className="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-mist/60 sm:px-8">
                    <span className="text-[15px] font-semibold text-ink group-hover:text-red">{t.excursions.items[x.slug].name}<ArrowRight className="ml-2 inline h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden="true" /></span>
                    <span className="shrink-0 font-display text-2xl font-extrabold text-red">€{x.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/5 bg-mist/60 p-6 sm:px-8"><CategoryCta /></div>
          </section>
          <p className="text-sm text-stone">{t.common.allPricesEur}</p>
        </Container>
      </section>
    </>
  )
}
