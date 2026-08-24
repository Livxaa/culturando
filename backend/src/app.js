import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import { v1Router } from './routes/v1/index.js'

export const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use(express.json({ limit: '2mb' }))

// API oficial
app.use('/api/v1', v1Router)

// Endpoint 404
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint não encontrado.',
    },
  })
})

// Tratamento global de erros
app.use(errorHandler)