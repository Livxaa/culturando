import { query } from '../config/db.js'

export async function findUserByEmail(email) {
  const result = await query(
    `SELECT id, role, name, email, password_hash, state, created_at, updated_at
     FROM users
     WHERE LOWER(email) = LOWER($1)
     LIMIT 1`,
    [email]
  )
  return result.rows[0] || null
}

export async function findUserById(id) {
  const result = await query(
    `SELECT id, role, name, email, password_hash, state, created_at, updated_at
     FROM users
     WHERE id = $1
     LIMIT 1`,
    [id]
  )
  return result.rows[0] || null
}

export async function createUser({ role = 'buyer', name, email, passwordHash, state = null }) {
  const result = await query(
    `INSERT INTO users (role, name, email, password_hash, state)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, role, name, email, state, created_at, updated_at`,
    [role, name, email, passwordHash, state]
  )
  return result.rows[0]
}
