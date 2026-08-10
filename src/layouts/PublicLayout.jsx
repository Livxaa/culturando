import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SkipLink from '../components/layout/SkipLink'
import SiteHeader from '../components/layout/SiteHeader'
import SiteFooter from '../components/layout/SiteFooter'
import '../css/shell.css'

export default function PublicLayout() {
  const mainRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" ref={mainRef} className="app-main" tabIndex="-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
