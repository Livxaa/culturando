import jwt from 'jsonwebtoken'
import {
  ForbiddenError,
  UnauthorizedError,
} from '../errors/DomainErrors.js'
import { findUserById } from '../repositories/usersRepository.js'

const JWT_SECRET =
  process.env.JWT_SECRET || 'culturando_super_secret_jwt_key_2026'

export async function authenticateToken(request, _response, next) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError(
        'Token de autenticação necessário.'
      )
    }

    const token = authHeader.substring(7)

    let decoded

    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch {
      throw new UnauthorizedError(
        'Token de autenticação inválido ou expirado.'
      )
    }

    const user = await findUserById(decoded.userId)

    if (!user) {
      throw new UnauthorizedError(
        'Usuário não encontrado.'
      )
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
        throw new UnauthorizedError(
          'Autenticação necessária para acessar este recurso.'
        )
      }

      if (
        request.user.role !== role &&
        request.user.role !== 'admin'
      ) {
        throw new ForbiddenError(
          'Sua conta não possui permissão para esta ação.'
        )
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}