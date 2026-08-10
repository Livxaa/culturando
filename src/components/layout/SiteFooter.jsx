import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell-container site-footer__content">
        <div>
          <p className="eyebrow">Culturando</p>
          <p className="site-footer__copy">Cultura acessível para viver, compartilhar e transformar.</p>
        </div>
        <nav aria-label="Navegação de apoio">
          <ul className="site-footer__links">
            <li><Link to={ROUTES.EVENTS}>Ver eventos</Link></li>
            <li><Link to={ROUTES.LOGIN}>Entrar</Link></li>
            <li><a href="#main-content">Voltar ao topo</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
