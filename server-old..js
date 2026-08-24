const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROTAS DA API ---

// 1. Rota de Eventos e Busca Parametrizada (RF01)
app.get('/api/eventos', (req, res) => {
  const { acessibilidade, busca } = req.query;
  
  // Exemplo de retorno vindo da base de dados
  const eventos = [
    {
      id: 1,
      titulo: "Show Cultural Acessível",
      acessibilidade: ["rampa", "libras"],
      local: "Teatro Central"
    }
  ];

  // Exemplo de filtragem centralizada no Backend
  let resultado = eventos;
  if (acessibilidade) {
    resultado = resultado.filter(e => e.acessibilidade.includes(acessibilidade));
  }

  return res.status(200).json(resultado);
});

// 2. Rota de Upload de Laudos/Documentos (RF02)
app.post('/api/documentos/validar', (req, res) => {
  // A validação pesada e regras de segurança/LGPD ficam centralizadas aqui
  return res.status(200).json({ 
    sucesso: true, 
    mensagem: "Documento enviado e pendente de verificação." 
  });
});

// 3. Rota do Canal de Denúncias (RF05)
app.post('/api/denuncias', (req, res) => {
  const { local, descricao } = req.body;
  if (!local || !descricao) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }
  return res.status(201).json({ mensagem: "Denúncia registrada para moderação." });
});

// --- TRATAMENTO DE ENDPOINT NÃO ENCONTRADO (404) ---
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Endpoint '${req.originalUrl}' não foi encontrado no servidor.`
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});