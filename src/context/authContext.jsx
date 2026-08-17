import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { authService } from '../services/dataService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession())
  const setPersistentSession = useCallback((nextSession) => {
    authService.setSession(nextSession)
    setSession(nextSession)
  }, [])
  const logout = useCallback(() => {
    authService.logout()
    setSession(null)
  }, [])
  const value = useMemo(() => ({
    session,
    isAuthenticated: Boolean(session?.userId),
    isOrganizer: session?.role === 'organizer',
    isBuyer: session?.role === 'buyer',
    login: setPersistentSession,
    loginOrganizer: setPersistentSession,
    logout,
  }), [session, setPersistentSession, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
