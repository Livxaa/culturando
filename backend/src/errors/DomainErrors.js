export class DomainError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR', fields = null) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.fields = fields
  }
}

export class ValidationError extends DomainError {
  constructor(message = 'Dados inválidos.', fields = null) {
    super(message, 422, 'VALIDATION_ERROR', fields)
  }
}

export class NotFoundError extends DomainError {
  constructor(message = 'Recurso não encontrado.') {
    super(message, 404, 'NOT_FOUND')
  }
}

export class ConflictError extends DomainError {
  constructor(message = 'Conflito de registro.') {
    super(message, 409, 'CONFLICT')
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Usuário não autenticado ou credenciais inválidas.') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = 'Acesso negado para esta operação.') {
    super(message, 403, 'FORBIDDEN')
  }
}
