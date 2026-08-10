import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'
import EventMeta from './EventMeta.jsx'

export default function FeaturedEventCard({ event }) {
  return <article className="featured-card">
    <div className="featured-card__media"><img src={event.image} alt={event.imageAlt} onError={(eventTarget) => { eventTarget.currentTarget.src = event.fallbackImage }} /><span className="event-card__badge">Em destaque</span></div>
    <div className="featured-card__body"><p className="eyebrow">{event.category}</p><h2>{event.title}</h2><EventMeta event={event} /><Link className="button button--secondary" to={ROUTES.EVENT_DETAIL(event.id)}>Ver detalhes</Link></div>
  </article>
}
