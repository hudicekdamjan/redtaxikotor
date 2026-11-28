/**
 * PRICES — official Red Taxi price list (EUR), November 2026.
 * Edit here; every page (Home, Airport Transfers, Price List) reads from this file.
 * `price: null` = shown as "on request".
 */
export interface PriceRow {
  from: string
  to: string
  /** price in season (or all year when `offSeason` is not set) */
  price: number | null
  /** price out of season (1 Nov – 31 Mar), when different */
  offSeason?: number
  /** short note shown under the price, key of t.prices.notes */
  note?: 'perVehicle'
  /** popular route shown on the home page */
  featured?: boolean
}

/** Season: 1 April – 31 October. Out of season: 1 November – 31 March. */
export const SEASON = { startMonth: 4, endMonth: 10 }

const TIVAT_AIRPORT = 'Tivat Airport'

/** From Tivat Airport (same price all year) */
export const AIRPORT_TRANSFERS: PriceRow[] = [
  { from: TIVAT_AIRPORT, to: 'Kotor Old Town', price: 35, featured: true },
  { from: TIVAT_AIRPORT, to: 'Kotor – Muo', price: 35 },
  { from: TIVAT_AIRPORT, to: 'Kotor – Prčanj', price: 40 },
  { from: TIVAT_AIRPORT, to: 'Kotor – Dobrota', price: 40, featured: true },
  { from: TIVAT_AIRPORT, to: 'Sveti Stasije', price: 45 },
  { from: TIVAT_AIRPORT, to: 'Orahovac', price: 45 },
  { from: TIVAT_AIRPORT, to: 'Ljuta', price: 45 },
  { from: TIVAT_AIRPORT, to: 'Perast', price: 50, featured: true },
  { from: TIVAT_AIRPORT, to: 'Luštica Bay', price: 35 },
  { from: TIVAT_AIRPORT, to: 'Budva', price: 50, featured: true },
  { from: TIVAT_AIRPORT, to: 'Bečići', price: 55 },
  { from: TIVAT_AIRPORT, to: 'Sveti Stefan', price: 65 },
  { from: TIVAT_AIRPORT, to: 'Petrovac', price: 70 },
  { from: TIVAT_AIRPORT, to: 'Podgorica', price: 120, featured: true },
  { from: TIVAT_AIRPORT, to: 'Herceg Novi', price: 70 },
  { from: TIVAT_AIRPORT, to: 'Igalo', price: 80 },
  { from: TIVAT_AIRPORT, to: 'Žabljak', price: 220 },
]

/** To Tivat Airport — seasonal prices */
export const TO_AIRPORT: PriceRow[] = [
  { from: 'Kotor Old Town', to: TIVAT_AIRPORT, price: 30, offSeason: 25 },
  { from: 'Kotor – Muo', to: TIVAT_AIRPORT, price: 30, offSeason: 25 },
  { from: 'Kotor – Prčanj', to: TIVAT_AIRPORT, price: 35, offSeason: 30 },
  { from: 'Kotor – Dobrota', to: TIVAT_AIRPORT, price: 35, offSeason: 30 },
  { from: 'Sveti Stasije', to: TIVAT_AIRPORT, price: 40, offSeason: 35 },
  { from: 'Ljuta', to: TIVAT_AIRPORT, price: 40 },
  { from: 'Orahovac', to: TIVAT_AIRPORT, price: 40 },
  { from: 'Perast', to: TIVAT_AIRPORT, price: 50, offSeason: 45 },
  { from: 'Luštica Bay', to: TIVAT_AIRPORT, price: 30 },
]

/**
 * Return trips Tivat Airport → place → Tivat Airport, booked together.
 * Total = (airport → place) + (place → airport).
 * Only possible within Kotor and Tivat municipalities.
 */
export const RETURN_TRIPS: PriceRow[] = TO_AIRPORT.map((back) => {
  const there = AIRPORT_TRANSFERS.find((r) => r.to === back.from)!.price!
  const season = there + back.price!
  const off = there + (back.offSeason ?? back.price!)
  return { from: TIVAT_AIRPORT, to: back.from, price: season, offSeason: off }
})

export const INTERCITY_TRANSFERS: PriceRow[] = [
  { from: 'Kotor', to: 'Podgorica Airport', price: 120 },
  { from: 'Kotor', to: 'Dubrovnik Airport (Čilipi), Croatia', price: 140 },
  { from: 'Dubrovnik Airport (Čilipi), Croatia', to: 'Kotor', price: 150 },
  { from: 'Kotor', to: 'Dubrovnik, Croatia', price: 160 },
  { from: TIVAT_AIRPORT, to: 'Dubrovnik, Croatia', price: 160 },
  { from: 'Old Town, Kotor port', to: 'Žičara (Cable car)', price: 20, note: 'perVehicle' },
  { from: 'Žičara (Cable car)', to: 'Old Town, Kotor port', price: 20, note: 'perVehicle' },
]

/** Display names for place names in Montenegrin (proper nouns otherwise unchanged). */
export const PLACE_ME: Record<string, string> = {
  'Tivat Airport': 'Aerodrom Tivat',
  'Kotor Old Town': 'Kotor – Stari grad',
  'Podgorica Airport': 'Aerodrom Podgorica',
  'Dubrovnik Airport (Čilipi), Croatia': 'Aerodrom Dubrovnik (Čilipi), Hrvatska',
  'Dubrovnik, Croatia': 'Dubrovnik, Hrvatska',
  'Žičara (Cable car)': 'Žičara',
  'Old Town, Kotor port': 'Stari grad, luka Kotor',
}
