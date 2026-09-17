import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'
import EventMeta from './EventMeta.jsx'
import { useAccessibility } from '../../context/AccessibilityContext.jsx'

export default function EventCard({ event }) {
  const { announce } = useAccessibility();
  return (
    <li className="event-card">
      <Link
        className="event-card__link"
        to={ROUTES.EVENT_DETAIL(event.id)}
        onFocus={() => announce(`Evento ${event.title}, categoria ${event.category}`)}
        onMouseEnter={() => announce(`Evento ${event.title}, categoria ${event.category}`)}
        aria-label={`Evento ${event.title}, categoria ${event.category}`}
      >
        <div className="event-card__media">
          <img src={event.image} alt={event.imageAlt} loading="lazy" onError={(eventTarget) => { eventTarget.currentTarget.src = event.fallbackImage }} />
          <span className="event-card__badge">{event.category}</span>
        </div>
        <div className="event-card__body">
          <h2>{event.title}</h2>
          <EventMeta event={event} compact />
          <span className="event-card__cta">Ver detalhes</span>
        </div>
      </Link>
    </li>
  );
}
