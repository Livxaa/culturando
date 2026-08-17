import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { apiRouter } from './api.js'
import { setupDatabase } from './init-db.js'

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use('/api', apiRouter)

async function start() {
  try {
    await setupDatabase()
  } catch (err) {
    console.warn('[Culturando API] Aviso ao conectar/inicializar PostgreSQL:', err.message)
  }

  app.listen(port, () => {
    console.log(`API Culturando disponível em http://localhost:${port}/api`)
    console.log('Banco esperado: PostgreSQL em localhost:5432')
  })
}

start()

