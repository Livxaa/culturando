import { Router } from 'express'
import * as authController from '../../controllers/authController.js'
import * as eventsController from '../../controllers/eventsController.js'
import * as ordersController from '../../controllers/ordersController.js'
import { authenticateToken, requireRole } from '../../middlewares/authMiddleware.js'
import * as eventsRepo from '../../repositories/eventsRepository.js'

export const v1Router = Router()

// Health check
v1Router.get('/health', async (_req, res, next) => {
  try {
    await eventsRepo.listEvents()
    return res.status(200).json({ ok: true, database: 'conectado' })
  } catch (error) {
    next(error)
  }
})

// Autenticação
v1Router.post('/auth/register', authController.register)
v1Router.post('/auth/login', authController.login)
v1Router.post('/auth/refresh', authController.refresh)
v1Router.post('/auth/logout', authController.logout)

// Eventos
v1Router.get('/events', eventsController.listEvents)
v1Router.get('/events/:id', eventsController.getEvent)
v1Router.post('/events', authenticateToken, requireRole('organizer'), eventsController.createEvent)
v1Router.patch('/events/:id', authenticateToken, requireRole('organizer'), eventsController.updateEvent)
v1Router.delete('/events/:id', authenticateToken, requireRole('organizer'), eventsController.deleteEvent)

// Organizador
v1Router.get('/organizer/events', authenticateToken, requireRole('organizer'), eventsController.listOrganizerEvents)

// Pedidos
v1Router.post('/orders', authenticateToken, ordersController.createOrder)
v1Router.get('/orders/:id', authenticateToken, ordersController.getOrder)
v1Router.get('/bookings', authenticateToken, ordersController.listUserOrders)
