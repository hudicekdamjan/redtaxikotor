import { useState, type FormEvent } from 'react'
import { CheckCircle2, Lock } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { MUNICIPALITIES, whatsappLink, type MunicipalityId } from '../config/contacts'
import { fmt, useLang } from '../context/LangContext'
import { useMunicipality } from '../context/MunicipalityContext'
import Field, { inputCls } from './Field'
import MunicipalityPicker from './MunicipalityPicker'

type Values = { pickup: string; destination: string; date: string; time: string; passengers: string; flight: string; name: string; phone: string; notes: string }
const empty: Values = { pickup: '', destination: '', date: '', time: '', passengers: '1', flight: '', name: '', phone: '', notes: '' }
const today = () => new Date().toISOString().slice(0, 10)
export const PHONE_RE = /^\+?[\d\s()./-]{6,20}$/

/**
 * Transfer / excursion booking. Builds a formatted message and opens WhatsApp
 * with the dispatch of the municipality the customer is CURRENTLY in.
 * No backend required — nothing is stored on the website.
 */
export default function BookingForm({ defaults, excursionName, idPrefix = 'bk' }: { defaults?: Partial<Values>; excursionName?: string; idPrefix?: string }) {
  const { t } = useLang()
  const { selected, select } = useMunicipality()
  const [muni, setMuni] = useState<MunicipalityId | null>(selected)
  const [v, setV] = useState<Values>({ ...empty, ...defaults })
  const [errors, setErrors] = useState<Partial<Record<keyof Values | 'muni', string>>>({})
  const [sent, setSent] = useState(false)
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }))
  const effectiveMuni = muni ?? selected

  function validate() {
    const e: typeof errors = {}
    if (!effectiveMuni) e.muni = t.form.errors.municipality
    ;(['pickup', 'destination', 'date', 'time', 'name', 'phone'] as const).forEach((k) => { if (!v[k].trim()) e[k] = t.form.errors.required })
    if (v.phone && !PHONE_RE.test(v.phone.trim())) e.phone = t.form.errors.phone
    if (v.date && v.date < today()) e.date = t.form.errors.datePast
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit(ev: FormEvent) {
    ev.preventDefault()
    setSent(false)
    if (!validate() || !effectiveMuni) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${idPrefix}-form [role="alert"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
      return
    }
    const m = MUNICIPALITIES[effectiveMuni]
    const L = t.form.msg
    const lines = [
      `*${L.bookingTitle}*`,
      excursionName ? `${L.excursion}: ${excursionName}` : null,
      `${L.location}: ${t.common[effectiveMuni]} (${m.hotline})`,
      '',
      `${L.pickup}: ${v.pickup}`,
      `${L.destination}: ${v.destination}`,
      `${L.date}: ${v.date.split('-').reverse().join('.')}`,
      `${L.time}: ${v.time}`,
      `${L.passengers}: ${v.passengers}`,
      v.flight ? `${L.flight}: ${v.flight}` : null,
      '',
      `${L.name}: ${v.name}`,
      `${L.phone}: ${v.phone}`,
      v.notes ? `${L.notes}: ${v.notes}` : null,
    ].filter((l): l is string => l !== null)
    const text = lines.join('\n')
    select(effectiveMuni)
    const url = whatsappLink(m, text)
    const w = window.open(url, '_blank', 'noopener')
    if (!w) window.location.href = url
    setSent(true)
  }

  const err = (k: keyof Values) => errors[k]
  const aria = (k: keyof Values) => ({ 'aria-invalid': !!err(k) || undefined, 'aria-describedby': err(k) ? `${idPrefix}-${k}-err` : undefined })

  return (
    <form id={`${idPrefix}-form`} noValidate onSubmit={submit} className="space-y-5">
      <MunicipalityPicker name={`${idPrefix}-muni`} value={effectiveMuni} onChange={(id) => { setMuni(id); setErrors((e) => ({ ...e, muni: undefined })) }} error={errors.muni} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.form.pickup} htmlFor={`${idPrefix}-pickup`} required error={err('pickup')}>
          <input id={`${idPrefix}-pickup`} className={inputCls} placeholder={t.form.pickupPh} value={v.pickup} onChange={set('pickup')} autoComplete="off" {...aria('pickup')} />
        </Field>
        <Field label={t.form.destination} htmlFor={`${idPrefix}-destination`} required error={err('destination')}>
          <input id={`${idPrefix}-destination`} className={inputCls} placeholder={t.form.destinationPh} value={v.destination} onChange={set('destination')} autoComplete="off" {...aria('destination')} />
        </Field>
        <Field label={t.form.date} htmlFor={`${idPrefix}-date`} required error={err('date')}>
          <input id={`${idPrefix}-date`} type="date" min={today()} className={inputCls} value={v.date} onChange={set('date')} {...aria('date')} />
        </Field>
        <Field label={t.form.time} htmlFor={`${idPrefix}-time`} required error={err('time')}>
          <input id={`${idPrefix}-time`} type="time" className={inputCls} value={v.time} onChange={set('time')} {...aria('time')} />
        </Field>
        <Field label={t.form.passengers} htmlFor={`${idPrefix}-passengers`} required>
          <select id={`${idPrefix}-passengers`} className={inputCls} value={v.passengers} onChange={set('passengers')}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '8+'].map((n) => <option key={n} value={n} className="text-ink">{n}</option>)}
          </select>
        </Field>
        <Field label={t.form.flight} htmlFor={`${idPrefix}-flight`} optionalLabel={t.common.optional}>
          <input id={`${idPrefix}-flight`} className={inputCls} placeholder={t.form.flightPh} value={v.flight} onChange={set('flight')} autoComplete="off" />
        </Field>
        <Field label={t.form.name} htmlFor={`${idPrefix}-name`} required error={err('name')}>
          <input id={`${idPrefix}-name`} className={inputCls} placeholder={t.form.namePh} value={v.name} onChange={set('name')} autoComplete="name" {...aria('name')} />
        </Field>
        <Field label={t.form.phone} htmlFor={`${idPrefix}-phone`} required error={err('phone')}>
          <input id={`${idPrefix}-phone`} type="tel" inputMode="tel" className={inputCls} placeholder={t.form.phonePh} value={v.phone} onChange={set('phone')} autoComplete="tel" {...aria('phone')} />
        </Field>
        <Field label={t.form.notes} htmlFor={`${idPrefix}-notes`} optionalLabel={t.common.optional} className="sm:col-span-2">
          <textarea id={`${idPrefix}-notes`} rows={3} className={`${inputCls} h-auto py-3`} placeholder={t.form.notesPh} value={v.notes} onChange={set('notes')} />
        </Field>
      </div>
      <button type="submit" className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-red text-[15px] font-bold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(215,25,32,.9)] transition hover:bg-red-dark">
        <WhatsAppIcon className="h-5 w-5" />{t.form.submitWhatsApp}
      </button>
      {effectiveMuni && <p className="text-center text-xs text-white/55">{fmt(t.form.sendTo, { m: t.common[effectiveMuni], n: MUNICIPALITIES[effectiveMuni].mobileDisplay })}</p>}
      {sent && <p role="status" className="flex items-start gap-2 rounded-xl bg-whatsapp/15 p-3 text-sm text-white"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" aria-hidden="true" />{t.form.success}</p>}
      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/40"><Lock className="h-3 w-3" aria-hidden="true" />{t.form.privacy}</p>
    </form>
  )
}
