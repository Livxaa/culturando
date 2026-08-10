import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'
import EventMeta from './EventMeta.jsx'

export default function EventCard({ event }) {
  return <li className="event-card">
    <Link className="event-card__link" to={ROUTES.EVENT_DETAIL(event.id)}>
      <div className="event-card__media"><img src={event.image} alt={event.imageAlt} loading="lazy" onError={(eventTarget) => { eventTarget.currentTarget.src = event.fallbackImage }} /><span className="event-card__badge">{event.category}</span></div>
      <div className="event-card__body">
        <h2>{event.title}</h2>
        <EventMeta event={event} compact />
        <span className="event-card__cta">Ver detalhes</span>
      </div>
    </Link>
  </li>
}
