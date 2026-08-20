const BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api/v1'

export async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const token = localStorage.getItem('culturando_token')
  const sessionStr = localStorage.getItem('culturando_session')
  let session = null
  try {
    session = sessionStr ? JSON.parse(sessionStr) : null
  } catch (_e) {
    session = null
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  if (session?.userId) {
    headers['x-user-id'] = session.userId
  }

  const config = {
    ...options,
    headers,
  }

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(url, config)

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(data?.error?.message || data?.message || 'Erro na requisição à API.')
    error.status = response.status
    error.code = data?.error?.code
    error.fields = data?.error?.fields
    throw error
  }

  return data
}

export const httpClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}
