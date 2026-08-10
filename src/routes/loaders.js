import { events, getEventById } from '../data/events.js'

export function eventsLoader() {
  return events
}

export function featuredEventsLoader() {
  return events.filter((event) => event.featured)
}

export function eventLoader({ params }) {
  const event = getEventById(params.eventId)
  if (!event) {
    throw new Response('Evento não encontrado', { status: 404, statusText: 'Evento não encontrado' })
  }
  return event
}
