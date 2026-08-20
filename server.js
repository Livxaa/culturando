import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração da conexão com o PostgreSQL usando as variáveis do seu .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
});

// Testar conexão com o banco de dados
pool.connect()
  .then(() => console.log('✅ Conectado ao banco de dados PostgreSQL!'))
  .catch((err) => console.error('❌ Erro de conexão com o banco:', err));

// ==========================================
// ENDPOINTS / ROTAS DA API
// ==========================================

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API rodando perfeitamente!' });
});

// Exemplo: Buscar dados de uma tabela no banco (ex: usuarios ou a tabela citada no docs/postgres.md)
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Exemplo: Inserir novos dados no banco
app.post('/api/usuarios', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Iniciar o servidor na porta definida no .env (3001)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} (http://localhost:${PORT})`);
});