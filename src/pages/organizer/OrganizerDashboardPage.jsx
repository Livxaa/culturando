import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import { useAuth } from '../../context/authContext'

const organizerImage = 'https://images.unsplash.com/photo-1731395157985-76af28b68afa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBldmVudCUyMG9yZ2FuaXplciUyMGhvbGRpbmclMjBhJTIwdGFibGV0JTIwaW4lMjBhJTIwd2VsbCUyMGxpdCUyMHRoZWF0ZXJ8ZW58MHx8fHwxNzg2MzYwMTQ2fDA&ixlib=rb-4.1.0&q=85&w=1200'

export default function OrganizerDashboardPage() {
  const { user } = useAuth()

  return (
    <main className="organizer-page">
      <div className="shell-container">
        <section className="organizer-welcome" aria-labelledby="organizer-title">
          <div>
            <p className="eyebrow">Olá, {user?.name || 'organizador'}</p>
            <h1 id="organizer-title">Bem-vindo à área do organizador</h1>
            <p>Cadastre seus eventos, informe os recursos de acessibilidade e ajude mais pessoas a participarem.</p>
          </div>
          <img src={organizerImage} alt="Pessoa organizadora com um tablet em um teatro — Frank Alarcon no Unsplash" width="1200" height="800" />
        </section>
        <section className="organizer-actions" aria-labelledby="organizer-actions-title">
          <div className="organizer-section-heading">
            <p className="eyebrow">Próximos passos</p>
            <h2 id="organizer-actions-title">O que você quer fazer?</h2>
          </div>
          <div className="organizer-action-grid">
            <Link className="organizer-action-card organizer-action-card--primary" to={ROUTES.ORGANIZER_NEW_EVENT}>
              <span className="organizer-action-card__mark" aria-hidden="true">+</span>
              <h3>Cadastrar novo evento</h3>
              <p>Adicione detalhes, mídia, ingresso e informações de acessibilidade.</p>
              <span className="organizer-action-card__link">Começar cadastro</span>
            </Link>
            <Link className="organizer-action-card" to={ROUTES.ORGANIZER_ACCESSIBILITY}>
              <span className="organizer-action-card__mark" aria-hidden="true">i</span>
              <h3>Aprender sobre acessibilidade</h3>
              <p>Consulte orientações práticas para preparar sua equipe e o espaço.</p>
              <span className="organizer-action-card__link">Abrir guia</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
