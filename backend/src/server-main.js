import 'dotenv/config'
import { app } from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Culturando API rodando na porta ${PORT}`)
  console.log(
    `Health check: http://localhost:${PORT}/api/v1/health`
  )
})