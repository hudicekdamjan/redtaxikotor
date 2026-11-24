import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { SLUGS } from './config/routes'
import { DEFAULT_LANG, LANGS } from './config/site'
import { LangProvider, readStoredLang } from './context/LangContext'
import { MunicipalityProvider } from './context/MunicipalityContext'
import AboutUs from './pages/AboutUs'
import AirportTransfers from './pages/AirportTransfers'
import Contact from './pages/Contact'
import ExcursionDetail from './pages/ExcursionDetail'
import Excursions from './pages/Excursions'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PriceList from './pages/PriceList'
import TaxiServices from './pages/TaxiServices'

/** "/" → remembered language (English by default) */
function RootRedirect() {
  return <Navigate to={`/${readStoredLang() ?? DEFAULT_LANG}/`} replace />
}

export default function App() {
  return (
    <MunicipalityProvider>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        {LANGS.map((lang) => (
          <Route key={lang} path={`/${lang}`} element={<LangProvider key={lang} lang={lang}><Layout /></LangProvider>}>
            <Route index element={<Home />} />
            <Route path={SLUGS.taxi[lang]} element={<TaxiServices />} />
            <Route path={SLUGS.airport[lang]} element={<AirportTransfers />} />
            <Route path={SLUGS.excursions[lang]} element={<Excursions />} />
            <Route path={`${SLUGS.excursions[lang]}/:slug`} element={<ExcursionDetail />} />
            <Route path={SLUGS.prices[lang]} element={<PriceList />} />
            <Route path={SLUGS.about[lang]} element={<AboutUs />} />
            <Route path={SLUGS.contact[lang]} element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ))}
        <Route path="*" element={<LangProvider lang={DEFAULT_LANG}><Layout /></LangProvider>}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MunicipalityProvider>
  )
}
