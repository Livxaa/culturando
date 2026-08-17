import { events as seedEvents } from '../data/events.js'
import { readStoredDatabase, writeStoredDatabase } from './storageService.js'

const seedUsers = [
  {
    id: 'seed-organizer',
    role: 'organizer',
    name: 'Empresa Culturando',
    email: 'empresa@example.com',
    password: 'segredo',
    state: 'SP',
  },
]

const emptyDatabase = { version: 1, initialized: true, users: [], events: [], bookings: [] }

export function getDatabase() {
  const existing = readStoredDatabase()
  if (existing?.initialized) return { ...emptyDatabase, ...existing }
  return writeStoredDatabase({ ...emptyDatabase, users: seedUsers, events: seedEvents })
}

export function updateDatabase(mutator) {
  const current = getDatabase()
  const next = mutator({
    ...current,
    users: [...current.users],
    events: [...current.events],
    bookings: [...current.bookings],
  })
  return writeStoredDatabase({ ...current, ...next, initialized: true })
}

export function resetDatabase() {
  return writeStoredDatabase({ ...emptyDatabase, users: seedUsers, events: seedEvents })
}
