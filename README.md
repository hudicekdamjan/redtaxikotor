# Red Taxi Kotor & Tivat — website

Multi-page, bilingual (EN / ME) website. React 19 + TypeScript + Tailwind CSS + React Router + Lucide.
Every page is prerendered to static HTML at build time for SEO.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build + prerender + sitemap → dist/
npm run preview    # serve dist/
npm run images     # convert originals in /photos → optimized WebP
```

## URLs

| Page | English | Montenegrin |
|---|---|---|
| Home | /en/ | /me/ |
| Taxi services | /en/taxi-services | /me/taxi-usluge |
| Airport transfers | /en/airport-transfers | /me/aerodromski-transferi |
| Excursions | /en/excursions | /me/izleti |
| Excursion detail (×6) | /en/excursions/<slug> | /me/izleti/<slug> |
| Price list | /en/price-list | /me/cjenovnik |
| About us | /en/about-us | /me/o-nama |
| Contact | /en/contact | /me/kontakt |

`/` redirects to the visitor's remembered language (English by default).

## Where to edit

| What | File |
|---|---|
| **All phone / Viber / WhatsApp details** (single source) | `src/config/contacts.ts` |
| Prices (taken from the current redtaxikotor.com) | `src/data/prices.ts` |
| Excursions (names and prices from the current site) | `src/data/excursions.ts` |
| English text and SEO titles/descriptions | `src/translations/en.ts` |
| Montenegrin text and SEO titles/descriptions | `src/translations/me.ts` (type-checked: a missing key fails the build) |
| Photos, alt text, credits | `src/config/images.ts` + `/photos` (see `photos/README.md`) |
| Domain for canonical / sitemap | `src/config/site.ts` and `scripts/prerender.mjs` |

## Contact logic

- Kotor: 19719 / +382 67 019 719. Tivat: 19729 / +382 67 019 729.
- The number depends on where the customer **is now**, never on the destination. The site never guesses:
  the visitor picks Kotor or Tivat (header dropdown, contact cards, mobile bar, forms).
- Call buttons use `tel:` with the short hotline. Viber uses `viber://chat?number=%2B382…` and WhatsApp uses `https://wa.me/382…`,
  both always with the full international mobile number.

## Forms (no backend needed)

- **Booking form** (home, airport transfers, each excursion): validates the fields, then opens WhatsApp to the dispatch
  of the selected municipality with a formatted message. The customer presses send in WhatsApp.
- **Contact form**: sends through WhatsApp (selected municipality) or opens the visitor's email app (redtaxikotor@gmail.com).
- Nothing is stored on the website. Receiving form submissions directly by email without WhatsApp or a mail app
  needs an external service (e.g. Formspree, Netlify Forms, or a small backend).

## Content to confirm with Red Taxi (shown as placeholders, never invented)

- Local taxi tariffs (start fare, per km, waiting, night): shown as "On request" / "Na upit".
- Excursion durations: shown as "Duration on request".
- Reviews: the section invites feedback. No testimonials were made up; add real Google reviews when available.
- Social media: none listed on the current site, so none are linked.
- Photos: see `photos/README.md`. Labelled placeholders are shown until originals are supplied.
- The current site also lists +382 67 248 588 (Kotor), +382 67 254 800 (Tivat) and an info line (+382 67 635 209).
  These were not part of the brief, so they are not used. Add them in `contacts.ts` if wanted.

## Deploy

`dist/` is a static site. Configs are included for Render (`render.yaml`), Netlify (`_redirects`), Vercel (`vercel.json`) and Apache/cPanel (`.htaccess`).

**Render:** New → Blueprint → select this repo (uses `render.yaml`), or New → Static Site with
build command `npm ci && (npx playwright install chromium || true) && npm run build` and publish directory `dist`,
plus a rewrite rule `/*` → `/index.html`.
The prerender step needs Chromium; if it cannot run on the build machine it is skipped automatically and the site still works.

## Photo credits

Bay of Kotor: Jaakko Luttinen, CC BY-SA 4.0, Wikimedia Commons (credited in the footer automatically).
