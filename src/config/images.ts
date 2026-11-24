import type { Lang } from './site'

/**
 * All photography in one place. Files live in /public/images as
 * `<file>-800.webp` and `<file>-1600.webp`.
 * To replace a photo: put the original in /photos/<file>.jpg and run `npm run images`.
 * Only REAL photographs are used. Entries marked `placeholder: true` show a labelled
 * placeholder until the original Red Taxi photo is supplied.
 */
export interface ImageDef { file: string; alt: Record<Lang, string>; credit?: string; placeholder?: boolean; w: number; h: number }

const P = { w: 1600, h: 900, placeholder: true } as const

export const IMAGES = {
  car: { file: 'red-taxi-corolla', w: 654, h: 314, alt: { en: 'White Toyota Corolla Red Taxi with RED TAXI 19719 on the rear door, beside the Bay of Kotor', me: 'Bijela Toyota Corolla Red Taxi sa natpisom RED TAXI 19719 na zadnjim vratima, pored Bokokotorskog zaliva' } },
  heroBay: { file: 'kotor-bay', w: 1920, h: 864, credit: 'Bay of Kotor — Jaakko Luttinen, CC BY-SA 4.0, Wikimedia Commons', alt: { en: 'Bay of Kotor and Kotor Old Town seen from the road above Kotor', me: 'Bokokotorski zaliv i Stari grad Kotor sa puta iznad Kotora' } },
  tivatAirport: { file: 'tivat-airport', ...P, alt: { en: 'Tivat Airport', me: 'Aerodrom Tivat' } },
  tivat: { file: 'tivat', ...P, alt: { en: 'Tivat and Porto Montenegro', me: 'Tivat i Porto Montenegro' } },
  interior: { file: 'interior', ...P, alt: { en: 'Interior of a Red Taxi Toyota Corolla', me: 'Enterijer Red Taxi vozila Toyota Corolla' } },
  perast: { file: 'perast', ...P, alt: { en: 'Perast and Our Lady of the Rocks', me: 'Perast i Gospa od Škrpjela' } },
  perastPanorama: { file: 'perast-panorama', ...P, alt: { en: 'Panorama of Perast on the Bay of Kotor', me: 'Panorama Perasta u Bokokotorskom zalivu' } },
  svetiStefan: { file: 'sveti-stefan', ...P, alt: { en: 'Sveti Stefan islet on the Budva Riviera', me: 'Ostrvo Sveti Stefan na Budvanskoj rivijeri' } },
  njegusiCetinje: { file: 'njegusi-cetinje', ...P, alt: { en: 'Njeguši and Cetinje', me: 'Njeguši i Cetinje' } },
  skadar: { file: 'skadar', ...P, alt: { en: 'Skadar Lake National Park', me: 'Nacionalni park Skadarsko jezero' } },
  budva: { file: 'budva', ...P, alt: { en: 'Budva Old Town', me: 'Stari grad Budva' } },
  dobrota: { file: 'dobrota', ...P, alt: { en: 'Dobrota on the Bay of Kotor', me: 'Dobrota u Bokokotorskom zalivu' } },
} satisfies Record<string, ImageDef>

export type ImageKey = keyof typeof IMAGES

/** Image used for each excursion (see data/excursions.ts) */
export const EXCURSION_IMAGE: Record<string, ImageKey> = {
  perast: 'perastPanorama',
  lovcen: 'heroBay',
  'sveti-stefan': 'svetiStefan',
  skadar: 'skadar',
  cetinje: 'njegusiCetinje',
  budva: 'budva',
}
