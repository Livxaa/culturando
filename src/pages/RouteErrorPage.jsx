import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import BrandLogo from '../components/ui/BrandLogo'
import '../css/status.css'

export default function RouteErrorPage() {
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <section className="route-error page-section">
      <BrandLogo />
      <p className="eyebrow">{isNotFound ? 'Página não encontrada' : 'Algo saiu do roteiro'}</p>
      <h1>{isNotFound ? 'Não encontramos esse evento.' : 'Não foi possível carregar esta página.'}</h1>
      <p>Volte para a agenda e continue descobrindo experiências culturais.</p>
      <Link className="button button--primary" to="/shows">Ver eventos</Link>
    </section>
  )
}
