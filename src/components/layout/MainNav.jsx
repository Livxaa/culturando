import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'

const links = [
  ['Início', ROUTES.HOME, true],
  ['Eventos', ROUTES.EVENTS, false],
  ['Ingressos', ROUTES.BOOKINGS, false],
  ['Login', ROUTES.LOGIN, false],
  ['Cadastro', ROUTES.REGISTER, false],
  ['Para organizadores', ROUTES.ORGANIZER_LOGIN, false],
]

export default function MainNav({ isOpen = true }) {
  return <nav id="main-navigation" className="main-nav" aria-label="Navegação principal" data-open={isOpen}><ul className="main-nav__list">{links.map(([label, to, end]) => <li key={`${label}-${to}`}><NavLink className="main-nav__link" to={to} end={end}>{label}</NavLink></li>)}</ul></nav>
}
