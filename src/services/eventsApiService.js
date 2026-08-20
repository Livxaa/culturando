import { httpClient } from './httpClient.js'

export const eventsService = {
  async list(options = {}) {
    const query = new URLSearchParams()
    if (options.featured) query.set('featured', 'true')
    if (options.organizerId) query.set('organizerId', options.organizerId)
    if (options.category) query.set('category', options.category)

    const qs = query.toString()
    const endpoint = `/events${qs ? `?${qs}` : ''}`
    return httpClient.get(endpoint)
  },

  async listFeatured() {
    return this.list({ featured: true })
  },

  async getById(eventId) {
    try {
      return await httpClient.get(`/events/${eventId}`)
    } catch (_error) {
      return null
    }
  },

  async create(data) {
    return httpClient.post('/events', data)
  },

  async update(eventId, changes) {
    return httpClient.patch(`/events/${eventId}`, changes)
  },

  async remove(eventId) {
    await httpClient.delete(`/events/${eventId}`)
    return true
  },
}
