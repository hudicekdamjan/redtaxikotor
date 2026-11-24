import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { storeLang, useLang } from '../context/LangContext'
import Footer from './Footer'
import Header from './Header'
import MobileContactBar from './MobileContactBar'

export default function Layout() {
  const { lang } = useLang()
  const { pathname, hash } = useLocation()
  useEffect(() => { storeLang(lang) }, [lang])
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  // In-page anchors (#book, #location…) just scroll — they never change the route.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      const href = a?.getAttribute('href')
      if (!href || !href.startsWith('#') || href.startsWith('#/')) return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth' })
      if (href === '#main') el.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  )
}
