import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigation } from 'react-router-dom'
import SkipLink from '../components/layout/SkipLink.jsx'
import SiteHeader from '../components/layout/SiteHeader.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'

export default function PublicLayout() {
  const mainRef = useRef(null)
  const location = useLocation()
  const navigation = useNavigation()

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const heading = mainRef.current?.querySelector('h1')
      if (heading) heading.focus()
      else mainRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(id)
  }, [location.pathname])

  return <div className="site-shell">
    <SkipLink />
    <SiteHeader />
    {navigation.state !== 'idle' && <div className="route-progress" role="status" aria-live="polite">Carregando…</div>}
    <main id="main-content" className="site-main" ref={mainRef} tabIndex="-1"><Outlet /></main>
    <SiteFooter />
  </div>
}
