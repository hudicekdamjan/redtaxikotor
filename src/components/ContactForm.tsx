import { useState, type FormEvent } from 'react'
import { CheckCircle2, Info, Lock, Mail } from 'lucide-react'
import { EMAIL } from '../config/contacts'
import { useLang } from '../context/LangContext'
import { PHONE_RE } from './BookingForm'
import Field, { inputCls } from './Field'

type Values = { name: string; phone: string; message: string }

/**
 * Contact form: opens the visitor's own email app with the message ready for Red Taxi,
 * so replies reach their inbox (not spam). No backend; the busy phone line is not used for inquiries.
 */
export default function ContactForm() {
  const { t } = useLang()
  const [v, setV] = useState<Values>({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [sent, setSent] = useState(false)
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }))

  function send(ev: FormEvent) {
    ev.preventDefault()
    const e: typeof errors = {}
    if (!v.name.trim()) e.name = t.form.errors.required
    if (!v.message.trim()) e.message = t.form.errors.required
    if (v.phone && !PHONE_RE.test(v.phone.trim())) e.phone = t.form.errors.phone
    setErrors(e)
    if (Object.keys(e).length) return
    const L = t.form.msg
    const body = [`${L.name}: ${v.name}`, v.phone ? `${L.phone}: ${v.phone}` : null, '', v.message].filter((x): x is string => x !== null).join('\n')
    window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(`${L.contactTitle} — ${v.name}`)}&body=${encodeURIComponent(body)}`, '_self')
    setSent(true)
  }

  return (
    <form id="contact-form" noValidate onSubmit={send} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.form.name} htmlFor="ct-name" required error={errors.name}>
          <input id="ct-name" className={inputCls} placeholder={t.form.namePh} value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name || undefined} />
        </Field>
        <Field label={t.form.phone} htmlFor="ct-phone" optionalLabel={t.common.optional} error={errors.phone}>
          <input id="ct-phone" type="tel" className={inputCls} placeholder={t.form.phonePh} value={v.phone} onChange={set('phone')} autoComplete="tel" />
        </Field>
        <Field label={t.form.message} htmlFor="ct-message" required error={errors.message} className="sm:col-span-2">
          <textarea id="ct-message" rows={5} className={`${inputCls} h-auto py-3`} placeholder={t.form.messagePh} value={v.message} onChange={set('message')} aria-invalid={!!errors.message || undefined} />
        </Field>
      </div>
      <button type="submit" className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-red text-[15px] font-bold uppercase tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(215,25,32,.9)] transition hover:bg-red-dark">
        <Mail className="h-5 w-5" aria-hidden="true" />{t.form.submitEmail}
      </button>
      <p className="flex items-start gap-2.5 rounded-xl bg-white/5 p-3.5 text-xs leading-relaxed text-white/75 ring-1 ring-white/10"><Info className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />{t.form.whyMailApp}</p>
      {sent && <p role="status" className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-sm text-white"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" aria-hidden="true" />{t.form.successEmail}</p>}
      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/40"><Lock className="h-3 w-3" aria-hidden="true" />{t.form.privacy}</p>
    </form>
  )
}
