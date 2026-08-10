import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { ROUTES } from '../../data/routes'

export default function BrandLogo() {
  return (
    <Link className="brand-logo" to={ROUTES.HOME} aria-label="Culturando, página inicial">
      <img src={logo} alt="Culturando" width="320" height="120" />
    </Link>
  )
}
