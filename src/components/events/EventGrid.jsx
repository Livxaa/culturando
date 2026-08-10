import EventCard from './EventCard.jsx'

export default function EventGrid({ events }) {
  if (!events.length) return <p className="empty-state">Nenhum evento encontrado no momento.</p>
  return <ul className="event-grid">{events.map((event) => <EventCard key={event.id} event={event} />)}</ul>
}
