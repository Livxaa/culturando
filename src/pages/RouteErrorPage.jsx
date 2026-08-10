import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import StatusMessage from '../components/ui/StatusMessage.jsx'

export default function RouteErrorPage() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return <section className="error-page container page-section" aria-labelledby="error-title"><p className="eyebrow">Culturando</p><h1 id="error-title" tabIndex="-1">{notFound ? 'Página não encontrada' : 'Não foi possível carregar esta página'}</h1><StatusMessage variant="error" title={notFound ? 'O endereço não existe.' : 'Tente novamente.'}>{notFound ? 'Confira o endereço ou volte para a agenda de eventos.' : 'Ocorreu um erro inesperado. Você pode retornar para a agenda.'}</StatusMessage><Link className="button button--primary" to="/shows">Voltar para eventos</Link></section>
}
