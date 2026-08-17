BEGIN;

TRUNCATE TABLE bookings, events, users RESTART IDENTITY CASCADE;

INSERT INTO users (id, role, name, email, password_hash, state) VALUES
  ('00000000-0000-0000-0000-000000000001', 'organizer', 'Empresa Culturando', 'empresa@example.com', encode(digest('segredo', 'sha256'), 'hex'), 'SP'),
  ('00000000-0000-0000-0000-000000000002', 'buyer', 'Pessoa Compradora', 'comprador@example.com', encode(digest('segredo', 'sha256'), 'hex'), 'SP');

INSERT INTO events (id, slug, organizer_id, title, category, starts_at, location, ticket_price, description, image_url, image_alt, featured, accessibility_groups, assistive_resources, onsite_support) VALUES
  ('10000000-0000-0000-0000-000000000001', 'festival-cultural', '00000000-0000-0000-0000-000000000001', 'Festival Cultural Plural', 'Música e cultura', '2026-09-12T19:00:00-03:00', 'São Paulo, SP', 50.00, 'Uma noite de música, dança e encontros que celebra diferentes formas de viver a cultura.', 'https://images.unsplash.com/photo-1729553199933-c897fea4f41f?auto=format&fit=crop&w=1200&q=85', 'Público reunido em um evento cultural com luzes coloridas — Bennie Bates no Unsplash.', TRUE, ARRAY['fisica', 'auditiva', 'visual', 'neurodivergente'], ARRAY['Rampa de acesso', 'Intérprete de Libras', 'Audiodescrição', 'Espaço de pausa'], 'Equipe identificada na entrada principal e rota acessível sinalizada.'),
  ('10000000-0000-0000-0000-000000000002', 'feira-criativa', '00000000-0000-0000-0000-000000000001', 'Feira Criativa do Centro', 'Gastronomia', '2026-09-19T11:00:00-03:00', 'Campinas, SP', 20.00, 'Artesanato, sabores locais e oficinas para todas as idades em um espaço aberto e acolhedor.', 'https://images.unsplash.com/photo-1582192903020-8a5e59dcdcf2?auto=format&fit=crop&w=1200&q=85', 'Feira ao ar livre com barracas e visitantes — Product School no Unsplash.', TRUE, ARRAY['fisica', 'visual'], ARRAY['Banheiro acessível', 'Mapa tátil', 'Assentos de descanso'], 'Ponto de acolhimento ao lado da entrada da praça.'),
  ('10000000-0000-0000-0000-000000000003', 'teatro-de-portas-abertas', '00000000-0000-0000-0000-000000000001', 'Teatro de Portas Abertas', 'Teatro', '2026-10-03T20:30:00-03:00', 'Rio de Janeiro, RJ', 70.00, 'Espetáculo com recursos de acessibilidade planejados desde a recepção até a saída.', 'https://images.unsplash.com/photo-1779906924545-5c6022fc696e?auto=format&fit=crop&w=1200&q=85', 'Artistas iluminados em um palco de teatro — Nicola Dowie no Unsplash.', FALSE, ARRAY['fisica', 'auditiva', 'visual', 'neurodivergente'], ARRAY['Libras', 'Legenda descritiva', 'Audiodescrição', 'Sessão relaxada'], 'A equipe de acessibilidade estará disponível 45 minutos antes do início.'),
  ('10000000-0000-0000-0000-000000000004', 'mostra-persistente-de-cultura', '00000000-0000-0000-0000-000000000001', 'Mostra Persistente de Cultura', 'Evento cultural', '2026-12-12T19:00:00-03:00', 'Centro Cultural, Recife - PE', 40.00, 'Evento salvo no banco local para validar a jornada completa.', NULL, 'Foto principal enviada para o evento Mostra Persistente de Cultura.', FALSE, ARRAY['fisica'], ARRAY['Rampa', 'Intérprete de Libras', 'Audiodescrição'], 'A equipe estará na entrada principal.');

INSERT INTO bookings (id, buyer_id, event_id, ticket_type, quantity, unit_price, total, status) VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'inteira', 2, 20.00, 40.00, 'confirmed');

COMMIT;
