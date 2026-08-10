import { formatBRL } from '../events/EventMeta'

export default function OrderSummary({ event, ticketType, quantity }) {
  const unitPrice = event.ticketPrices[ticketType] || 0
  const total = unitPrice * quantity
  const label = ticketType === 'meia' ? 'Meia entrada' : ticketType === 'pcd' ? 'PCD' : 'Inteira'

  return (
    <aside className="order-summary" aria-label="Resumo do pedido">
      <p className="eyebrow">Resumo do pedido</p>
      <h2>{event.title}</h2>
      <dl>
        <div><dt>Ingresso</dt><dd>{label}</dd></div>
        <div><dt>Quantidade</dt><dd>{quantity}</dd></div>
        <div className="order-summary__total"><dt>Valor final</dt><dd>{formatBRL(total)}</dd></div>
      </dl>
    </aside>
  )
}
