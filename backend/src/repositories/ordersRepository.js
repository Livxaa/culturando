import { transaction, query } from '../config/db.js'

function formatOrder(row) {
  if (!row) return null
  return {
    id: row.id,
    userId: row.user_id,
    buyerId: row.user_id,
    eventId: row.event_id,
    ticketType: row.ticket_type,
    quantity: row.quantity,
    unitPrice: Number(row.unit_price),
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  }
}

export async function createOrder({ userId = null, eventId, ticketType, quantity, unitPrice, total }) {
  return transaction(async (client) => {
    const orderRes = await client.query(
      `INSERT INTO orders (user_id, event_id, ticket_type, quantity, unit_price, total, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'confirmed')
       RETURNING *`,
      [userId, eventId, ticketType, quantity, unitPrice, total]
    )

    const order = orderRes.rows[0]

    await client.query(
      `INSERT INTO order_items (order_id, ticket_type, quantity, unit_price, subtotal)
       VALUES ($1, $2, $3, $4, $5)`,
      [order.id, ticketType, quantity, unitPrice, total]
    )

    return formatOrder(order)
  })
}

export async function findOrderById(id, userId = null) {
  const params = [id]
  let sql = `SELECT * FROM orders WHERE id = $1`

  if (userId) {
    params.push(userId)
    sql += ` AND user_id = $2`
  }

  const result = await query(sql, params)
  return formatOrder(result.rows[0])
}

export async function listOrdersByUserId(userId) {
  const result = await query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  )
  return result.rows.map(formatOrder)
}
