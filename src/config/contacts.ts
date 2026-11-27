/**
 * SINGLE SOURCE OF TRUTH for all Red Taxi contact details.
 * Every phone, Viber and WhatsApp link on the website is generated from this file.
 *
 * RULE: the number a customer uses depends on the municipality where they are
 * PHYSICALLY LOCATED right now — never on their destination.
 */
export type MunicipalityId = 'kotor' | 'tivat'

export interface Municipality {
  id: MunicipalityId
  /** Short taxi hotline (dial within Montenegro). Never used for Viber/WhatsApp. */
  hotline: string
  /** Full international mobile number, digits only (no +). Used for Viber & WhatsApp. */
  mobileE164: string
  /** Human readable mobile number */
  mobileDisplay: string
  /** Map query used for the Google Maps embed */
  mapQuery: string
}

export const MUNICIPALITIES: Record<MunicipalityId, Municipality> = {
  kotor: {
    id: 'kotor',
    hotline: '19719',
    mobileE164: '38267019719',
    mobileDisplay: '+382 67 019 719',
    mapQuery: 'Kotor, Montenegro',
  },
  tivat: {
    id: 'tivat',
    hotline: '19729',
    mobileE164: '38267019729',
    mobileDisplay: '+382 67 019 729',
    mapQuery: 'Tivat, Montenegro',
  },
}

export const MUNICIPALITY_IDS: MunicipalityId[] = ['kotor', 'tivat']

export const EMAIL = 'redtaxikotor@gmail.com'

/** Transfer / excursion inquiries from the booking form are addressed to this email. */
export const BOOKING_EMAIL = EMAIL

/**
 * How booking inquiries are delivered:
 *  'direct'  — sent straight from the website to BOOKING_EMAIL through FormSubmit (https://formsubmit.co),
 *              a free form-to-email service. The FIRST inquiry sends a one-time "Activate Form" email
 *              to BOOKING_EMAIL — click it once, then inquiries arrive normally.
 *  'mailapp' — opens the visitor's own email app with the message ready; the visitor presses send.
 */
export const INQUIRY_DELIVERY: 'direct' | 'mailapp' = 'mailapp'
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`

/** tel: link for the short hotline */
export const telHotline = (m: Municipality) => `tel:${m.hotline}`
/** tel: link for the full mobile number (works from foreign SIM cards) */
export const telMobile = (m: Municipality) => `tel:+${m.mobileE164}`
/** Official WhatsApp click-to-chat link (optionally with a prefilled message) */
export const whatsappLink = (m: Municipality, text?: string) =>
  `https://wa.me/${m.mobileE164}${text ? `?text=${encodeURIComponent(text)}` : ''}`
/** Viber deep link – opens a chat with the full international number */
export const viberLink = (m: Municipality) => `viber://chat?number=%2B${m.mobileE164}`
/** Google Maps */
export const mapsEmbed = (m: Municipality) =>
  `https://www.google.com/maps?q=${encodeURIComponent(m.mapQuery)}&z=13&output=embed`
export const mapsLink = (m: Municipality) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.mapQuery)}`
