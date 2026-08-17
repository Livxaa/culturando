import { AUTH_SESSION_KEY, DATABASE_KEY } from '../data/routes.js'

let memoryDatabase = null

const isBrowser = () => typeof window !== 'undefined' && Boolean(window.localStorage)

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function readStoredDatabase() {
  if (memoryDatabase) return clone(memoryDatabase)
  if (!isBrowser()) return null
  try {
    const raw = window.localStorage.getItem(DATABASE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    memoryDatabase = parsed
    return clone(parsed)
  } catch {
    return null
  }
}

export function writeStoredDatabase(database) {
  memoryDatabase = clone(database)
  if (!isBrowser()) return clone(memoryDatabase)
  try {
    window.localStorage.setItem(DATABASE_KEY, JSON.stringify(memoryDatabase))
  } catch (error) {
    if (error?.name === 'QuotaExceededError') throw new Error('O armazenamento local está cheio. Remova dados antigos e tente novamente.')
    throw new Error('Não foi possível salvar os dados localmente.')
  }
  return clone(memoryDatabase)
}

export function clearStoredDatabase() {
  memoryDatabase = null
  if (isBrowser()) window.localStorage.removeItem(DATABASE_KEY)
}

export function readStoredSession() {
  if (!isBrowser()) return null
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeStoredSession(session) {
  if (!isBrowser()) return session
  if (session) window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  else window.localStorage.removeItem(AUTH_SESSION_KEY)
  return session
}
