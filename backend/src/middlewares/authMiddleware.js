import jwt from 'jsonwebtoken'
import { ForbiddenError, UnauthorizedError } from '../errors/DomainErrors.js'
import { findUserById } from '../repositories/usersRepository.js'

const JWT_SECRET = process.env.JWT_SECRET || 'culturando_super_secret_jwt_key_2026'

export async function authenticateToken(request, _response, next) {
  try {
    const authHeader = request.headers['authorization']
    const userIdHeader = request.headers['x-user-id']

    let user = null

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        user = await findUserById(decoded.userId)
      } catch (_err) {
        throw new UnauthorizedError('Token de autenticação inválido ou expirado.')
      }
    } else if (userIdHeader) {
      user = await findUserById(userIdHeader)
    }

    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export function requireRole(role) {
  return async (request, _response, next) => {
    try {
      if (!request.user) {
        throw new UnauthorizedError('Autenticação necessária para acessar este recurso.')
      }
      if (request.user.role !== role && request.user.role !== 'admin') {
        throw new ForbiddenError('Sua conta não possui permissão para esta ação.')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
