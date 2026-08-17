import crypto from 'node:crypto'
import { Router } from 'express'
import { cancelBooking, createBooking, findBookingById, listBookings } from './repositories/bookingsRepository.js'
import { createEvent, deleteEventBySlug, findEventBySlug, listEvents, updateEventBySlug } from './repositories/eventsRepository.js'
import { createUser, findUserByEmail, findUserById } from './repositories/usersRepository.js'

export const apiRouter = Router()

const hashPassword = (value) => crypto.createHash('sha256').update(value).digest('hex')
const sessionFromUser = (user) => ({ userId: user.id, role: user.role, email: user.email, displayName: user.name })
const getRequestUser = async (request) => request.headers['x-user-id'] ? findUserById(request.headers['x-user-id']) : null
const requireRole = (role) => async (request, response, next) => {
  try {
    const user = await getRequestUser(request)
    if (!user || user.role !== role) return response.status(401).json({ message: 'Sua sessão não permite esta ação.' })
    request.user = user
    next()
  } catch (error) { next(error) }
}

apiRouter.get('/health', async (_request, response, next) => {
  try { await listEvents(); response.json({ ok: true, database: 'conectado' }) } catch (error) { next(error) }
})

apiRouter.post('/auth/login', async (request, response, next) => {
  try {
    const { email, password, role = 'buyer' } = request.body
    const user = await findUserByEmail(email || '')
    if (!user || user.role !== role || user.password_hash !== hashPassword(password || '')) return response.status(401).json({ message: 'E-mail ou senha inválidos.' })
    response.json({ user: { id: user.id, role: user.role, name: user.name, email: user.email, state: user.state }, session: sessionFromUser(user) })
  } catch (error) { next(error) }
})

apiRouter.post('/auth/register', async (request, response, next) => {
  try {
    const { name, email, password, state } = request.body
    if (await findUserByEmail(email || '')) return response.status(409).json({ message: 'Este e-mail já está cadastrado.' })
    const user = await createUser({ role: 'buyer', name, email, passwordHash: hashPassword(password), state })
    response.status(201).json({ user, session: sessionFromUser(user) })
  } catch (error) { next(error) }
})

apiRouter.get('/events', async (request, response, next) => {
  try { response.json(await listEvents({ featured: request.query.featured === 'true', organizerId: request.query.organizerId || null })) } catch (error) { next(error) }
})

apiRouter.get('/events/:slug', async (request, response, next) => {
  try { const event = await findEventBySlug(request.params.slug); if (!event) return response.status(404).json({ message: 'Evento não encontrado.' }); response.json(event) } catch (error) { next(error) }
})

apiRouter.post('/events', requireRole('organizer'), async (request, response, next) => {
  try { response.status(201).json(await createEvent({ ...request.body, organizerId: request.user.id })) } catch (error) { next(error) }
})

apiRouter.patch('/events/:slug', requireRole('organizer'), async (request, response, next) => {
  try { const event = await updateEventBySlug(request.params.slug, request.user.id, request.body); if (!event) return response.status(404).json({ message: 'Evento não encontrado ou sem permissão.' }); response.json(event) } catch (error) { next(error) }
})

apiRouter.delete('/events/:slug', requireRole('organizer'), async (request, response, next) => {
  try { const removed = await deleteEventBySlug(request.params.slug, request.user.id); if (!removed) return response.status(404).json({ message: 'Evento não encontrado ou sem permissão.' }); response.status(204).end() } catch (error) { next(error) }
})

apiRouter.get('/bookings', requireRole('buyer'), async (request, response, next) => {
  try { response.json(await listBookings({ userId: request.user.id })) } catch (error) { next(error) }
})

apiRouter.get('/bookings/:id', requireRole('buyer'), async (request, response, next) => {
  try { const booking = await findBookingById(request.params.id, request.user.id); if (!booking) return response.status(404).json({ message: 'Ingresso não encontrado.' }); response.json(booking) } catch (error) { next(error) }
})

apiRouter.patch('/bookings/:id/cancel', requireRole('buyer'), async (request, response, next) => {
  try { const booking = await cancelBooking(request.params.id, request.user.id); if (!booking) return response.status(404).json({ message: 'Ingresso não encontrado.' }); response.json(booking) } catch (error) { next(error) }
})

apiRouter.post('/bookings', async (request, response, next) => {
  try {
    const user = await getRequestUser(request)
    const booking = await createBooking({ ...request.body, buyerId: user?.role === 'buyer' ? user.id : null })
    if (!booking) return response.status(400).json({ message: 'Não foi possível registrar este ingresso.' })
    response.status(201).json(booking)
  } catch (error) { next(error) }
})

apiRouter.use((error, _request, response, _next) => {
  console.error('[Culturando API]', error)
  const status = error.code === '23505' || error.code === '23503' ? 409 : 500
  const message = error.code === '23505' ? 'Este registro já existe.' : error.code === '23503' ? 'Não é possível excluir este evento porque existem ingressos vinculados.' : 'Não foi possível concluir a operação no banco de dados.'
  response.status(status).json({ message })
})
