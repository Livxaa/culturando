import { NotFoundError, ValidationError } from '../errors/DomainErrors.js'
import { findEventBySlugOrId } from '../repositories/eventsRepository.js'
import * as ordersRepo from '../repositories/ordersRepository.js'

export async function createOrder({ userId = null, eventId, ticketType, quantity }) {
  const event = await findEventBySlugOrId(eventId)
  if (!event) {
    throw new NotFoundError('Evento não encontrado para registrar o ingresso.')
  }

  const basePrice = event.price
  let unitPrice = basePrice

  if (ticketType === 'meia') {
    unitPrice = Number((basePrice / 2).toFixed(2))
  } else if (ticketType === 'pcd') {
    unitPrice = 0
  } else if (ticketType !== 'inteira') {
    throw new ValidationError('Tipo de ingresso inválido.')
  }

  const total = Number((unitPrice * quantity).toFixed(2))

  const order = await ordersRepo.createOrder({
    userId,
    eventId: event.id,
    ticketType,
    quantity,
    unitPrice,
    total,
  })

  return order
}

export async function getOrderById(id, userId = null) {
  const order = await ordersRepo.findOrderById(id, userId)
  if (!order) {
    throw new NotFoundError('Pedido não encontrado.')
  }
  return order
}

export async function getUserOrders(userId) {
  return ordersRepo.listOrdersByUserId(userId)
}
