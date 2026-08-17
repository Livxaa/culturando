import { eventsService as localEventsService } from './eventsService.js'
import { authService as localAuthService } from './authService.js'
import { bookingsService as localBookingsService } from './bookingsService.js'
import { eventsService as postgresEventsService } from './eventsApiService.js'
import { authService as postgresAuthService } from './authApiService.js'
import { bookingsService as postgresBookingsService } from './bookingsApiService.js'

const usePostgres = import.meta.env.VITE_DATA_SOURCE === 'postgres'

async function choose(apiOperation, localOperation) {
  if (!usePostgres) return localOperation()
  try {
    return await apiOperation()
  } catch (error) {
    if (error?.status) throw error
    if (import.meta.env.DEV) return localOperation()
    throw error
  }
}

export const dataSource = usePostgres ? 'postgres' : 'local'

export const eventsService = {
  list(options = {}) {
    return choose(() => postgresEventsService.list(options), () => localEventsService.list(options))
  },
  listFeatured() {
    return choose(() => postgresEventsService.listFeatured(), () => localEventsService.listFeatured())
  },
  getById(eventId) {
    return choose(() => postgresEventsService.getById(eventId), () => localEventsService.getById(eventId))
  },
  create(data) {
    return choose(() => postgresEventsService.create(data), () => localEventsService.create(data))
  },
  update(eventId, changes) {
    return choose(() => postgresEventsService.update(eventId, changes), () => localEventsService.update(eventId, changes))
  },
  remove(eventId) {
    return choose(() => postgresEventsService.remove(eventId), () => localEventsService.remove(eventId))
  },
}

export const authService = {
  getSession() {
    return usePostgres ? postgresAuthService.getSession() : localAuthService.getSession()
  },
  setSession(session) {
    return usePostgres ? postgresAuthService.setSession(session) : localAuthService.setSession(session)
  },
  logout() {
    return usePostgres ? postgresAuthService.logout() : localAuthService.logout()
  },
  register(data) {
    return choose(() => postgresAuthService.register(data), () => localAuthService.register(data))
  },
  authenticate(data) {
    return choose(() => postgresAuthService.authenticate(data), () => localAuthService.authenticate(data))
  },
}

export const bookingsService = {
  list(options = {}) {
    return choose(() => postgresBookingsService.list(options), () => localBookingsService.list(options))
  },
  getById(bookingId) {
    return choose(() => postgresBookingsService.getById(bookingId), () => localBookingsService.getById(bookingId))
  },
  create(data) {
    return choose(() => postgresBookingsService.create(data), () => localBookingsService.create(data))
  },
  cancel(bookingId) {
    return choose(() => postgresBookingsService.cancel(bookingId), () => localBookingsService.cancel(bookingId))
  },
}
