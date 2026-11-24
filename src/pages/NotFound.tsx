import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { pathFor } from '../config/routes'
import { useLang } from '../context/LangContext'

export default function NotFound() {
  const { lang, t } = useLang()
  return (
    <>
      <Seo title={t.meta.notFound.title} description={t.meta.notFound.description} />
      <meta name="robots" content="noindex" />
      <section className="flex min-h-[70vh] items-center bg-ink px-4 pt-24 text-center text-white">
        <div className="mx-auto max-w-md">
          <p className="font-display text-8xl font-extrabold text-red">404</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">{t.notFound.title}</h1>
          <p className="mt-3 text-white/70">{t.notFound.text}</p>
          <Link to={pathFor(lang, 'home')} className="mt-8 inline-flex h-12 items-center rounded-full bg-red px-6 text-sm font-bold uppercase tracking-wide hover:bg-red-dark">{t.notFound.back}</Link>
        </div>
      </section>
    </>
  )
}
