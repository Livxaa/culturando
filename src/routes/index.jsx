import { createBrowserRouter, Navigate } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout.jsx'
import OrganizerGuard from '../components/organizer/OrganizerGuard.jsx'
import OrganizerLayout from '../components/organizer/OrganizerLayout.jsx'
import RouteErrorPage from '../pages/RouteErrorPage.jsx'
import HomePage from '../pages/home/HomePage.jsx'
import EventsPage from '../pages/events/EventsPage.jsx'
import EventDetailPage from '../pages/events/EventDetailPage.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import CheckoutPage from '../pages/checkout/CheckoutPage.jsx'
import OrganizerLoginPage from '../pages/organizer/OrganizerLoginPage.jsx'
import OrganizerDashboardPage from '../pages/organizer/OrganizerDashboardPage.jsx'
import OrganizerEventPage from '../pages/organizer/OrganizerEventPage.jsx'
import AccessibilityInfoPage from '../pages/organizer/AccessibilityInfoPage.jsx'
import { eventsLoader, featuredEventsLoader, eventLoader } from './loaders.js'
import { checkoutAction, createEventAction, legacyPaymentRedirect, loginAction, organizerLoginAction, registerAction } from './actions.js'

export const router = createBrowserRouter([
  { element: <PublicLayout />, errorElement: <RouteErrorPage />, children: [
    { path: '/', element: <HomePage />, loader: featuredEventsLoader },
    { path: '/shows', element: <EventsPage />, loader: eventsLoader },
    { path: '/shows/:eventId', element: <EventDetailPage />, loader: eventLoader },
    { path: '/login', element: <LoginPage />, action: loginAction },
    { path: '/cadastro', element: <RegisterPage />, action: registerAction },
    { path: '/pagamento', loader: legacyPaymentRedirect },
    { path: '/pagamento/:eventId', element: <CheckoutPage />, loader: eventLoader, action: checkoutAction },
    { path: '/shows_card', element: <Navigate to="/shows" replace /> },
    { path: '/auth', element: <Navigate to="/login" replace /> },
  ] },
  { path: '/organizador/login', element: <OrganizerLoginPage />, action: organizerLoginAction, errorElement: <RouteErrorPage /> },
  { element: <OrganizerGuard />, errorElement: <RouteErrorPage />, children: [{ element: <OrganizerLayout />, children: [
    { path: '/organizador', element: <OrganizerDashboardPage />, loader: eventsLoader },
    { path: '/organizador/eventos/novo', element: <OrganizerEventPage />, action: createEventAction },
    { path: '/organizador/acessibilidade', element: <AccessibilityInfoPage /> },
  ] }] },
])
