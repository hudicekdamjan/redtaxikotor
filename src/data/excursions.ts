/**
 * EXCURSIONS — official Red Taxi price list (EUR), November 2026.
 * Price per vehicle, round trip from Kotor, with 2 hours of waiting at the destination included.
 */
export interface Stop { en: string; me: string }
export interface Excursion {
  slug: string
  price: number
  /** waiting time at the destination included in the price */
  waitHours: number
  /** price for every additional hour of waiting (when published) */
  extraHour?: number
  image: string
  /** route stops (viewpoints are translated) */
  stops: Stop[]
}

const s = (name: string): Stop => ({ en: name, me: name })
const view = (name: string): Stop => ({ en: `${name} viewpoint`, me: `Vidikovac ${name}` })
const KOTOR = s('Kotor')

export const EXCURSIONS: Excursion[] = [
  { slug: 'kotor-perast-panorama', price: 100, waitHours: 2, image: 'perast', stops: [KOTOR, view('Trojica'), s('Perast'), KOTOR] },
  { slug: 'kotor-sveti-stefan', price: 150, waitHours: 2, image: 'sveti-stefan', stops: [KOTOR, view('Jaz'), view('Budva'), s('Sveti Stefan'), KOTOR] },
  { slug: 'kotor-lovcen', price: 150, waitHours: 2, image: 'lovcen', stops: [KOTOR, view('Krstac'), { en: 'Lovćen National Park or Njegoš Mausoleum', me: 'NP Lovćen ili Njegošev mauzolej' }, KOTOR] },
  { slug: 'kotor-njegusi-cetinje', price: 160, waitHours: 2, image: 'cetinje', stops: [KOTOR, { en: 'Serpentine viewpoint', me: 'Vidikovac na serpentinama' }, s('Njeguši'), s('Cetinje'), KOTOR] },
  { slug: 'kotor-skadar-lake', price: 180, waitHours: 2, extraHour: 15, image: 'skadar', stops: [KOTOR, view('Jaz'), view('Sveti Stefan'), { en: 'Skadar Lake', me: 'Skadarsko jezero' }, KOTOR] },
  { slug: 'kotor-rijeka-crnojevica', price: 200, waitHours: 2, image: 'rijeka-crnojevica', stops: [KOTOR, view('Njeguši'), view('Pavlova strana'), s('Rijeka Crnojevića'), KOTOR] },
  { slug: 'kotor-zabljak', price: 300, waitHours: 2, image: 'zabljak', stops: [KOTOR, view('Lipci'), { en: 'Slano Lake viewpoint', me: 'Vidikovac Slano jezero' }, s('Žabljak'), KOTOR] },
]
