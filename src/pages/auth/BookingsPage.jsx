import '../../css/events.css'
import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { formatCurrency, formatShortDate, formatTicketType } from '../../utils/formatters.js'
import { useAuth } from '../../context/authContext.jsx'
import ReceiptModal from '../../components/checkout/ReceiptModal.jsx'

export default function BookingsPage() {
  const bookings = useLoaderData()
  const { isAuthenticated } = useAuth()
  const [selectedBooking, setSelectedBooking] = useState(null)

  return (
    <section className="bookings-page page-section" aria-labelledby="bookings-title">
      <div className="container">
        <p className="eyebrow">Área do comprador</p>
        <h1 id="bookings-title" tabIndex="-1">Meus ingressos</h1>

        {!isAuthenticated && (
          <div className="empty-state">
            <p>Entre ou crie uma conta para acompanhar seus pedidos nesta tela.</p>
            <Link className="button button--primary" to="/login">Entrar</Link>
          </div>
        )}

        {isAuthenticated && !bookings.length && (
          <div className="empty-state">
            <p>Você ainda não tem ingressos registrados.</p>
            <Link className="button button--primary" to="/shows">Explorar eventos</Link>
          </div>
        )}

        {Boolean(bookings.length) && (
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li className="booking-card" key={booking.id}>
                <div>
                  <p className="eyebrow">{booking.status || 'confirmado'}</p>
                  <h2>{booking.eventTitle}</h2>
                  <p>{formatTicketType(booking.ticketType)} · {booking.quantity} ingresso(s)</p>
                  {booking.validationCode && (
                    <small className="booking-card__code">Código: <strong>{booking.validationCode}</strong></small>
                  )}
                </div>
                <dl>
                  <div>
                    <dt>Data da compra</dt>
                    <dd>{formatShortDate(booking.createdAt)}</dd>
                  </div>
                  <div>
                    <dt>Total</dt>
                    <dd>{formatCurrency(booking.total)}</dd>
                  </div>
                </dl>
                <div className="booking-card__actions">
                  <button
                    type="button"
                    className="button button--secondary"
                    onClick={() => setSelectedBooking(booking)}
                    aria-label={`Ver comprovante do evento ${booking.eventTitle}`}
                  >
                    📄 Ver Comprovante
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedBooking && (
        <ReceiptModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </section>
  )
}
