import '../../css/events.css'
import { useLoaderData } from 'react-router-dom'
import EventGrid from '../../components/events/EventGrid.jsx'

export default function EventsPage() {
  const events = useLoaderData()
  return <section className="events-page page-section" aria-labelledby="events-title"><div className="container"><p className="eyebrow">Agenda cultural</p><h1 id="events-title" tabIndex="-1">Confira os próximos eventos</h1><p className="events-page__intro">Escolha uma experiência para viver a cultura de um jeito mais acessível, próximo e plural.</p><EventGrid events={events} /></div></section>
}
