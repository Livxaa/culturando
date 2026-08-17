import { redirect } from 'react-router-dom'
import { authService, bookingsService, eventsService } from '../services/dataService.js'

export function eventsLoader() {
  return eventsService.list()
}

export function featuredEventsLoader() {
  return eventsService.listFeatured()
}

export async function eventLoader({ params }) {
  const event = await eventsService.getById(params.eventId)
  if (!event) throw new Response('Evento não encontrado', { status: 404, statusText: 'Evento não encontrado' })
  return event
}

export async function organizerEventsLoader() {
  const session = authService.getSession()
  if (session?.role !== 'organizer') throw redirect('/organizador/login')
  return eventsService.list({ organizerId: session.userId })
}

export async function organizerEventLoader({ params }) {
  const session = authService.getSession()
  if (session?.role !== 'organizer') throw redirect('/organizador/login')
  const event = await eventsService.getById(params.eventId)
  if (!event || event.organizerId !== session.userId) throw new Response('Evento não encontrado', { status: 404, statusText: 'Evento não encontrado' })
  return event
}

export async function bookingsLoader() {
  const session = authService.getSession()
  return session?.userId ? bookingsService.list({ userId: session.userId }) : []
}
