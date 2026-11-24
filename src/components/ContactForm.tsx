import { useState, type FormEvent } from 'react'
import { CheckCircle2, Lock, Mail } from 'lucide-react'
import { EMAIL, MUNICIPALITIES, whatsappLink, type MunicipalityId } from '../config/contacts'
import { useLang } from '../context/LangContext'
import { useMunicipality } from '../context/MunicipalityContext'
import { WhatsAppIcon } from './BrandIcons'
import { PHONE_RE } from './BookingForm'
import Field, { inputCls } from './Field'
import MunicipalityPicker from './MunicipalityPicker'

type Values = { name: string; phone: string; email: string; message: string }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Contact form: sends via WhatsApp (to the chosen municipality) or opens the visitor's email app. No backend. */
export default function ContactForm() {
  const { t } = useLang()
  const { selected, select } = useMunicipality()
  const [muni, setMuni] = useState<MunicipalityId | null>(null)
  const [v, setV] = useState<Values>({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Values | 'muni', string>>>({})
  const [sent, setSent] = useState<'wa' | 'mail' | null>(null)
  const eff = muni ?? selected
  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }))

  function validate(channel: 'wa' | 'mail') {
    const e: typeof errors = {}
    if (channel === 'wa' && !eff) e.muni = t.form.errors.municipality
    if (!v.name.trim()) e.name = t.form.errors.required
    if (!v.message.trim()) e.message = t.form.errors.required
    if (v.phone && !PHONE_RE.test(v.phone.trim())) e.phone = t.form.errors.phone
    if (v.email && !EMAIL_RE.test(v.email.trim())) e.email = t.form.errors.email
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const body = () => {
    const L = t.form.msg
    return [`*${L.contactTitle}*`, eff ? `${L.location}: ${t.common[eff]}` : null, `${L.name}: ${v.name}`, v.phone ? `${L.phone}: ${v.phone}` : null, v.email ? `${L.email}: ${v.email}` : null, '', `${L.message}:`, v.message].filter((x): x is string => x !== null).join('\n')
  }
  function send(channel: 'wa' | 'mail', ev?: FormEvent) {
    ev?.preventDefault()
    setSent(null)
    if (!validate(channel)) return
    if (channel === 'wa' && eff) {
      select(eff)
      const url = whatsappLink(MUNICIPALITIES[eff], body())
      if (!window.open(url, '_blank', 'noopener')) window.location.href = url
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.form.msg.contactTitle)}&body=${encodeURIComponent(body().replace(/\*/g, ''))}`
    }
    setSent(channel)
  }

  return (
    <form noValidate onSubmit={(e) => send('wa', e)} className="space-y-5">
      <MunicipalityPicker name="ct-muni" value={eff} onChange={(id) => { setMuni(id); setErrors((e) => ({ ...e, muni: undefined })) }} error={errors.muni} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.form.name} htmlFor="ct-name" required error={errors.name} className="sm:col-span-2">
          <input id="ct-name" className={inputCls} placeholder={t.form.namePh} value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name || undefined} />
        </Field>
        <Field label={t.form.phone} htmlFor="ct-phone" optionalLabel={t.common.optional} error={errors.phone}>
          <input id="ct-phone" type="tel" className={inputCls} placeholder={t.form.phonePh} value={v.phone} onChange={set('phone')} autoComplete="tel" />
        </Field>
        <Field label={t.form.email} htmlFor="ct-email" optionalLabel={t.common.optional} error={errors.email}>
          <input id="ct-email" type="email" className={inputCls} placeholder={t.form.emailPh} value={v.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <Field label={t.form.message} htmlFor="ct-message" required error={errors.message} className="sm:col-span-2">
          <textarea id="ct-message" rows={5} className={`${inputCls} h-auto py-3`} placeholder={t.form.messagePh} value={v.message} onChange={set('message')} aria-invalid={!!errors.message || undefined} />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="submit" className="flex h-14 items-center justify-center gap-2.5 rounded-xl bg-whatsapp text-[15px] font-bold text-white transition hover:brightness-110"><WhatsAppIcon className="h-5 w-5" />{t.form.submitWhatsApp}</button>
        <button type="button" onClick={() => send('mail')} className="flex h-14 items-center justify-center gap-2.5 rounded-xl bg-white text-[15px] font-bold text-ink transition hover:bg-mist"><Mail className="h-5 w-5" aria-hidden="true" />{t.form.submitEmail}</button>
      </div>
      {sent && <p role="status" className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-sm text-white"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" aria-hidden="true" />{sent === 'wa' ? t.form.success : t.form.successEmail}</p>}
      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/40"><Lock className="h-3 w-3" aria-hidden="true" />{t.form.privacy}</p>
    </form>
  )
}
