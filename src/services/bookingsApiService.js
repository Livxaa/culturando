import { httpClient } from './httpClient.js'

export const bookingsService = {
  async list() {
    return httpClient.get('/bookings')
  },

  async getById(bookingId) {
    return httpClient.get(`/orders/${bookingId}`)
  },

  async create(data) {
    return httpClient.post('/orders', data)
  },
}