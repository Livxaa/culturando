import crypto from 'node:crypto'
import { DomainError } from '../errors/DomainErrors.js'

export function errorHandler(error, _request, response, _next) {
  const requestId = crypto.randomUUID ? crypto.randomUUID() : String(Date.now())

  if (error instanceof DomainError) {
    const errorBody = {
      code: error.code,
      message: error.message,
    }
    if (error.fields) {
      errorBody.fields = error.fields
    }
    errorBody.requestId = requestId

    return response.status(error.status).json({ error: errorBody })
  }

  // Tratamento de erros do Postgres de unicidade ou chave estrangeira
  if (error.code === '23505') {
    return response.status(409).json({
      error: {
        code: 'CONFLICT',
        message: 'Este registro já existe.',
        requestId,
      },
    })
  }

  if (error.code === '23503') {
    return response.status(409).json({
      error: {
        code: 'CONFLICT',
        message: 'Não é possível concluir a operação porque existem registros vinculados.',
        requestId,
      },
    })
  }

  console.error('[Culturando Backend Error]', error)
  return response.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Falha inesperada no servidor.',
      requestId,
    },
  })
}
