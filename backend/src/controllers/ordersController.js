import * as ordersService from '../services/ordersService.js'
import { validateCreateOrder } from '../validators/schemas.js'

export async function createOrder(request, response, next) {
  try {
    validateCreateOrder(request.body)
    const userId = request.user ? request.user.id : request.headers['x-user-id'] || null
    const order = await ordersService.createOrder({
      ...request.body,
      userId,
    })
    return response.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

export async function getOrder(request, response, next) {
  try {
    const userId = request.user ? request.user.id : null
    const order = await ordersService.getOrderById(request.params.id, userId)
    return response.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

export async function listUserOrders(request, response, next) {
  try {
    const userId = request.user ? request.user.id : request.headers['x-user-id']
    const orders = await ordersService.getUserOrders(userId)
    return response.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}
