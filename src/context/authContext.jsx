import { createContext, useContext, useMemo, useState } from 'react'
import { ORGANIZER_SESSION_KEY } from '../data/routes.js'

const AuthContext = createContext(null)

function readOrganizerSession() {
  if (typeof window === 'undefined') return null
  try {
    const value = window.sessionStorage.getItem(ORGANIZER_SESSION_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readOrganizerSession)

  const value = useMemo(() => ({
    session,
    isOrganizer: session?.role === 'organizer',
    loginOrganizer(nextSession) {
      setSession(nextSession)
      window.sessionStorage.setItem(ORGANIZER_SESSION_KEY, JSON.stringify(nextSession))
    },
    logout() {
      setSession(null)
      window.sessionStorage.removeItem(ORGANIZER_SESSION_KEY)
    },
  }), [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
