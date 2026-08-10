export const ROUTES = {
  HOME: '/',
  EVENTS: '/shows',
  EVENT_DETAIL: (eventId) => `/shows/${eventId}`,
  LOGIN: '/login',
  REGISTER: '/cadastro',
  CHECKOUT: (eventId) => `/pagamento/${eventId}`,
  ORGANIZER_LOGIN: '/organizador/login',
  ORGANIZER_HOME: '/organizador',
  ORGANIZER_NEW_EVENT: '/organizador/eventos/novo',
  ORGANIZER_ACCESSIBILITY: '/organizador/acessibilidade',
}
