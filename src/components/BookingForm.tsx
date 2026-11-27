import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Lock, Mail, Send } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { BOOKING_EMAIL, FORM_ENDPOINT, INQUIRY_DELIVERY, MUNICIPALITIES, whatsappLink, type MunicipalityId } from '../config/contacts'
import { DICTS, fmt, useLang } from '../context/LangContext'
import { useMunicipality } from '../context/MunicipalityContext'
import Field, { inputCls } from './Field'
import MunicipalityPicker from './MunicipalityPicker'

type Values = { pickup: string; destination: string; date: string; time: string; passengers: string; luggage: string; flight: string; name: string; phone: string; email: string; notes: string }
const empty: Values = { pickup: '', destination: '', date: '', time: '', passengers: '1', luggage: '', flight: '', name: '', phone: '', email: '', notes: '' }
const today = () => new Date().toISOString().slice(0, 10)
export const PHONE_RE = /^\+?[\d\s()./-]{6,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** A human needs more than this to fill in the form; faster submissions are treated as bots. */
const MIN_FILL_MS = 4000
const fmtDate = (d: string) => d.split('-').reverse().join('.')

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'email' | 'whatsapp'

/**
 * Transfer / excursion booking.
 *  - Email: sent directly to Red Taxi via FormSubmit (INQUIRY_DELIVERY = 'direct'),
 *    or opened in the visitor's email app with the message ready ('mailapp').
 *  - WhatsApp: the same request to the dispatch of the municipality the customer is CURRENTLY in.
 * Bot protection for direct sending: hidden honeypot field + minimum fill time.
 */
export default function BookingForm({ defaults, excursionName, idPrefix = 'bk' }: { defaults?: Partial<Values>; excursionName?: string; idPrefix?: string }) {
  const { t } = useLang()
  const { selected, select } = useMunicipality()
  const [muni, setMuni] = useState<MunicipalityId | null>(selected)
  const [v, setV] = useState<Values>({ ...empty, ...defaults })
  const [errors, setErrors] = useState<Partial<Record<keyof Values | 'muni', string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [honey, setHoney] = useState('')
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }))
  const effectiveMuni = muni ?? selected

  function validate() {
    const e: typeof errors = {}
    if (!effectiveMuni) e.muni = t.form.errors.municipality
    ;(['pickup', 'destination', 'date', 'time', 'luggage', 'name', 'phone'] as const).forEach((k) => { if (!v[k].trim()) e[k] = t.form.errors.required })
    if (v.phone && !PHONE_RE.test(v.phone.trim())) e.phone = t.form.errors.phone
    if (v.date && v.date < today()) e.date = t.form.errors.datePast
    if (v.email && !EMAIL_RE.test(v.email.trim())) e.email = t.form.errors.email
    setErrors(e)
    const ok = Object.keys(e).length === 0
    if (!ok) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${idPrefix}-form [role="alert"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
    return ok
  }

  /** The request as plain text lines, in the visitor's language. */
  function message(m: MunicipalityId) {
    const L = t.form.msg
    return [
      excursionName ? `${L.excursion}: ${excursionName}` : null,
      `${L.location}: ${t.common[m]} (${MUNICIPALITIES[m].hotline})`,
      '',
      `${L.pickup}: ${v.pickup}`,
      `${L.destination}: ${v.destination}`,
      `${L.date}: ${fmtDate(v.date)}`,
      `${L.time}: ${v.time}`,
      `${L.passengers}: ${v.passengers}`,
      `${L.luggage}: ${v.luggage}`,
      v.flight ? `${L.flight}: ${v.flight}` : null,
      '',
      `${L.name}: ${v.name}`,
      `${L.phone}: ${v.phone}`,
      v.email ? `${L.email}: ${v.email}` : null,
      v.notes ? `${L.notes}: ${v.notes}` : null,
    ].filter((l): l is string => l !== null).join('\n')
  }

  /** Sends the inquiry straight to Red Taxi's inbox. Labels are always Montenegrin for the dispatch team. */
  async function sendDirect(ev: FormEvent) {
    ev.preventDefault()
    if (status === 'sending' || !validate() || !effectiveMuni) return
    // Bots: filled the hidden field or submitted inhumanly fast → pretend success, send nothing.
    if (honey || Date.now() - startedAt < MIN_FILL_MS) { setStatus('sent'); return }
    const m = MUNICIPALITIES[effectiveMuni]
    const L = DICTS.me.form.msg
    const payload: Record<string, string> = {
      _subject: fmt(L.emailSubject, { from: v.pickup, to: v.destination, date: fmtDate(v.date), time: v.time }),
      _template: 'table',
      _captcha: 'false',
      ...(excursionName ? { [L.excursion]: excursionName } : {}),
      [L.location]: `${DICTS.me.common[effectiveMuni]} (${m.hotline})`,
      [L.pickup]: v.pickup,
      [L.destination]: v.destination,
      [L.date]: fmtDate(v.date),
      [L.time]: v.time,
      [L.passengers]: v.passengers,
      [L.luggage]: v.luggage,
      ...(v.flight ? { [L.flight]: v.flight } : {}),
      [L.name]: v.name,
      [L.phone]: v.phone,
      ...(v.email ? { [L.email]: v.email, _replyto: v.email } : {}),
      ...(v.notes ? { [L.notes]: v.notes } : {}),
      [L.language]: t === DICTS.me ? 'Crnogorski' : 'Engleski (English)',
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean }
      if (!res.ok || String(data.success) !== 'true') throw new Error('not sent')
      select(effectiveMuni)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  /** Opens the visitor's email app with the inquiry ready to send to Red Taxi. */
  function sendEmail(ev?: FormEvent) {
    ev?.preventDefault()
    if (!validate() || !effectiveMuni) return
    const subject = fmt(t.form.msg.emailSubject, { from: v.pickup, to: v.destination, date: fmtDate(v.date), time: v.time })
    select(effectiveMuni)
    window.open(`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message(effectiveMuni))}`, '_self')
    setStatus('email')
  }

  /** Opens WhatsApp with the same request, to the dispatch of the municipality the customer is in. */
  function sendWhatsApp() {
    if (!validate() || !effectiveMuni) return
    const text = `*${t.form.msg.bookingTitle}*\n${message(effectiveMuni)}`
    select(effectiveMuni)
    const url = whatsappLink(MUNICIPALITIES[effectiveMuni], text)
    if (!window.open(url, '_blank', 'noopener')) window.location.href = url
    setStatus('whatsapp')
  }

  const err = (k: keyof Values) => errors[k]
  const aria = (k: keyof Values) => ({ 'aria-invalid': !!err(k) || undefined, 'aria-describedby': err(k) ? `${idPrefix}-${k}-err` : undefined })

  if (status === 'sent') {
    return (
      <div id={`${idPrefix}-form`} role="status" className="flex flex-col items-center rounded-2xl bg-white/5 px-6 py-12 text-center ring-1 ring-white/10">
        <CheckCircle2 className="h-14 w-14 text-whatsapp" aria-hidden="true" />
        <p className="mt-5 font-display text-2xl font-extrabold text-white">{t.form.sentTitle}</p>
        <p className="mt-2 max-w-md text-white/70">{t.form.sentText}</p>
        <button type="button" onClick={() => { setV({ ...empty, ...defaults }); setStatus('idle'); setStartedAt(Date.now()) }} className="mt-8 inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/10">{t.form.newInquiry}</button>
      </div>
    )
  }

  const direct = INQUIRY_DELIVERY === 'direct'
  return (
    <form id={`${idPrefix}-form`} noValidate onSubmit={direct ? sendDirect : sendEmail} className="space-y-5">
      {/* Honeypot: invisible to people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="_honey" type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
      </div>
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
        <Field label={t.form.passengers} htmlFor={`${idPrefix}-passengers`} required hint={t.form.passengersHint}>
          <select id={`${idPrefix}-passengers`} className={inputCls} value={v.passengers} onChange={set('passengers')} aria-describedby={`${idPrefix}-passengers-hint`}>
            {['1', '2', '3', '4'].map((n) => <option key={n} value={n} className="bg-ink text-white">{n}</option>)}
          </select>
        </Field>
        <Field label={t.form.luggage} htmlFor={`${idPrefix}-luggage`} required error={err('luggage')} hint={t.form.luggageHint}>
          <select id={`${idPrefix}-luggage`} className={inputCls} value={v.luggage} onChange={set('luggage')} {...aria('luggage')}>
            <option value="" disabled className="bg-ink text-white">{t.form.luggagePh}</option>
            {['0', '1', '2', '3', '4', '5', '6', '7', '8', '8+'].map((n) => <option key={n} value={n} className="bg-ink text-white">{n}</option>)}
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
        <Field label={t.form.email} htmlFor={`${idPrefix}-email`} optionalLabel={t.form.emailHint} error={err('email')} className="sm:col-span-2">
          <input id={`${idPrefix}-email`} type="email" inputMode="email" className={inputCls} placeholder={t.form.emailPh} value={v.email} onChange={set('email')} autoComplete="email" {...aria('email')} />
        </Field>
        <Field label={t.form.notes} htmlFor={`${idPrefix}-notes`} optionalLabel={t.common.optional} className="sm:col-span-2">
          <textarea id={`${idPrefix}-notes`} rows={3} className={`${inputCls} h-auto py-3`} placeholder={t.form.notesPh} value={v.notes} onChange={set('notes')} />
        </Field>
      </div>

      <button type="submit" disabled={status === 'sending'} className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-red text-[15px] font-bold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(215,25,32,.9)] transition hover:bg-red-dark disabled:cursor-wait disabled:opacity-70">
        {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : direct ? <Send className="h-5 w-5" aria-hidden="true" /> : <Mail className="h-5 w-5" aria-hidden="true" />}
        {status === 'sending' ? t.form.sending : direct ? t.form.submitInquiry : t.form.submitInquiryMailApp}
      </button>
      <p className="text-center text-xs text-white/55">{fmt(direct ? t.form.emailDirect : t.form.emailTo, { e: BOOKING_EMAIL })}</p>
      {status === 'error' && (
        <div role="alert" className="rounded-xl bg-red/15 p-4 text-sm text-white">
          <p className="flex items-start gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />{t.form.sendError}</p>
          <button type="button" onClick={() => sendEmail()} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist"><Mail className="h-4 w-4" aria-hidden="true" />{t.form.openMailApp}</button>
        </div>
      )}
      {status === 'email' && <p role="status" className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-sm text-white"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" aria-hidden="true" />{t.form.successEmail}</p>}

      <div className="flex items-center gap-3 text-xs text-white/45" aria-hidden="true"><span className="h-px flex-1 bg-white/10" />WhatsApp<span className="h-px flex-1 bg-white/10" /></div>
      <button type="button" onClick={sendWhatsApp} className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl text-sm font-semibold text-white ring-1 ring-whatsapp/60 transition hover:bg-whatsapp/15">
        <WhatsAppIcon className="h-5 w-5 text-whatsapp" />{t.form.whatsappInstead}
      </button>
      {effectiveMuni && <p className="text-center text-xs text-white/55">{fmt(t.form.sendTo, { m: t.common[effectiveMuni], n: MUNICIPALITIES[effectiveMuni].mobileDisplay })}</p>}
      {status === 'whatsapp' && <p role="status" className="flex items-start gap-2 rounded-xl bg-whatsapp/15 p-3 text-sm text-white"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" aria-hidden="true" />{t.form.success}</p>}

      <p className="flex items-start justify-center gap-1.5 text-center text-[11px] leading-relaxed text-white/40"><Lock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />{direct ? t.form.privacyDirect : t.form.privacy}</p>
    </form>
  )
}
