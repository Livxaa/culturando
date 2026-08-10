import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useAuth } from '../../context/authContext.jsx'
import { ROUTES } from '../../data/routes.js'
import BrandLogo from '../ui/BrandLogo.jsx'

export default function OrganizerLayout() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    const id = window.requestAnimationFrame(() => mainRef.current?.querySelector('h1')?.focus())
    return () => window.cancelAnimationFrame(id)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate(ROUTES.ORGANIZER_LOGIN, { replace: true })
  }

  return <div className="organizer-shell">
    <header className="organizer-header">
      <div className="container organizer-header__inner">
        <Link to={ROUTES.ORGANIZER_DASHBOARD} aria-label="Ir para o painel do organizador"><BrandLogo /></Link>
        <nav aria-label="Navegação da área do organizador"><ul className="organizer-nav">
          <li><Link to={ROUTES.ORGANIZER_DASHBOARD}>Painel</Link></li>
          <li><Link to={ROUTES.ORGANIZER_NEW_EVENT}>Novo evento</Link></li>
          <li><Link to={ROUTES.ORGANIZER_ACCESSIBILITY}>Acessibilidade</Link></li>
          <li><button type="button" onClick={handleLogout}>Sair<span className="visually-hidden"> da conta de {session?.email}</span></button></li>
        </ul></nav>
      </div>
    </header>
    <main className="organizer-main" ref={mainRef}><Outlet /></main>
  </div>
}
