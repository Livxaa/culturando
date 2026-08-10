import '../../css/checkout.css'
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils/formatters.js'
import TicketSelector from '../../components/checkout/TicketSelector.jsx'
import OrderSummary from '../../components/checkout/OrderSummary.jsx'
import PaymentStatus from '../../components/checkout/PaymentStatus.jsx'

export default function CheckoutPage() {
  const event = useLoaderData()
  const actionData = useActionData()
  const navigation = useNavigation()
  const [ticketType, setTicketType] = useState('inteira')
  const [quantity, setQuantity] = useState(1)
  const total = event.ticketPrices[ticketType] * quantity
  useEffect(() => { if (actionData?.ok) window.scrollTo({ top: 0, behavior: 'smooth' }) }, [actionData])
  return <section className="checkout-page page-section" aria-labelledby="checkout-title"><div className="container checkout-shell"><div className="checkout-heading"><p className="eyebrow">Compra segura</p><h1 id="checkout-title" tabIndex="-1">Pagamento</h1><p>{event.title}</p></div><Form method="post" className="checkout-form"><TicketSelector event={event} value={ticketType} onChange={setTicketType} /><div className="quantity-field"><label htmlFor="quantity">Quantidade</label><input id="quantity" name="quantity" type="number" min="1" max="10" value={quantity} onChange={(eventTarget) => setQuantity(Math.max(1, Math.min(10, Number(eventTarget.target.value) || 1)))} /></div><OrderSummary event={event} ticketType={ticketType} quantity={quantity} total={total} /><PaymentStatus actionData={actionData} /><button className="button button--primary checkout-submit" type="submit" disabled={navigation.state === 'submitting'}>{navigation.state === 'submitting' ? 'Processando…' : `Pagar ${formatCurrency(total)}`}</button></Form></div></section>
}
