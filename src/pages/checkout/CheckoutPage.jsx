import { useMemo, useState } from 'react'
import { Form, Link, useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import Button from '../../components/ui/Button'
import TicketSelector from '../../components/checkout/TicketSelector'
import OrderSummary from '../../components/checkout/OrderSummary'
import PaymentStatus from '../../components/checkout/PaymentStatus'
import '../../css/checkout.css'

export default function CheckoutPage() {
  const event = useLoaderData()
  const actionData = useActionData()
  const navigation = useNavigation()
  const [ticketType, setTicketType] = useState('inteira')
  const [quantity, setQuantity] = useState(1)
  const isSubmitting = navigation.state === 'submitting'
  const isSuccess = actionData?.ok === true
  const summaryKey = useMemo(() => `${ticketType}-${quantity}`, [ticketType, quantity])

  return (
    <div className="checkout-page page-section">
      <div className="shell-container checkout-page__content">
        <header className="page-heading page-heading--light">
          <p className="eyebrow">Garanta seu lugar</p>
          <h1>Pagamento</h1>
          <p>Finalize sua escolha com calma. Você poderá revisar as informações antes de enviar.</p>
        </header>
        <div className="checkout-layout">
          <Form method="post" className="checkout-form">
            <TicketSelector
              event={event}
              selectedType={ticketType}
              onTypeChange={setTicketType}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <div className="checkout-form__actions">
              <Button type="submit" disabled={isSubmitting || isSuccess}>
                {isSubmitting ? 'Processando...' : isSuccess ? 'Compra concluída' : 'Pagar agora'}
              </Button>
              <Link className="text-link text-link--light" to={ROUTES.EVENT_DETAIL(event.id)}>Voltar ao evento</Link>
            </div>
            <PaymentStatus actionData={actionData} />
          </Form>
          <OrderSummary key={summaryKey} event={event} ticketType={ticketType} quantity={quantity} />
        </div>
      </div>
    </div>
  )
}
