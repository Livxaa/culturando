import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../data/routes'

const items = [
  { label: 'Início', to: ROUTES.HOME, end: true },
  { label: 'Eventos', to: ROUTES.EVENTS },
  { label: 'Ingressos', to: '/pagamento' },
  { label: 'Login', to: ROUTES.LOGIN },
  { label: 'Cadastro', to: ROUTES.REGISTER },
  { label: 'Para organizadores', to: ROUTES.ORGANIZER_LOGIN },
]

export default function MainNav({ isOpen = true, onNavigate }) {
  return (
    <nav className={`main-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
      <ul className="main-nav__list">
        {items.map((item) => (
          <li key={`${item.label}-${item.to}`}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) => `main-nav__link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
