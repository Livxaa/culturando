import * as eventsService from '../services/eventsService.js'
import { validateCreateEvent } from '../validators/schemas.js'

export async function listEvents(request, response, next) {
  try {
    const filters = {
      featured: request.query.featured === 'true',
      organizerId: request.query.organizerId || null,
      category: request.query.category || null,
    }
    const events = await eventsService.getEvents(filters)
    return response.status(200).json(events)
  } catch (error) {
    next(error)
  }
}

export async function getEvent(request, response, next) {
  try {
    const event = await eventsService.getEventBySlugOrId(request.params.id)
    return response.status(200).json(event)
  } catch (error) {
    next(error)
  }
}

export async function createEvent(request, response, next) {
  try {
    validateCreateEvent(request.body)
    const organizerId = request.user ? request.user.id : request.headers['x-user-id']
    const event = await eventsService.createEvent(request.body, organizerId)
    return response.status(201).json(event)
  } catch (error) {
    next(error)
  }
}

export async function updateEvent(request, response, next) {
  try {
    const organizerId = request.user ? request.user.id : request.headers['x-user-id']
    const updated = await eventsService.updateEvent(request.params.id, organizerId, request.body)
    return response.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

export async function deleteEvent(request, response, next) {
  try {
    const organizerId = request.user ? request.user.id : request.headers['x-user-id']
    await eventsService.deleteEvent(request.params.id, organizerId)
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
}

export async function listOrganizerEvents(request, response, next) {
  try {
    const organizerId = request.user ? request.user.id : request.headers['x-user-id']
    const events = await eventsService.getEvents({ organizerId })
    return response.status(200).json(events)
  } catch (error) {
    next(error)
  }
}
