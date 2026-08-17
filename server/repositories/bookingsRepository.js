import { query } from '../db.js'

const toBooking = (row) => row ? ({ id: row.id, userId: row.buyer_id, eventId: row.event_slug, eventTitle: row.event_title, ticketType: row.ticket_type, quantity: row.quantity, unitPrice: Number(row.unit_price), total: Number(row.total), status: row.status === 'cancelled' ? 'cancelado' : 'confirmado', createdAt: row.created_at }) : null
const bookingSelect = `SELECT b.id, b.buyer_id, e.slug AS event_slug, e.title AS event_title, b.ticket_type, b.quantity, b.unit_price, b.total, b.status, b.created_at FROM bookings b JOIN events e ON e.id = b.event_id`

export async function listBookings({ userId = null } = {}) {
  const values = userId ? [userId] : []
  const where = userId ? ' WHERE b.buyer_id = $1' : ''
  const result = await query(`${bookingSelect}${where} ORDER BY b.created_at DESC`, values)
  return result.rows.map(toBooking)
}

export async function findBookingById(bookingId, userId) {
  const result = await query(`${bookingSelect} WHERE b.id = $1 AND b.buyer_id = $2 LIMIT 1`, [bookingId, userId])
  return toBooking(result.rows[0])
}

export async function createBooking({ buyerId, eventSlug, ticketType, quantity }) {
  const result = await query(`WITH selected_event AS (SELECT id, slug, ticket_price FROM events WHERE slug = $1), ticket_value AS (SELECT id, slug, ticket_price * CASE WHEN $2 = 'inteira' THEN 1 WHEN $2 IN ('meia', 'pcd') THEN 0.5 END AS unit_price FROM selected_event) INSERT INTO bookings (buyer_id, event_id, ticket_type, quantity, unit_price, total) SELECT $3, id, $2, $4, unit_price, unit_price * $4 FROM ticket_value RETURNING id, buyer_id, ticket_type, quantity, unit_price, total, status, created_at`, [eventSlug, ticketType, buyerId || null, quantity])
  return result.rows[0] || null
}

export async function cancelBooking(bookingId, userId) {
  const result = await query("UPDATE bookings SET status = 'cancelled' WHERE id = $1 AND buyer_id = $2 RETURNING id, buyer_id, ticket_type, quantity, unit_price, total, status, created_at", [bookingId, userId])
  return result.rows[0] || null
}
