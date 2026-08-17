import { fallbackEventImage } from '../data/events.js'
import { updateDatabase, getDatabase } from './mockDatabaseService.js'

const slugify = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const clone = (value) => JSON.parse(JSON.stringify(value))

export const eventsService = {
  list({ organizerId } = {}) {
    const events = getDatabase().events
    return clone(organizerId ? events.filter((event) => event.organizerId === organizerId) : events)
  },

  listFeatured() {
    return clone(getDatabase().events.filter((event) => event.featured && !event.soldOut))
  },

  getById(eventId) {
    const event = getDatabase().events.find((item) => item.id === eventId)
    return event ? clone(event) : null
  },

  create(data) {
    const baseId = slugify(data.title) || 'evento-cultural'
    const current = getDatabase().events
    let id = baseId
    let suffix = 2
    while (current.some((event) => event.id === id)) id = `${baseId}-${suffix++}`
    const event = {
      id,
      organizerId: data.organizerId,
      title: data.title,
      category: data.category || 'Evento cultural',
      date: data.date,
      location: data.location,
      description: data.description,
      image: fallbackEventImage,
      fallbackImage: fallbackEventImage,
      imageAlt: data.imageAlt || `Foto principal enviada para o evento ${data.title}.`,
      coverImage: data.coverImage,
      ticketPrices: { inteira: Number(data.price), meia: Number(data.price) / 2, pcd: Number(data.price) / 2 },
      featured: false,
      soldOut: false,
      accessibility: {
        groups: data.accessibilityGroups,
        resources: data.assistiveResources.split('\n').map((item) => item.trim()).filter(Boolean),
        onsiteSupport: data.onsiteSupport,
      },
      createdAt: new Date().toISOString(),
    }
    updateDatabase((database) => ({ ...database, events: [event, ...database.events] }))
    return clone(event)
  },

  update(eventId, changes) {
    let updated = null
    updateDatabase((database) => ({
      ...database,
      events: database.events.map((event) => {
        if (event.id !== eventId) return event
        const nextAccessibility = {
          ...event.accessibility,
          ...(changes.accessibilityGroups ? { groups: changes.accessibilityGroups } : {}),
          ...(changes.assistiveResources ? { resources: changes.assistiveResources } : {}),
          ...(changes.onsiteSupport ? { onsiteSupport: changes.onsiteSupport } : {}),
        }
        updated = {
          ...event,
          ...changes,
          ...(changes.price !== undefined ? { ticketPrices: { inteira: Number(changes.price), meia: Number(changes.price) / 2, pcd: Number(changes.price) / 2 } } : {}),
          ...(changes.accessibilityGroups || changes.assistiveResources || changes.onsiteSupport ? { accessibility: nextAccessibility } : {}),
          updatedAt: new Date().toISOString(),
        }
        delete updated.price
        delete updated.accessibilityGroups
        delete updated.assistiveResources
        delete updated.onsiteSupport
        return updated
      }),
    }))
    return updated ? clone(updated) : null
  },

  remove(eventId) {
    const database = getDatabase()
    if (database.bookings.some((booking) => booking.eventId === eventId)) throw new Error('Não é possível excluir este evento porque existem ingressos vinculados.')
    const before = database.events.length
    updateDatabase((current) => ({ ...current, events: current.events.filter((event) => event.id !== eventId) }))
    return getDatabase().events.length < before
  },
}
