// Post-build: renders every route in a headless browser and writes static HTML
// (dist/<route>/index.html) so search engines get full content + metadata
// without executing JS. Also generates sitemap.xml with hreflang alternates.
import { createRequire } from 'node:module'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

const require = createRequire(import.meta.url)
const SITE = 'https://www.redtaxikotor.com'
const DIST = path.resolve('dist')

// Keep in sync with src/config/routes.ts and src/data/excursions.ts
const SLUGS = {
  home: { en: '', me: '' }, taxi: { en: 'taxi-services', me: 'taxi-usluge' }, airport: { en: 'airport-transfers', me: 'aerodromski-transferi' },
  excursions: { en: 'excursions', me: 'izleti' }, prices: { en: 'price-list', me: 'cjenovnik' }, about: { en: 'about-us', me: 'o-nama' }, contact: { en: 'contact', me: 'kontakt' },
}
const TOURS = ['kotor-perast-panorama', 'kotor-lovcen', 'kotor-sveti-stefan', 'kotor-skadar-lake', 'kotor-njegusi-cetinje', 'kotor-rijeka-crnojevica', 'kotor-zabljak']
const p = (lang, key, sub) => (key === 'home' ? `/${lang}/` : `/${lang}/${SLUGS[key][lang]}${sub ? '/' + sub : ''}`)
const pages = [...Object.keys(SLUGS).map((k) => ({ en: p('en', k), me: p('me', k) })), ...TOURS.map((t) => ({ en: p('en', 'excursions', t), me: p('me', 'excursions', t) }))]

const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((pair) => ['en', 'me'].map((l) => `  <url>
    <loc>${SITE}${pair[l]}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${pair.en}"/>
    <xhtml:link rel="alternate" hreflang="sr-ME" href="${SITE}${pair.me}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pair.en}"/>
  </url>`)).join('\n')}
</urlset>
`
await writeFile(path.join(DIST, 'sitemap.xml'), xml)
console.log('sitemap.xml:', pages.length * 2, 'urls')


// Prerendering needs Chromium. If it is not available (e.g. a minimal CI image),
// skip it: the site still works as a normal single-page app.
let browser
try {
  const { chromium } = require('playwright')
  browser = await chromium.launch()
} catch (e) {
  console.warn('\n⚠ Prerender skipped — Chromium is not available:', String(e.message).split('\n')[0])
  console.warn('  The site still works; pages are rendered in the browser instead.\n')
  process.exit(0)
}

const shell = await readFile(path.join(DIST, 'index.html'), 'utf8')
const types = { '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.html': 'text/html' }
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  try {
    const body = await readFile(path.join(DIST, url))
    res.writeHead(200, { 'content-type': types[path.extname(url)] ?? 'application/octet-stream' }).end(body)
  } catch { res.writeHead(200, { 'content-type': 'text/html' }).end(shell) }
}).listen(4789)

const page = await browser.newPage()
await page.route(/fonts\.(googleapis|gstatic)\.com|google\.com\/maps/, (r) => r.abort())
for (const pair of pages) {
  for (const route of [pair.en, pair.me]) {
    await page.goto(`http://localhost:4789${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      document.head.querySelectorAll('title, meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], meta[name="robots"], link[rel="canonical"], link[rel="alternate"]').forEach((el) => el.setAttribute('data-prerender', ''))
      document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.setAttribute('data-prerender', ''))
    })
    const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
    const out = path.join(DIST, route, 'index.html')
    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, html)
    console.log('prerendered', route)
  }
}
await browser.close()
server.close()

