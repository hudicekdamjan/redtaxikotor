import type { ReactNode } from 'react'
import type { ImageKey } from '../config/images'
import Img from './Img'
import { Container, Eyebrow } from './Section'

/** Hero for inner pages: full-bleed photo, dark overlay, large type. */
export default function Hero({ eyebrow, title, subtitle, image, children }: { eyebrow: string; title: string; subtitle: string; image: ImageKey; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-36 sm:pb-24 sm:pt-44">
      <Img name={image} priority className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden="true" />
      <Container>
        <div className="max-w-3xl animate-rise">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-[40px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[68px]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{subtitle}</p>
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
