import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import { v1Router } from './routes/v1/index.js'

export const app = express()

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// Versionamento REST em /api/v1 e fallback para /api
app.use('/api/v1', v1Router)
app.use('/api', v1Router)

// Rota 404 para endpoints nao encontrados
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint não encontrado.',
    },
  })
})

// Middleware centralizado de tratamento de erros
app.use(errorHandler)
