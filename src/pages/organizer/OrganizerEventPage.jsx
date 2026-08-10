import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import OrganizerEventForm from '../../components/organizer/OrganizerEventForm'

export default function OrganizerEventPage() {
  return (
    <main className="organizer-page organizer-page--form">
      <div className="shell-container organizer-form-page">
        <header className="organizer-section-heading">
          <Link className="text-link" to={ROUTES.ORGANIZER_HOME}>← Voltar para a visão geral</Link>
          <p className="eyebrow">Novo cadastro</p>
          <h1>Cadastrar evento</h1>
          <p>Preencha as informações com transparência para que cada pessoa consiga decidir se essa experiência é para ela.</p>
        </header>
        <OrganizerEventForm />
      </div>
    </main>
  )
}
