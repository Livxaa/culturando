const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function getStoredSession() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem('culturando-auth-session-v1')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function apiRequest(path, options = {}) {
  const session = getStoredSession()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(session?.userId ? { 'x-user-id': session.userId } : {}),
      ...options.headers,
    },
  })
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  if (!response.ok) throw new ApiError(data?.message || 'Não foi possível concluir a operação.', response.status)
  return data
}
