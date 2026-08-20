import 'dotenv/config'
import { runSeed } from '../seeders/001_initial_seed.js'
import { app } from './app.js'

const PORT = Number(process.env.PORT || 3001)

async function startServer() {
  try {
    await runSeed()
  } catch (err) {
    console.warn('[Backend Boot Warning]:', err.message)
  }

  app.listen(PORT, () => {
    console.log(`[Culturando Backend] Servidor rodando em http://localhost:${PORT}`)
    console.log(`[Culturando API REST] Versionada em http://localhost:${PORT}/api/v1`)
  })
}

startServer()
