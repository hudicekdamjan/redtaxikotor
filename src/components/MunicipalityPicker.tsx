import { Check } from 'lucide-react'
import { MUNICIPALITIES, MUNICIPALITY_IDS, type MunicipalityId } from '../config/contacts'
import { useLang } from '../context/LangContext'

export default function MunicipalityPicker({ value, onChange, error, name }: { value: MunicipalityId | null; onChange: (id: MunicipalityId) => void; error?: string; name: string }) {
  const { t } = useLang()
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-white">{t.form.municipalityLabel} <span className="text-red">*</span></legend>
      <p className="mt-0.5 text-xs text-white/55">{t.form.municipalityHint}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {MUNICIPALITY_IDS.map((id) => {
          const on = value === id
          return (
            <label key={id} className={`relative flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 ring-1 transition ${on ? 'bg-red text-white ring-red' : 'bg-white/5 text-white ring-white/15 hover:ring-white/40'}`}>
              <input type="radio" name={name} value={id} checked={on} onChange={() => onChange(id)} className="sr-only" />
              <span>
                <span className="block text-sm font-bold uppercase tracking-wide">{t.common[id]}</span>
                <span className={`text-xs ${on ? 'text-white/85' : 'text-white/55'}`}>{MUNICIPALITIES[id].hotline}</span>
              </span>
              <span className={`flex h-5 w-5 items-center justify-center rounded-full ${on ? 'bg-white text-red' : 'ring-1 ring-white/30'}`}>{on && <Check className="h-3.5 w-3.5" aria-hidden="true" />}</span>
            </label>
          )
        })}
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-[#FF8A8E]">{error}</p>}
    </fieldset>
  )
}
