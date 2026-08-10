import { Link } from 'react-router-dom'

export default function Auth() {
  return (
    <section className="page-section route-error">
      <p className="eyebrow">Autenticação</p>
      <h1>Escolha como continuar</h1>
      <p>Entre na sua conta ou crie um cadastro para acompanhar seus ingressos.</p>
      <div>
        <Link className="button button--primary" to="/login">Entrar</Link>{' '}
        <Link className="button button--secondary" to="/cadastro">Cadastrar</Link>
      </div>
    </section>
  )
}
