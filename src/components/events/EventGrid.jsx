import EventCard from './EventCard'

export default function EventGrid({ events }) {
  return (
    <ul className="event-grid" aria-label="Eventos disponíveis">
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  )
}
