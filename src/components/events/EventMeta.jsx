export function formatEventDate(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default function EventMeta({ event, compact = false }) {
  return (
    <dl className={`event-meta ${compact ? 'event-meta--compact' : ''}`.trim()}>
      <div>
        <dt>Quando</dt>
        <dd>{formatEventDate(event.date)}</dd>
      </div>
      <div>
        <dt>Onde</dt>
        <dd>{event.location}</dd>
      </div>
      {!compact && (
        <div>
          <dt>A partir de</dt>
          <dd>{formatBRL(event.ticketPrices.inteira)}</dd>
        </div>
      )}
    </dl>
  )
}
