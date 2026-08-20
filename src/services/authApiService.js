import { httpClient } from './httpClient.js'

export const authService = {
  getSession() {
    try {
      const raw = localStorage.getItem('culturando_session')
      return raw ? JSON.parse(raw) : null
    } catch (_e) {
      return null
    }
  },

  setSession(session, token = null) {
    if (session) {
      localStorage.setItem('culturando_session', JSON.stringify(session))
      if (token) localStorage.setItem('culturando_token', token)
    } else {
      localStorage.removeItem('culturando_session')
      localStorage.removeItem('culturando_token')
    }
  },

  logout() {
    this.setSession(null)
    return httpClient.post('/auth/logout').catch(() => {})
  },

  async register(data) {
    try {
      const result = await httpClient.post('/auth/register', data)
      if (result?.session) {
        this.setSession(result.session, result.token)
      }
      return { ok: true, session: result.session, token: result.token }
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        fieldErrors: error.fields || { email: error.message },
      }
    }
  },

  async authenticate(data) {
    try {
      const result = await httpClient.post('/auth/login', data)
      if (result?.session) {
        this.setSession(result.session, result.token)
      }
      return { ok: true, session: result.session, token: result.token }
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        fieldErrors: error.fields || { email: error.message },
      }
    }
  },
}
