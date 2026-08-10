import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import AccessibilityInfoTabs from '../../components/organizer/AccessibilityInfoTabs'

export default function AccessibilityInfoPage() {
  return (
    <main className="organizer-page">
      <div className="shell-container organizer-info-page">
        <header className="organizer-section-heading">
          <Link className="text-link" to={ROUTES.ORGANIZER_HOME}>← Voltar para a visão geral</Link>
          <p className="eyebrow">Informação e cuidado</p>
          <h1>Guia de acessibilidade para eventos</h1>
          <p>Boas informações ajudam o público a se planejar. Use este guia para transformar intenção em apoio concreto.</p>
        </header>
        <AccessibilityInfoTabs />
      </div>
    </main>
  )
}
