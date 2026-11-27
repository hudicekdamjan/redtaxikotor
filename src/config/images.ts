import type { Lang } from './site'

/**
 * All photography in one place. Files live in /public/images as
 * `<file>-800.webp` and `<file>-1600.webp`.
 * To replace a photo: put the original in /photos/<file>.jpg and run `npm run images`.
 * Only REAL photographs are used. Entries marked `placeholder: true` show a labelled
 * placeholder until the original Red Taxi photo is supplied.
 */
/** Photographer of the website photos — shown in the footer with a link to Instagram. */
export const PHOTOGRAPHER = {
  name: 'Ranko Maraš',
  /** Instagram username without @ (leave empty to show the name only) */
  instagram: 'radza',
}

export interface ImageDef { file: string; alt: Record<Lang, string>; credit?: string; placeholder?: boolean; w: number; h: number; /** CSS object-position: which part stays visible when cropped */ focus?: string }

const P = { w: 1600, h: 900, placeholder: true } as const

export const IMAGES = {
  car: { file: 'red-taxi-corolla', w: 654, h: 314, alt: { en: 'White Toyota Corolla Red Taxi with RED TAXI 19719 on the rear door, beside the Bay of Kotor', me: 'Bijela Toyota Corolla Red Taxi sa natpisom RED TAXI 19719 na zadnjim vratima, pored Bokokotorskog zaliva' } },
  // Photos by Ranko Maraš (credited in the footer with a link to his Instagram)
  heroBay: { file: 'kotor-bay', w: 1440, h: 1800, alt: { en: 'Bay of Kotor and Kotor Old Town at dusk, seen from the fortress', me: 'Bokokotorski zaliv i Stari grad Kotor u sumrak, pogled sa tvrđave' } },
  kotor: { file: 'kotor', w: 1200, h: 1500, alt: { en: 'Kotor Old Town and the bay seen from the Church of Our Lady of Remedy', me: 'Stari grad Kotor i zaliv sa crkve Gospe od Zdravlja' } },
  kotorNight: { file: 'kotor-night', w: 1188, h: 1500, alt: { en: 'Kotor Old Town at night and the serpentine path above it', me: 'Stari grad Kotor noću i serpentine iznad njega' } },
  dobrota: { file: 'kotor-bay', w: 1440, h: 1800, alt: { en: 'Bay of Kotor with Dobrota along the shore at dusk', me: 'Bokokotorski zaliv i obala Dobrote u sumrak' } },
  tivatAirport: { file: 'tivat-airport', w: 1920, h: 1078, credit: 'Tivat Airport — Calistemon, CC BY-SA 4.0', alt: { en: 'Tivat Airport runway on Tivat Bay', me: 'Pista aerodroma Tivat uz Tivatski zaliv' } },
  tivat: { file: 'tivat', ...P, alt: { en: 'Tivat and Porto Montenegro', me: 'Tivat i Porto Montenegro' } },
  interior: { file: 'interior', ...P, alt: { en: 'Interior of a Red Taxi Toyota Corolla', me: 'Enterijer Red Taxi vozila Toyota Corolla' } },
  perast: { file: 'perast', w: 1440, h: 1440, alt: { en: 'Perast on the Bay of Kotor at night', me: 'Perast u Bokokotorskom zalivu noću' } },
  perastPanorama: { file: 'perast-panorama', w: 1440, h: 1818, alt: { en: 'Perast waterfront at dusk', me: 'Obala Perasta u sumrak' } },
  svetiStefan: { file: 'sveti-stefan', w: 1008, h: 581, alt: { en: 'Sveti Stefan islet on the Budva Riviera', me: 'Ostrvo Sveti Stefan na Budvanskoj rivijeri' } },
  njegusiCetinje: { file: 'njegusi-cetinje', w: 1920, h: 1440, alt: { en: 'Njeguši valley below Lovćen', me: 'Njeguško polje ispod Lovćena' } },
  skadar: { file: 'skadar', w: 1920, h: 952, credit: 'Skadar Lake — Diego Delso, CC BY-SA 3.0', alt: { en: 'Skadar Lake National Park', me: 'Nacionalni park Skadarsko jezero' } },
  budva: { file: 'budva', w: 1080, h: 729, alt: { en: 'Budva Old Town and marina at dusk', me: 'Stari grad Budva i marina u sumrak' } },
  gospa: { file: 'gospa-od-skrpjela', w: 1440, h: 1590, alt: { en: 'Our Lady of the Rocks and St. George islets in front of Perast', me: 'Ostrva Gospa od Škrpjela i Sveti Đorđe ispred Perasta' } },
} satisfies Record<string, ImageDef>

export type ImageKey = keyof typeof IMAGES

/** Image used for each excursion (see data/excursions.ts) */
export const EXCURSION_IMAGE: Record<string, ImageKey> = {
  perast: 'gospa',
  lovcen: 'kotorNight',
  'sveti-stefan': 'svetiStefan',
  skadar: 'skadar',
  cetinje: 'njegusiCetinje',
  budva: 'budva',
}
