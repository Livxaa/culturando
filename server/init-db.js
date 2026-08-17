import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const { Pool } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

export async function setupDatabase() {
  const host = process.env.PGHOST || 'localhost'
  const port = Number(process.env.PGPORT || 5432)
  const user = process.env.PGUSER || 'postgres'
  const password = process.env.PGPASSWORD || 'postgres'
  const dbName = process.env.PGDATABASE || 'culturando'

  // 1. Conecta no banco padrao "postgres" para garantir que a database "culturando" existe
  const adminPool = new Pool({ host, port, user, password, database: 'postgres' })
  try {
    const res = await adminPool.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName])
    if (res.rowCount === 0) {
      console.log(`[Culturando DB] Criando banco de dados "${dbName}"...`)
      await adminPool.query(`CREATE DATABASE "${dbName}"`)
    }
  } catch (err) {
    console.error('[Culturando DB] Erro ao verificar/criar banco no PostgreSQL:', err.message)
    throw err
  } finally {
    await adminPool.end()
  }

  // 2. Conecta no banco "culturando" e executa schema e seed se as tabelas nao existirem
  const appPool = new Pool({ host, port, user, password, database: dbName })
  try {
    const tableCheck = await appPool.query(
      "SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users'"
    )
    if (tableCheck.rowCount === 0) {
      console.log('[Culturando DB] Tabelas não encontradas. Criando estrutura (schema.sql)...')
      const schemaSql = fs.readFileSync(path.join(projectRoot, 'schema.sql'), 'utf-8')
      await appPool.query(schemaSql)

      console.log('[Culturando DB] Inserindo dados iniciais (seed.sql)...')
      const seedSql = fs.readFileSync(path.join(projectRoot, 'seed.sql'), 'utf-8')
      await appPool.query(seedSql)

      console.log('[Culturando DB] Banco de dados inicializado com sucesso!')
    } else {
      console.log('[Culturando DB] Conectado com sucesso ao banco PostgreSQL!')
    }
  } catch (err) {
    console.error('[Culturando DB] Erro ao executar schema/seed:', err.message)
    throw err
  } finally {
    await appPool.end()
  }
}

if (process.argv[1] === __filename) {
  setupDatabase().catch(() => process.exit(1))
}
