const festivalImage = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwb3BlbiUyMGFpciUyMG11c2ljJTIwZmVzdGl2YWwlMjBzdGFnZSUyMHdpdGglMjBjb2xvcmZ1bCUyMGxpZ2h0cyUyMGFuZCUyMGNyb3dkfGVufDB8fHx8MTc4NjA0MDUzOXww&ixlib=rb-4.1.0&q=85&w=1200'
const fairImage = 'https://images.unsplash.com/photo-1638132704904-58d5ebe85aa5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjdWx0dXJhbCUyMGZhaXIlMjB3aXRoJTIwcGVvcGxlJTIwYW5kJTIwY29sb3JmdWwlMjBvdXRkb29yJTIwaW5zdGFsbGF0aW9uc3xlbnwwfHx8fDE3ODYwNDA1NDV8MA&ixlib=rb-4.1.0&q=85&w=1200'
const theaterImage = 'https://images.unsplash.com/photo-1645465808038-1d3a57aeeaa6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxpbmNsdXNpdmUlMjB0aGVhdGVyJTIwcGVyZm9ybWFuY2UlMjB3aXRoJTIwZHJhbWF0aWMlMjBwdXJwbGUlMjBsaWdodGluZyUyMG9uJTIwc3RhZ2V8ZW58MHx8fHwxNzg2MDQwNTUwfDA&ixlib=rb-4.1.0&q=85&w=1200'
const danceImage = 'https://images.pexels.com/photos/14837677/pexels-photo-14837677.jpeg?auto=compress&cs=tinysrgb&w=1200'

export const events = [
  {
    id: 'festival-luzes-da-cidade',
    title: 'Festival Luzes da Cidade',
    category: 'Música e cultura',
    date: '2026-09-12T19:00:00-03:00',
    location: 'São Paulo, SP',
    description: 'Uma noite de música, arte e encontros para celebrar diferentes formas de criar e ocupar a cidade.',
    image: festivalImage,
    imageAlt: 'Público reunido em um festival de música ao ar livre — Aditya Chinchure no Unsplash',
    ticketPrices: { inteira: 50, meia: 25, pcd: 25 },
    featured: true,
  },
  {
    id: 'feira-raizes-e-sabores',
    title: 'Feira Raízes e Sabores',
    category: 'Gastronomia',
    date: '2026-10-03T11:00:00-03:00',
    location: 'Campinas, SP',
    description: 'Comida, artesanato e histórias de quem transforma tradição em experiência para toda a comunidade.',
    image: fairImage,
    imageAlt: 'Feira cultural ao ar livre com pessoas e bandeirolas — Kate Trysh no Unsplash',
    ticketPrices: { inteira: 20, meia: 10, pcd: 10 },
    featured: true,
  },
  {
    id: 'palco-aberto-inclusivo',
    title: 'Palco Aberto Inclusivo',
    category: 'Teatro',
    date: '2026-10-24T18:30:00-03:00',
    location: 'Santos, SP',
    description: 'Performances, oficinas e conversas que ampliam o acesso à cena cultural e valorizam novos talentos.',
    image: theaterImage,
    imageAlt: 'Artistas em uma apresentação com iluminação roxa — Jametlene Reskp no Unsplash',
    ticketPrices: { inteira: 35, meia: 17.5, pcd: 17.5 },
    featured: true,
  },
  {
    id: 'movimento-em-cena',
    title: 'Movimento em Cena',
    category: 'Dança',
    date: '2026-11-07T20:00:00-03:00',
    location: 'São José dos Campos, SP',
    description: 'Uma apresentação vibrante sobre presença, corpo e pertencimento, seguida de bate-papo com o elenco.',
    image: danceImage,
    imageAlt: 'Dançarino em apresentação teatral — Spencer Cooper no Pexels',
    ticketPrices: { inteira: 40, meia: 20, pcd: 20 },
    featured: false,
  },
]

export function getEventById(eventId) {
  return events.find((event) => event.id === eventId)
}
