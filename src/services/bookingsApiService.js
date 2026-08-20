import { httpClient } from './httpClient.js'

export const bookingsService = {
  async list(options = {}) {
    return httpClient.get('/bookings', { params: options })
  },

  async getById(bookingId) {
    return httpClient.get(`/orders/${bookingId}`)
  },

  async create(data) {
    return httpClient.post('/orders', data)
  },

  async cancel(bookingId) {
    return httpClient.patch(`/orders/${bookingId}/cancel`)
  },
}
