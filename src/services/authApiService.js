import { apiRequest } from './apiClient.js'
import { readStoredSession, writeStoredSession } from './storageService.js'

export const authService = {
  getSession() {
    return readStoredSession()
  },
  setSession(session) {
    return writeStoredSession(session)
  },
  logout() {
    return writeStoredSession(null)
  },
  async register(data) {
    const result = await apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) })
    writeStoredSession(result.session)
    return { ok: true, ...result }
  },
  async authenticate(data) {
    const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) })
    writeStoredSession(result.session)
    return { ok: true, ...result }
  },
}
