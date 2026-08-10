import { createBrowserRouter, redirect } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import HomePage from '../pages/home/HomePage'
import EventsPage from '../pages/events/EventsPage'
import EventDetailPage from '../pages/events/EventDetailPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import CheckoutPage from '../pages/checkout/CheckoutPage'
import OrganizerLoginPage from '../pages/organizer/OrganizerLoginPage'
import OrganizerDashboardPage from '../pages/organizer/OrganizerDashboardPage'
import OrganizerEventPage from '../pages/organizer/OrganizerEventPage'
import AccessibilityInfoPage from '../pages/organizer/AccessibilityInfoPage'
import OrganizerGuard from '../components/organizer/OrganizerGuard'
import OrganizerLayout from '../components/organizer/OrganizerLayout'
import RouteErrorPage from '../pages/RouteErrorPage'
import { events } from '../data/events'
import { ROUTES } from '../data/routes'
import { homeLoader, eventsLoader, eventLoader } from './loaders'
import { checkoutAction, loginAction, registerAction, organizerEventAction, organizerLoginAction } from './actions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: 'shows', element: <EventsPage />, loader: eventsLoader },
      { path: 'shows/:eventId', element: <EventDetailPage />, loader: eventLoader },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'cadastro', element: <RegisterPage />, action: registerAction },
      { path: 'pagamento/:eventId', element: <CheckoutPage />, loader: eventLoader, action: checkoutAction },
      { path: 'pagamento', loader: () => redirect(ROUTES.CHECKOUT(events[0].id)) },
      { path: 'organizador/login', element: <OrganizerLoginPage />, action: organizerLoginAction },
      {
        element: <OrganizerGuard />,
        children: [
          {
            element: <OrganizerLayout />,
            children: [
              { path: 'organizador', element: <OrganizerDashboardPage /> },
              { path: 'organizador/eventos/novo', element: <OrganizerEventPage />, action: organizerEventAction },
              { path: 'organizador/acessibilidade', element: <AccessibilityInfoPage /> },
            ],
          },
        ],
      },
      { path: 'shows_card', loader: () => redirect(ROUTES.EVENTS) },
      { path: 'auth', loader: () => redirect(ROUTES.LOGIN) },
    ],
  },
])

export default router
