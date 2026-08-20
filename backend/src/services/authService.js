import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { ConflictError, UnauthorizedError } from '../errors/DomainErrors.js'
import { createUser, findUserByEmail } from '../repositories/usersRepository.js'

const JWT_SECRET = process.env.JWT_SECRET || 'culturando_super_secret_jwt_key_2026'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

function hashPassword(password) {
  // Gera hash bcrypt
  return bcrypt.hashSync(password, 10)
}

function verifyPassword(password, hash) {
  // Suporta bcrypt e fallback sha256 do seed original
  if (hash.length === 64) {
    const sha256 = crypto.createHash('sha256').update(password).digest('hex')
    return sha256 === hash
  }
  return bcrypt.compareSync(password, hash)
}

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

export async function registerUser({ role = 'buyer', name, email, password, state }) {
  const existing = await findUserByEmail(email)
  if (existing) {
    throw new ConflictError('Este e-mail já está cadastrado.')
  }

  const passwordHash = hashPassword(password)
  const user = await createUser({ role, name, email, passwordHash, state })
  const token = generateToken(user)

  return {
    token,
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      state: user.state,
    },
    session: {
      userId: user.id,
      role: user.role,
      email: user.email,
      displayName: user.name,
    },
  }
}

export async function loginUser({ email, password, role }) {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new UnauthorizedError('E-mail ou senha inválidos.')
  }

  if (role && user.role !== role && user.role !== 'admin') {
    throw new UnauthorizedError('Sua conta não permite este tipo de acesso.')
  }

  const valid = verifyPassword(password, user.password_hash)
  if (!valid) {
    throw new UnauthorizedError('E-mail ou senha inválidos.')
  }

  const token = generateToken(user)

  return {
    token,
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      state: user.state,
    },
    session: {
      userId: user.id,
      role: user.role,
      email: user.email,
      displayName: user.name,
    },
  }
}
