import { AUTH_SESSION_KEY } from '../data/routes.js'
import { getDatabase, updateDatabase } from './mockDatabaseService.js'
import { readStoredSession, writeStoredSession } from './storageService.js'

const clone = (value) => JSON.parse(JSON.stringify(value))
const normalizeEmail = (email) => email.trim().toLowerCase()
const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
const publicUser = ({ password: _password, ...user }) => user

function toSession(user) {
  return { userId: user.id, role: user.role, email: user.email, displayName: user.name }
}

export const authService = {
  getSession() {
    return readStoredSession()
  },

  setSession(session) {
    return writeStoredSession(session ? clone(session) : null)
  },

  logout() {
    return writeStoredSession(null)
  },

  register({ name, email, password, state }) {
    const normalizedEmail = normalizeEmail(email)
    const existing = getDatabase().users.find((user) => user.email === normalizedEmail)
    if (existing) return { ok: false, code: 'EMAIL_IN_USE', message: 'Este e-mail já está cadastrado.' }
    const user = { id: createId('user'), role: 'buyer', name: name.trim(), email: normalizedEmail, password, state }
    updateDatabase((database) => ({ ...database, users: [...database.users, user] }))
    const session = toSession(user)
    this.setSession(session)
    return { ok: true, user: publicUser(user), session }
  },

  authenticate({ email, password, role = 'buyer' }) {
    const normalizedEmail = normalizeEmail(email)
    const database = getDatabase()
    const existing = database.users.find((user) => user.email === normalizedEmail)
    if (existing && (existing.password !== password || existing.role !== role)) return { ok: false, message: 'E-mail ou senha inválidos.' }
    const user = existing || { id: createId(role), role, name: normalizedEmail.split('@')[0], email: normalizedEmail, password, state: '' }
    if (!existing) updateDatabase((current) => ({ ...current, users: [...current.users, user] }))
    const session = toSession(user)
    this.setSession(session)
    return { ok: true, user: publicUser(user), session, created: !existing }
  },
}

export { AUTH_SESSION_KEY }
