import { ForbiddenError, NotFoundError } from '../errors/DomainErrors.js'
import * as eventsRepo from '../repositories/eventsRepository.js'

export async function getEvents(filters = {}) {
  return eventsRepo.listEvents(filters)
}

export async function getEventBySlugOrId(slugOrId) {
  const event = await eventsRepo.findEventBySlugOrId(slugOrId)
  if (!event) {
    throw new NotFoundError('Evento não encontrado.')
  }
  return event
}

export async function createEvent(data, organizerId) {
  return eventsRepo.createEvent({
    ...data,
    organizerId,
  })
}

export async function updateEvent(slugOrId, organizerId, changes) {
  const existing = await eventsRepo.findEventBySlugOrId(slugOrId)
  if (!existing) {
    throw new NotFoundError('Evento não encontrado.')
  }

  if (existing.organizerId !== organizerId) {
    throw new ForbiddenError('Você não tem permissão para alterar este evento.')
  }

  const updated = await eventsRepo.updateEventBySlugOrId(slugOrId, organizerId, changes)
  return updated
}

export async function deleteEvent(slugOrId, organizerId) {
  const existing = await eventsRepo.findEventBySlugOrId(slugOrId)
  if (!existing) {
    throw new NotFoundError('Evento não encontrado.')
  }

  if (existing.organizerId !== organizerId) {
    throw new ForbiddenError('Você não tem permissão para excluir este evento.')
  }

  const removed = await eventsRepo.deleteEventBySlugOrId(slugOrId, organizerId)
  if (!removed) {
    throw new Error('Não foi possível excluir o evento.')
  }
  return true
}
