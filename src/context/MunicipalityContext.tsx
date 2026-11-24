import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { MunicipalityId } from '../config/contacts'

/**
 * The municipality the visitor says they are CURRENTLY in.
 * Never guessed: stays null until the visitor picks one.
 */
interface Ctx { selected: MunicipalityId | null; select: (id: MunicipalityId | null) => void }
const MunicipalityContext = createContext<Ctx>({ selected: null, select: () => {} })
const KEY = 'redtaxi.municipality'

export function MunicipalityProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<MunicipalityId | null>(null)
  useEffect(() => {
    try {
      const v = sessionStorage.getItem(KEY)
      if (v === 'kotor' || v === 'tivat') setSelected(v)
    } catch { /* ignore */ }
  }, [])
  const select = useCallback((id: MunicipalityId | null) => {
    setSelected(id)
    try { if (id) sessionStorage.setItem(KEY, id); else sessionStorage.removeItem(KEY) } catch { /* ignore */ }
  }, [])
  return <MunicipalityContext.Provider value={{ selected, select }}>{children}</MunicipalityContext.Provider>
}

export const useMunicipality = () => useContext(MunicipalityContext)
