import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const { Pool } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

export async function runSeed() {
  const host = process.env.PGHOST || 'localhost'
  const port = Number(process.env.PGPORT || 5432)
  const user = process.env.PGUSER || 'postgres'
  const password = process.env.PGPASSWORD || 'postgres'
  const dbName = process.env.PGDATABASE || 'culturando'

  // 1. Garante que o banco "culturando" existe
  const adminPool = new Pool({ host, port, user, password, database: 'postgres' })
  try {
    const dbRes = await adminPool.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName])
    if (dbRes.rowCount === 0) {
      console.log(`[Seed] Criando banco de dados "${dbName}"...`)
      await adminPool.query(`CREATE DATABASE "${dbName}"`)
    }
  } catch (err) {
    console.error('[Seed Error Admin]:', err.message)
  } finally {
    await adminPool.end()
  }

  // 2. Conecta ao banco culturando e executa schema + seed
  const pool = new Pool({ host, port, user, password, database: dbName })
  try {
    const schemaSql = fs.readFileSync(path.join(projectRoot, 'migrations', '001_initial_schema.sql'), 'utf-8')
    await pool.query(schemaSql)

    const seedSql = fs.readFileSync(path.join(projectRoot, '..', 'seed.sql'), 'utf-8')
    await pool.query(seedSql)

    console.log('[Seed] Migrações e dados iniciais aplicados com sucesso!')
  } catch (err) {
    console.error('[Seed Error App]:', err.message)
  } finally {
    await pool.end()
  }
}

if (process.argv[1] === __filename) {
  runSeed()
}
