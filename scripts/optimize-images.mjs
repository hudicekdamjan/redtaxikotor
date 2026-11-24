// Converts original photos in /photos (jpg/png/webp/tiff) into responsive WebP
// files used by the site: public/images/<name>-800.webp and <name>-1600.webp.
// Usage: put e.g. photos/perast.jpg in place, then run `npm run images`.
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'photos', OUT = 'public/images'
await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))
if (!files.length) console.log('No photos found in /photos')
for (const f of files) {
  const name = path.parse(f).name
  for (const w of [800, 1600]) {
    await sharp(path.join(SRC, f)).rotate().resize({ width: w, withoutEnlargement: false }).webp({ quality: 80 }).toFile(path.join(OUT, `${name}-${w}.webp`))
  }
  console.log('✓', name)
}
