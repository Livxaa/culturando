import * as authService from '../services/authService.js'
import { validateLogin, validateRegister } from '../validators/schemas.js'

export async function register(request, response, next) {
  try {
    validateRegister(request.body)
    const result = await authService.registerUser(request.body)
    return response.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export async function login(request, response, next) {
  try {
    validateLogin(request.body)
    const result = await authService.loginUser(request.body)
    return response.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export async function refresh(_request, response, _next) {
  return response.status(200).json({ ok: true, message: 'Token renovado.' })
}

export async function logout(_request, response, _next) {
  return response.status(204).end()
}
