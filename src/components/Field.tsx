import type { ReactNode } from 'react'

export const inputCls =
  'mt-1.5 block h-12 w-full rounded-xl border-0 bg-white/[.06] px-4 text-base text-white ring-1 ring-white/15 placeholder:text-white/35 transition focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red [color-scheme:dark]'

export default function Field({ label, htmlFor, required, optionalLabel, error, hint, children, className = '' }: { label: string; htmlFor: string; required?: boolean; optionalLabel?: string; error?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-white">
        {label} {required ? <span className="text-red">*</span> : optionalLabel && <span className="font-normal text-white/45">({optionalLabel})</span>}
      </label>
      {children}
      {hint && !error && <p id={`${htmlFor}-hint`} className="mt-1.5 text-xs leading-snug text-white/55">{hint}</p>}
      {error && <p id={`${htmlFor}-err`} role="alert" className="mt-1.5 text-xs font-medium text-[#FF8A8E]">{error}</p>}
    </div>
  )
}
