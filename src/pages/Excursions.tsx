import CtaBand from '../components/CtaBand'
import Hero from '../components/Hero'
import { Container, SectionHeading } from '../components/Section'
import Seo, { breadcrumbLd } from '../components/Seo'
import TourCard from '../components/TourCard'
import { pathFor } from '../config/routes'
import { SITE_URL } from '../config/site'
import { useLang } from '../context/LangContext'
import { EXCURSIONS } from '../data/excursions'

export default function Excursions() {
  const { lang, t } = useLang()
  const p = t.excursions
  const ld = [
    breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.excursions, path: pathFor(lang, 'excursions') }]),
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: EXCURSIONS.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE_URL + pathFor(lang, 'excursions', x.slug), name: p.items[x.slug].name })) },
  ]
  return (
    <>
      <Seo title={t.meta.excursions.title} description={t.meta.excursions.description} jsonLd={ld} />
      <Hero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} image="perastPanorama" />
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.nav.excursions} title={p.listTitle} subtitle={p.listSubtitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXCURSIONS.map((x) => <TourCard key={x.slug} tour={x} />)}
          </div>
          <p className="mt-8 text-sm text-stone">{p.detail.note} {t.common.allPricesEur}</p>
        </Container>
      </section>
      <CtaBand title={t.location.question} text={t.location.rule} />
    </>
  )
}
