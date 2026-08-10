import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'
import EventMeta from './EventMeta.jsx'
import { formatCurrency } from '../../utils/formatters.js'

export default function EventDetail({ event }) {
  return <article className="event-detail">
    <div className="event-detail__poster"><img src={event.image} alt={event.imageAlt} onError={(eventTarget) => { eventTarget.currentTarget.src = event.fallbackImage }} /></div>
    <div className="event-detail__content"><p className="eyebrow">{event.category}</p><h1 tabIndex="-1">{event.title}</h1><EventMeta event={event} /><p>{event.description}</p><div className="event-detail__accessibility"><h2>Recursos de acessibilidade</h2><ul>{event.accessibility.resources.map((resource) => <li key={resource}>{resource}</li>)}</ul><p>{event.accessibility.onsiteSupport}</p></div><div className="event-detail__action"><strong>{formatCurrency(event.ticketPrices.inteira)}</strong><Link className="button button--primary" to={ROUTES.CHECKOUT(event.id)}>Comprar ingresso</Link></div></div>
  </article>
}
