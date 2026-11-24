import type { ReactNode } from 'react'

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? 'text-white/70' : 'text-red'}`}>
      <span className="h-px w-8 bg-red" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, light = false, center = false, as: H = 'h2' }: { eyebrow?: string; title: string; subtitle?: string; light?: boolean; center?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center [&>p:first-child]:justify-center' : ''}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <H className={`mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-[42px] ${light ? 'text-white' : 'text-ink'}`}>{title}</H>
      {subtitle && <p className={`mt-4 text-[17px] leading-relaxed ${light ? 'text-white/70' : 'text-stone'}`}>{subtitle}</p>}
    </div>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-site px-4 sm:px-6 ${className}`}>{children}</div>
}
