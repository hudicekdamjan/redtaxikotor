import { MUNICIPALITIES, MUNICIPALITY_IDS } from '../config/contacts'
import { useLang } from '../context/LangContext'
import ContactButtons from './ContactButtons'
import { Container } from './Section'

/** Compact contact band used at the bottom of inner pages. */
export default function CtaBand({ title, text }: { title: string; text: string }) {
  const { t } = useLang()
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/70">{text}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {MUNICIPALITY_IDS.map((id) => (
            <div key={id} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-white/70">{t.common[id]}</span>
                <span className="font-display text-3xl font-extrabold text-red">{MUNICIPALITIES[id].hotline}</span>
              </div>
              <ContactButtons id={id} variant="compact" className="mt-4" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
