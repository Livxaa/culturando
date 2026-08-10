import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { ROUTES } from '../../data/routes'

export default function OrganizerGuard() {
  const { isOrganizer } = useAuth()
  const location = useLocation()

  if (!isOrganizer) {
    return <Navigate to={ROUTES.ORGANIZER_LOGIN} replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
