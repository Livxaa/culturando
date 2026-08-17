import { apiRequest } from './apiClient.js'

export const bookingsService = {
  list() {
    return apiRequest('/bookings')
  },
  getById(bookingId) {
    return apiRequest(`/bookings/${encodeURIComponent(bookingId)}`)
  },
  create(data) {
    return apiRequest('/bookings', { method: 'POST', body: JSON.stringify(data) })
  },
  cancel(bookingId) {
    return apiRequest(`/bookings/${encodeURIComponent(bookingId)}/cancel`, { method: 'PATCH' })
  },
}
