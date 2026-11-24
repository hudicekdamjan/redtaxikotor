import { ChevronDown, Mail } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Hero from '../components/Hero'
import LocationSection from '../components/LocationSection'
import { Container, SectionHeading } from '../components/Section'
import Seo, { breadcrumbLd, localBusinessLd } from '../components/Seo'
import { EMAIL } from '../config/contacts'
import { pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'

export default function Contact() {
  const { lang, t } = useLang()
  const p = t.contact
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  return (
    <>
      <Seo title={t.meta.contact.title} description={t.meta.contact.description} jsonLd={[...localBusinessLd(lang), faqLd, breadcrumbLd([{ name: t.nav.home, path: pathFor(lang, 'home') }, { name: t.nav.contact, path: pathFor(lang, 'contact') }])]} />
      <Hero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} image="heroBay" />
      <LocationSection id="locations" tone="light" withMap />

      <section id="message" className="scroll-mt-20 bg-ink py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={p.form.title} subtitle={p.form.subtitle} light />
            <a href={`mailto:${EMAIL}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-white hover:text-red"><Mail className="h-5 w-5 text-red" aria-hidden="true" />{EMAIL}</a>
          </div>
          <div className="rounded-3xl bg-ink-800 p-6 ring-1 ring-white/10 sm:p-10 lg:col-span-8"><ContactForm /></div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading title={p.faq.title} center />
          <div className="mt-10 divide-y divide-black/10 rounded-2xl bg-white shadow-card ring-1 ring-black/5">
            {p.faq.items.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}<ChevronDown className="h-5 w-5 shrink-0 text-red transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 leading-relaxed text-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
