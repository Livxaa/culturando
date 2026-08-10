import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import Button from '../ui/Button'
import EventMeta from './EventMeta'

export default function EventCard({ event, variant = 'grid' }) {
  return (
    <article className={`event-card event-card--${variant}`}>
      <div className="event-card__media-wrap">
        <img
          className="event-card__media"
          src={event.image}
          alt={event.imageAlt}
          width="1200"
          height="800"
          loading={variant === 'featured' ? 'eager' : 'lazy'}
        />
        <span className="event-card__badge">{event.category}</span>
      </div>
      <div className="event-card__body">
        <h2 className="event-card__title">{event.title}</h2>
        <EventMeta event={event} compact />
        <Button to={ROUTES.EVENT_DETAIL(event.id)} variant="secondary" aria-label={`Ver detalhes de ${event.title}`}>
          Ver detalhes
        </Button>
      </div>
    </article>
  )
}

export function EventCardLink({ event }) {
  return <Link className="event-card__whole-link" to={ROUTES.EVENT_DETAIL(event.id)}>{event.title}</Link>
}
