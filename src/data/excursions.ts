/**
 * EXCURSIONS — names and prices exactly as published on redtaxikotor.com (EUR).
 * Durations are NOT published, so `duration` is null ("on request") until confirmed.
 */
export interface Excursion {
  slug: string
  price: number
  duration: string | null
  image: string
  /** route stops (proper nouns, same in both languages) */
  stops: string[]
}

export const EXCURSIONS: Excursion[] = [
  { slug: 'kotor-perast-panorama', price: 80, duration: null, image: 'perast', stops: ['Kotor', 'Panorama', 'Perast', 'Kotor'] },
  { slug: 'kotor-lovcen', price: 90, duration: null, image: 'lovcen', stops: ['Kotor', 'Lovćen', 'Kotor'] },
  { slug: 'kotor-sveti-stefan', price: 100, duration: null, image: 'sveti-stefan', stops: ['Kotor', 'Sveti Stefan', 'Kotor'] },
  { slug: 'kotor-skadar-lake', price: 120, duration: null, image: 'skadar', stops: ['Kotor', 'Skadarsko jezero', 'Kotor'] },
  { slug: 'kotor-njegusi-cetinje', price: 140, duration: null, image: 'cetinje', stops: ['Kotor', 'Njeguši', 'Cetinje', 'Kotor'] },
  { slug: 'kotor-sveti-stefan-budva-perast', price: 150, duration: null, image: 'budva', stops: ['Kotor', 'Sveti Stefan', 'Budva', 'Perast', 'Kotor'] },
]
