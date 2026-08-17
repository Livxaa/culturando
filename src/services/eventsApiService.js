import { apiRequest } from './apiClient.js'
import { fallbackEventImage } from '../data/events.js'

const withFallbackImage = (event) => event ? { ...event, fallbackImage: event.fallbackImage || fallbackEventImage, image: event.image || fallbackEventImage } : event
const slugify = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const eventsService = {
  list({ organizerId } = {}) {
    const query = organizerId ? `?organizerId=${encodeURIComponent(organizerId)}` : ''
    return apiRequest(`/events${query}`).then((events) => events.map(withFallbackImage))
  },
  listFeatured() {
    return apiRequest('/events?featured=true').then((events) => events.map(withFallbackImage))
  },
  getById(eventId) {
    return apiRequest(`/events/${encodeURIComponent(eventId)}`).then(withFallbackImage)
  },
  create(data) {
    return apiRequest('/events', { method: 'POST', body: JSON.stringify({ ...data, slug: slugify(data.title) }) })
  },
  update(eventId, changes) {
    return apiRequest(`/events/${encodeURIComponent(eventId)}`, { method: 'PATCH', body: JSON.stringify(changes) })
  },
  remove(eventId) {
    return apiRequest(`/events/${encodeURIComponent(eventId)}`, { method: 'DELETE' }).then(() => true)
  },
}
