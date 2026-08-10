import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer__inner container">
      <p>Cultura acessível começa quando informação, acolhimento e autonomia fazem parte da experiência.</p>
      <nav className="site-footer__links" aria-label="Navegação complementar">
        <Link to="/shows">Agenda</Link>
        <Link to="/organizador/acessibilidade">Orientações para empresas</Link>
      </nav>
    </div>
  </footer>
}
