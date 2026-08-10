export const ROUTES = {
  HOME: '/',
  EVENTS: '/shows',
  EVENT_DETAIL: (eventId) => `/shows/${eventId}`,
  LOGIN: '/login',
  REGISTER: '/cadastro',
  CHECKOUT: (eventId) => `/pagamento/${eventId}`,
  ORGANIZER_LOGIN: '/organizador/login',
  ORGANIZER_DASHBOARD: '/organizador',
  ORGANIZER_NEW_EVENT: '/organizador/eventos/novo',
  ORGANIZER_ACCESSIBILITY: '/organizador/acessibilidade',
}

export const TICKET_TYPES = ['inteira', 'meia', 'pcd']
export const ACCESSIBILITY_GROUPS = ['fisica', 'auditiva', 'visual', 'neurodivergente']
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']
export const MAX_IMAGE_SIZE = 8 * 1024 * 1024
export const ORGANIZER_SESSION_KEY = 'culturando-organizer-session'
