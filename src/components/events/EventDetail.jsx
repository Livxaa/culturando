import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import Button from '../ui/Button'
import EventMeta from './EventMeta'

export default function EventDetail({ event }) {
  return (
    <article className="event-detail">
      <div className="event-detail__media-wrap">
        <img className="event-detail__media" src={event.image} alt={event.imageAlt} width="1200" height="800" />
      </div>
      <div className="event-detail__content">
        <p className="eyebrow">{event.category}</p>
        <h1>{event.title}</h1>
        <EventMeta event={event} />
        <p className="event-detail__description">{event.description}</p>
        <div className="event-detail__actions">
          <Button to={ROUTES.CHECKOUT(event.id)}>Escolher ingresso</Button>
          <Link className="text-link" to={ROUTES.EVENTS}>Voltar para eventos</Link>
        </div>
      </div>
    </article>
  )
}
