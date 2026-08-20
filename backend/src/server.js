const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- AQUI FICA A SUA LISTA DE EVENTOS ---
const listaDeEventos = [
  {
    id: 1,
    titulo: "Show Cultural Inclusivo",
    local: "Teatro Municipal",
    acessibilidade: ["rampa", "libras"],
    descricao: "Espaço com rampas de acesso e intérprete de Libras."
  },
  {
    id: 2,
    titulo: "Exposição de Arte Sensorial",
    local: "Museu de Arte",
    acessibilidade: ["piso_tatil", "descompressao"],
    descricao: "Local adaptado para deficiência visual e salas de descompressão."
  }
];

// Rota da API que entrega a lista para o Frontend
app.get('/api/eventos', (req, res) => {
  const { acessibilidade } = req.query;

  // Se houver filtro enviado pelo usuário
  if (acessibilidade) {
    const eventosFiltrados = listaDeEventos.filter(evento => 
      evento.acessibilidade.includes(acessibilidade)
    );
    return res.status(200).json(eventosFiltrados);
  }

  // Se não houver filtro, retorna a lista completa
  return res.status(200).json(listaDeEventos);
});

app.listen(3001, () => {
  console.log("Servidor e lista de eventos rodando na porta 3001");
});