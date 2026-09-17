import '../../css/checkout.css'
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils/formatters.js'
import TicketSelector from '../../components/checkout/TicketSelector.jsx'
import PaymentMethodSelector from '../../components/checkout/PaymentMethodSelector.jsx'
import OrderSummary from '../../components/checkout/OrderSummary.jsx'
import PaymentStatus from '../../components/checkout/PaymentStatus.jsx'
import ReceiptModal from '../../components/checkout/ReceiptModal.jsx'

export default function CheckoutPage() {
  const event = useLoaderData()
  const actionData = useActionData()
  const navigation = useNavigation()
  const [ticketType, setTicketType] = useState('inteira')
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [showReceipt, setShowReceipt] = useState(false)

  const total = event.ticketPrices[ticketType] * quantity

  useEffect(() => {
    if (actionData?.ok) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setShowReceipt(true)
    }
  }, [actionData])

  return (
    <section className="checkout-page page-section" aria-labelledby="checkout-title">
      <div className="container checkout-shell">
        <div className="checkout-heading">
          <p className="eyebrow">Compra segura (Sandbox)</p>
          <h1 id="checkout-title" tabIndex="-1">Finalizar Pagamento</h1>
          <p>{event.title}</p>
        </div>

        <Form method="post" className="checkout-form">
          <TicketSelector event={event} value={ticketType} onChange={setTicketType} />

          <div className="quantity-field">
            <label htmlFor="quantity">Quantidade de ingressos</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
            />
          </div>

          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

          <OrderSummary event={event} ticketType={ticketType} quantity={quantity} total={total} />

          <PaymentStatus actionData={actionData} />

          <button
            className="button button--primary checkout-submit"
            type="submit"
            disabled={navigation.state === 'submitting'}
          >
            {navigation.state === 'submitting'
              ? 'Processando Pagamento…'
              : `Confirmar e Pagar ${formatCurrency(total)}`}
          </button>
        </Form>
      </div>

      {showReceipt && actionData?.booking && (
        <ReceiptModal
          booking={actionData.booking}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </section>
  )
}
