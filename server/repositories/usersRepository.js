import { query } from '../db.js'

const toUser = (row) => row ? ({ id: row.id, role: row.role, name: row.name, email: row.email, state: row.state }) : null

export async function findUserByEmail(email) {
  const result = await query('SELECT id, role, name, email, state, password_hash FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1', [email])
  return result.rows[0] || null
}

export async function findUserById(id) {
  const result = await query('SELECT id, role, name, email, state FROM users WHERE id = $1 LIMIT 1', [id])
  return toUser(result.rows[0])
}

export async function createUser({ role, name, email, passwordHash, state }) {
  const result = await query('INSERT INTO users (role, name, email, password_hash, state) VALUES ($1, $2, $3, $4, $5) RETURNING id, role, name, email, state', [role, name, email.toLowerCase(), passwordHash, state || null])
  return toUser(result.rows[0])
}
