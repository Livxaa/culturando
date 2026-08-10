import { Link, useLoaderData } from 'react-router-dom'
import EventGrid from '../../components/events/EventGrid'
import WaveBackdrop from '../../components/ui/WaveBackdrop'
import '../../css/events.css'

export default function EventsPage() {
  const { events } = useLoaderData()

  return (
    <div className="events-page page-section">
      <WaveBackdrop className="events-page__wave" />
      <div className="shell-container events-page__content">
        <header className="page-heading">
          <p className="eyebrow">Agenda cultural</p>
          <h1>Confira os próximos eventos</h1>
          <p>Escolha uma experiência para viver a cultura de um jeito mais acessível, próximo e plural.</p>
        </header>
        {events.length > 0 ? <EventGrid events={events} /> : <p className="empty-state">Ainda não há eventos publicados. Volte em breve.</p>}
        <Link className="text-link" to="/">Voltar para a página inicial</Link>
      </div>
    </div>
  )
}
