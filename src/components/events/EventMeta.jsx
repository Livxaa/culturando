import { formatCurrency, formatDate } from '../../utils/formatters.js'

export default function EventMeta({ event, compact = false }) {
  return <dl className={`event-meta${compact ? ' event-meta--compact' : ''}`}>
    <div><dt>Quando</dt><dd>{compact ? formatDate(event.date) : formatDate(event.date)}</dd></div>
    <div><dt>Onde</dt><dd>{event.location}</dd></div>
    <div><dt>A partir de</dt><dd>{formatCurrency(event.ticketPrices.inteira)}</dd></div>
  </dl>
}
