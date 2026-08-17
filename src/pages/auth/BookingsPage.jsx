import '../../css/events.css'
import { Link, useLoaderData } from 'react-router-dom'
import { formatCurrency, formatShortDate, formatTicketType } from '../../utils/formatters.js'
import { useAuth } from '../../context/authContext.jsx'

export default function BookingsPage() {
  const bookings = useLoaderData()
  const { isAuthenticated } = useAuth()
  return <section className="bookings-page page-section" aria-labelledby="bookings-title"><div className="container"><p className="eyebrow">Área do comprador</p><h1 id="bookings-title" tabIndex="-1">Meus ingressos</h1>{!isAuthenticated && <div className="empty-state"><p>Entre ou crie uma conta para acompanhar seus pedidos nesta tela.</p><Link className="button button--primary" to="/login">Entrar</Link></div>}{isAuthenticated && !bookings.length && <div className="empty-state"><p>Você ainda não tem ingressos registrados.</p><Link className="button button--primary" to="/shows">Explorar eventos</Link></div>}{Boolean(bookings.length) && <ul className="booking-list">{bookings.map((booking) => <li className="booking-card" key={booking.id}><div><p className="eyebrow">{booking.status}</p><h2>{booking.eventTitle}</h2><p>{formatTicketType(booking.ticketType)} · {booking.quantity} ingresso(s)</p></div><dl><div><dt>Data da compra</dt><dd>{formatShortDate(booking.createdAt)}</dd></div><div><dt>Total</dt><dd>{formatCurrency(booking.total)}</dd></div></dl></li>)}</ul>}</div></section>
}
