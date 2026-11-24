import { Info } from 'lucide-react'
import { MUNICIPALITY_IDS } from '../config/contacts'
import { useLang } from '../context/LangContext'
import ContactCard from './ContactCard'
import { Container, SectionHeading } from './Section'

/** "Where are you located?" — two municipality cards with CALL · VIBER · WHATSAPP */
export default function LocationSection({ id = 'location', withMap = false, title, tone = 'dark' }: { id?: string; withMap?: boolean; title?: string; tone?: 'dark' | 'light' }) {
  const { t } = useLang()
  const dark = tone === 'dark'
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${dark ? 'bg-ink' : 'bg-mist'}`}>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.common.available247} title={title ?? t.location.question} light={dark} />
          <p className={`flex max-w-md items-start gap-3 rounded-xl p-4 text-sm leading-relaxed ${dark ? 'bg-white/5 text-white/80 ring-1 ring-white/10' : 'bg-white text-ink shadow-card'}`}>
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
            {t.location.rule}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {MUNICIPALITY_IDS.map((m) => <ContactCard key={m} id={m} tone={dark ? 'dark' : 'light'} withMap={withMap} />)}
        </div>
      </Container>
    </section>
  )
}
