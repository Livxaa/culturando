import { NavLink, Outlet } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import { useAuth } from '../../context/authContext'
import '../../css/organizer.css'

export default function OrganizerLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="organizer-layout">
      <div className="shell-container organizer-layout__bar">
        <div>
          <p className="eyebrow">Área profissional</p>
          <p className="organizer-layout__welcome">Olá, {user?.name || 'organizador'}</p>
        </div>
        <nav aria-label="Navegação do organizador">
          <ul className="organizer-nav">
            <li><NavLink to={ROUTES.ORGANIZER_HOME} end>Visão geral</NavLink></li>
            <li><NavLink to={ROUTES.ORGANIZER_NEW_EVENT}>Cadastrar evento</NavLink></li>
            <li><NavLink to={ROUTES.ORGANIZER_ACCESSIBILITY}>Guia de acessibilidade</NavLink></li>
            <li><button type="button" onClick={signOut}>Sair</button></li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
