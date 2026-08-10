import { events, getEventById } from '../data/events'

export function homeLoader() {
  return { featuredEvents: events.filter((event) => event.featured) }
}

export function eventsLoader() {
  return { events }
}

export function eventLoader({ params }) {
  const event = getEventById(params.eventId)

  if (!event) {
    throw new Response('Evento não encontrado', { status: 404, statusText: 'Evento não encontrado' })
  }

  return event
}
