import { formatCurrency, formatTicketType } from '../../utils/formatters.js'

export default function OrderSummary({ event, ticketType, quantity, total }) {
  return <section className="order-summary" aria-labelledby="summary-title"><h2 id="summary-title">Resumo do pedido</h2><dl><div><dt>Evento</dt><dd>{event.title}</dd></div><div><dt>Ingresso</dt><dd>{formatTicketType(ticketType)}</dd></div><div><dt>Quantidade</dt><dd>{quantity}</dd></div><div className="order-summary__total"><dt>Valor final</dt><dd>{formatCurrency(total)}</dd></div></dl></section>
}
