import { getDatabase, updateDatabase } from './mockDatabaseService.js'

const createId = () => `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
const clone = (value) => JSON.parse(JSON.stringify(value))

export const bookingsService = {
  list({ userId } = {}) {
    const bookings = getDatabase().bookings
    return clone(userId ? bookings.filter((booking) => booking.userId === userId) : bookings)
  },

  getById(bookingId) {
    const booking = getDatabase().bookings.find((item) => item.id === bookingId)
    return booking ? clone(booking) : null
  },

  create(data) {
    const booking = { id: createId(), ...data, status: 'confirmado', createdAt: new Date().toISOString() }
    updateDatabase((database) => ({ ...database, bookings: [booking, ...database.bookings] }))
    return clone(booking)
  },

  cancel(bookingId) {
    let cancelled = null
    updateDatabase((database) => ({ ...database, bookings: database.bookings.map((booking) => { if (booking.id !== bookingId) return booking; cancelled = { ...booking, status: 'cancelado' }; return cancelled }) }))
    return cancelled ? clone(cancelled) : null
  },
}
