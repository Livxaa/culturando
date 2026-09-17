import { getDatabase, updateDatabase } from './mockDatabaseService.js'

const createId = () => `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
const clone = (value) => JSON.parse(JSON.stringify(value))

const generateValidationCode = () => `CULT-2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

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
    const validationCode = generateValidationCode()
    const paymentMethod = data.paymentMethod || 'pix'
    const buyerEmail = data.buyerEmail || 'comprador@culturando.com.br'
    const booking = {
      id: createId(),
      ...data,
      paymentMethod,
      validationCode,
      status: 'confirmado (pago)',
      createdAt: new Date().toISOString(),
      emailSentLog: `Confirmação de pagamento enviada com sucesso para ${buyerEmail} (Serviço Mailtrap/Sandbox).`,
    }
    updateDatabase((database) => ({ ...database, bookings: [booking, ...database.bookings] }))
    return clone(booking)
  },

  cancel(bookingId) {
    let cancelled = null
    updateDatabase((database) => ({ ...database, bookings: database.bookings.map((booking) => { if (booking.id !== bookingId) return booking; cancelled = { ...booking, status: 'cancelado' }; return cancelled }) }))
    return cancelled ? clone(cancelled) : null
  },
}
