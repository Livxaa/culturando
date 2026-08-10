import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const ORGANIZER_SESSION_KEY = 'culturando-organizer-session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(ORGANIZER_SESSION_KEY)) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user?.role === 'organizer') {
      sessionStorage.setItem(ORGANIZER_SESSION_KEY, JSON.stringify(user))
    } else {
      sessionStorage.removeItem(ORGANIZER_SESSION_KEY)
    }
  }, [user])

  const value = useMemo(() => ({
    user,
    isOrganizer: user?.role === 'organizer',
    signIn: setUser,
    signOut: () => setUser(null),
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  }

  return context
}
