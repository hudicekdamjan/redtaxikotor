import { Briefcase, Building2, Car, Hotel, UserCheck, Users } from 'lucide-react'
import ContactCard from '../components/ContactCard'
import CtaBand from '../components/CtaBand'
import Hero from '../components/Hero'
import { Container, SectionHeading } from '../components/Section'
import Seo, { breadcrumbLd } from '../components/Seo'
import ServiceCard from '../components/ServiceCard'
import Img from '../components/Img'
import { pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'

const ICONS = [Building2, Hotel, Briefcase, Users, UserCheck, Car]

export default function TaxiServices() {
  const { lang, t } = useLang()
  const p = t.taxi
  return (
    <>
      <Seo title={t.meta.taxi.title} description={t.meta.taxi.description} jsonLd={breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.taxi, path: pathFor(lang, 'taxi') }])} />
      <Hero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} image="kotor">
        <a href="#lines" className="inline-flex h-14 items-center rounded-full bg-red px-8 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-dark">{t.common.callTaxi}</a>
      </Hero>

      <section id="lines" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading eyebrow={t.location.question} title={p.intro.title} subtitle={p.intro.text} />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {(['kotor', 'tivat'] as const).map((id) => (
                  <div key={id} className="rounded-2xl border-l-4 border-red bg-mist p-5">
                    <h3 className="font-display text-lg font-bold text-ink">{p[id].title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone">{p[id].text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lift lg:col-span-6">
              <Img name="car" sizes="(min-width:1024px) 600px, 100vw" className="aspect-[2/1] w-full object-cover" />
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <ContactCard id="kotor" />
            <ContactCard id="tivat" />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={p.types.eyebrow} title={p.types.title} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.types.items.map((s, i) => <ServiceCard key={s.title} icon={ICONS[i]} title={s.title} text={s.text} index={i} />)}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={p.how.eyebrow} title={p.how.title} center />
          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {p.how.steps.map((s, i) => (
              <li key={s.title} className="relative text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red font-display text-2xl font-extrabold text-white shadow-[0_12px_30px_-10px_rgba(215,25,32,.9)]">{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-stone">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title={t.location.question} text={t.location.rule} />
    </>
  )
}
