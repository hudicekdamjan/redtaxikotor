import logoOnDark from '../assets/bokalab-logo-on-dark.webp'
import { useLang } from '../context/LangContext'

/**
 * Studio credit: "Website designed & developed by" + the official BokaLab logo (unmodified asset).
 * `tone` picks the logo version for the footer background. Only the on-dark version exists so far;
 * add `logoOnLight` here when the light-background asset is supplied.
 * The current asset still has its own background, so it is shown as a small framed badge.
 */
const LOGOS = { dark: { src: logoOnDark, framed: true, w: 757, h: 193 } }

export default function BokaLabSignature({ tone = 'dark' }: { tone?: keyof typeof LOGOS }) {
  const { t } = useLang()
  const logo = LOGOS[tone]
  return (
    <a
      href="https://bokalab.me"
      target="_blank"
      rel="noopener"
      aria-label={`${t.footer.designedBy} BokaLab (bokalab.me)`}
      className="group inline-flex items-center gap-2 rounded text-[10px] text-white/35 transition duration-300 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span>{t.footer.designedBy}</span>
      <img
        src={logo.src}
        width={logo.w}
        height={logo.h}
        alt="BokaLab.me"
        loading="lazy"
        decoding="async"
        className={`h-5 w-auto opacity-60 transition duration-300 group-hover:-translate-y-px group-hover:opacity-100 ${logo.framed ? 'rounded-[4px]' : ''}`}
      />
    </a>
  )
}
