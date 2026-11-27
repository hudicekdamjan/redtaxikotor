/**
 * PRICES — taken verbatim from the current redtaxikotor.com website (EUR).
 * Edit here; every page (Home, Airport Transfers, Price List) reads from this file.
 * `price: null` = not published on the current website → shown as "on request".
 */
export interface PriceRow {
  from: string
  to: string
  price: number | null
  /** optional seasonal price */
  seasonal?: { price: number; label: 'julyAugust' }
  /** popular route shown on the home page */
  featured?: boolean
}

const TIVAT_AIRPORT = 'Tivat Airport'

export const AIRPORT_TRANSFERS: PriceRow[] = [
  { from: TIVAT_AIRPORT, to: 'Kotor Old Town', price: 30, featured: true },
  { from: TIVAT_AIRPORT, to: 'Kotor – Muo', price: 30 },
  { from: TIVAT_AIRPORT, to: 'Kotor – Prčanj', price: 35 },
  { from: TIVAT_AIRPORT, to: 'Kotor – Dobrota', price: 35, featured: true },
  { from: TIVAT_AIRPORT, to: 'Perast', price: 45, featured: true },
  { from: TIVAT_AIRPORT, to: 'Luštica Bay', price: 30 },
  { from: TIVAT_AIRPORT, to: 'Budva', price: 45, featured: true },
  { from: TIVAT_AIRPORT, to: 'Bečići', price: 50 },
  { from: TIVAT_AIRPORT, to: 'Sveti Stefan', price: 55 },
  { from: TIVAT_AIRPORT, to: 'Petrovac', price: 65 },
  { from: TIVAT_AIRPORT, to: 'Bar', price: 100 },
  { from: TIVAT_AIRPORT, to: 'Podgorica', price: 110, featured: true },
  { from: TIVAT_AIRPORT, to: 'Herceg Novi', price: 70 },
  { from: TIVAT_AIRPORT, to: 'Igalo', price: 80 },
]

export const INTERCITY_TRANSFERS: PriceRow[] = [
  { from: 'Kotor', to: 'Podgorica Airport', price: 100 },
  { from: 'Kotor', to: 'Dubrovnik Airport (Čilipi), Croatia', price: 130 },
  { from: 'Dubrovnik Airport (Čilipi), Croatia', to: 'Kotor', price: 140 },
  { from: 'Kotor', to: 'Dubrovnik, Croatia', price: 150 },
  { from: TIVAT_AIRPORT, to: 'Dubrovnik, Croatia', price: 150 },
  { from: 'Kotor cable car (Žičara)', to: 'Kotor Old Town (harbour)', price: 15, seasonal: { price: 20, label: 'julyAugust' } },
]

/** Display names for place names in Montenegrin (proper nouns otherwise unchanged). */
export const PLACE_ME: Record<string, string> = {
  'Tivat Airport': 'Aerodrom Tivat',
  'Kotor Old Town': 'Kotor – Stari grad',
  'Podgorica Airport': 'Aerodrom Podgorica',
  'Dubrovnik Airport (Čilipi), Croatia': 'Aerodrom Dubrovnik (Čilipi), Hrvatska',
  'Dubrovnik, Croatia': 'Dubrovnik, Hrvatska',
  'Kotor cable car (Žičara)': 'Kotor – Žičara',
  'Kotor Old Town (harbour)': 'Stari grad (luka)',
}
