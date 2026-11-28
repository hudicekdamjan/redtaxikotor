import { IMAGES, type ImageDef } from '../config/images'
import { Clock, Headphones, MapPinned, ShieldCheck, Sofa, UserCheck } from 'lucide-react'
import CtaBand from '../components/CtaBand'
import Hero from '../components/Hero'
import Img from '../components/Img'
import { Container, Eyebrow, SectionHeading } from '../components/Section'
import Seo, { breadcrumbLd } from '../components/Seo'
import ServiceCard from '../components/ServiceCard'
import { MUNICIPALITIES } from '../config/contacts'
import { pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'

const ICONS = [UserCheck, MapPinned, Headphones, ShieldCheck, Sofa, Clock]

const PHOTO_CREDITS = Object.values(IMAGES).flatMap((i: ImageDef) => (i.credit ? [i.credit] : []))

export default function AboutUs() {
  const { lang, t } = useLang()
  const p = t.about
  return (
    <>
      <Seo title={t.meta.about.title} description={t.meta.about.description} jsonLd={breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.about, path: pathFor(lang, 'about') }])} />
      <Hero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} image="heroBay" />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl font-extrabold italic text-ink sm:text-5xl"><span className="text-red">RED</span> TAXI</h2>
            {p.intro.paragraphs.map((x) => <p key={x} className="mt-5 text-lg leading-relaxed text-ink/80">{x}</p>)}
          </div>
          <div className="relative lg:col-span-6">
            <div className="overflow-hidden rounded-3xl shadow-lift"><Img name="car" sizes="(min-width:1024px) 600px, 100vw" className="aspect-[2/1] w-full object-cover" /></div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-ink py-20 sm:py-28">
        <Img name="heroBay" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow light>{p.areas.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">{p.areas.title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{p.areas.text}</p>
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:col-span-5">
            {(['kotor', 'tivat'] as const).map((id) => (
              <div key={id} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <dt className="text-xs font-bold uppercase tracking-wider text-white/60">{t.common[id]}</dt>
                <dd className="mt-1 font-display text-4xl font-extrabold text-red">{MUNICIPALITIES[id].hotline}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={p.values.eyebrow} title={p.values.title} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.values.items.map((v, i) => <ServiceCard key={v.title} icon={ICONS[i]} title={v.title} text={v.text} />)}
          </div>
          {/* Licence attribution for the free (CC BY-SA) photos — the footer credits only Ranko Maraš */}
          <p className="mt-12 text-xs leading-relaxed text-stone/80">{t.footer.morePhotos}: {PHOTO_CREDITS.join(' · ')}</p>
        </Container>
      </section>
      <CtaBand title={t.home.contact.title} text={t.home.contact.text} />
    </>
  )
}
