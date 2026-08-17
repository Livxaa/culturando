import fallbackLogo from '../assets/img/logo.png'

const images = {
  festival: 'https://images.unsplash.com/photo-1729553199933-c897fea4f41f?auto=format&fit=crop&w=1200&q=85',
  feira: 'https://images.unsplash.com/photo-1582192903020-8a5e59dcdcf2?auto=format&fit=crop&w=1200&q=85',
  teatro: 'https://images.unsplash.com/photo-1779906924545-5c6022fc696e?auto=format&fit=crop&w=1200&q=85',
}

export const events = [
  {
    id: 'festival-cultural',
    organizerId: 'seed-organizer',
    title: 'Festival Cultural Plural',
    category: 'Música e cultura',
    date: '2026-09-12T19:00:00-03:00',
    location: 'São Paulo, SP',
    description: 'Uma noite de música, dança e encontros que celebra diferentes formas de viver a cultura.',
    image: images.festival,
    fallbackImage: fallbackLogo,
    imageAlt: 'Público reunido em um evento cultural com luzes coloridas — Bennie Bates no Unsplash.',
    ticketPrices: { inteira: 50, meia: 25, pcd: 25 },
    featured: true,
    soldOut: false,
    accessibility: {
      groups: ['fisica', 'auditiva', 'visual', 'neurodivergente'],
      resources: ['Rampa de acesso', 'Intérprete de Libras', 'Audiodescrição', 'Espaço de pausa'],
      onsiteSupport: 'Equipe identificada na entrada principal e rota acessível sinalizada.',
    },
  },
  {
    id: 'feira-criativa',
    organizerId: 'seed-organizer',
    title: 'Feira Criativa do Centro',
    category: 'Gastronomia',
    date: '2026-09-19T11:00:00-03:00',
    location: 'Campinas, SP',
    description: 'Artesanato, sabores locais e oficinas para todas as idades em um espaço aberto e acolhedor.',
    image: images.feira,
    fallbackImage: fallbackLogo,
    imageAlt: 'Feira ao ar livre com barracas e visitantes — Product School no Unsplash.',
    ticketPrices: { inteira: 20, meia: 10, pcd: 10 },
    featured: true,
    soldOut: false,
    accessibility: {
      groups: ['fisica', 'visual'],
      resources: ['Banheiro acessível', 'Mapa tátil', 'Assentos de descanso'],
      onsiteSupport: 'Ponto de acolhimento ao lado da entrada da praça.',
    },
  },
  {
    id: 'teatro-de-portas-abertas',
    organizerId: 'seed-organizer',
    title: 'Teatro de Portas Abertas',
    category: 'Teatro',
    date: '2026-10-03T20:30:00-03:00',
    location: 'Rio de Janeiro, RJ',
    description: 'Espetáculo com recursos de acessibilidade planejados desde a recepção até a saída.',
    image: images.teatro,
    fallbackImage: fallbackLogo,
    imageAlt: 'Artistas iluminados em um palco de teatro — Nicola Dowie no Unsplash.',
    ticketPrices: { inteira: 70, meia: 35, pcd: 35 },
    featured: false,
    soldOut: false,
    accessibility: {
      groups: ['fisica', 'auditiva', 'visual', 'neurodivergente'],
      resources: ['Libras', 'Legenda descritiva', 'Audiodescrição', 'Sessão relaxada'],
      onsiteSupport: 'A equipe de acessibilidade estará disponível 45 minutos antes do início.',
    },
  },
]

export const fallbackEventImage = fallbackLogo
