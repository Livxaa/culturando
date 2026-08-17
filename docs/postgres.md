# Persistência PostgreSQL

A aplicação possui dois adaptadores selecionáveis pela variável `VITE_DATA_SOURCE`:

- Sem variável ou com qualquer valor diferente de `postgres`: banco local mock em `localStorage`.
- `VITE_DATA_SOURCE=postgres`: loaders/actions usam a API Node/Express em `/api`, que consulta PostgreSQL via `pg`.

## Preparação local

1. Crie um banco PostgreSQL chamado `culturando`.
2. Configure as variáveis de `.env.example` em um arquivo `.env`.
3. Execute o schema e o seed:

```bash
psql "$DATABASE_URL" -f schema.sql
psql "$DATABASE_URL" -f seed.sql
```

4. Inicie a API:

```bash
npm run server
```

5. Em outro terminal, inicie o Vite com `VITE_DATA_SOURCE=postgres`.

## API

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/events`
- `GET /api/events/:slug`
- `POST /api/events`
- `PATCH /api/events/:slug`
- `DELETE /api/events/:slug`
- `GET /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/cancel`
- `POST /api/bookings`

A autenticação da API é deliberadamente simples para este ambiente local: o cliente envia o `userId` persistido no cabeçalho `x-user-id`. Antes de produção, substitua esse mecanismo por sessão segura ou tokens com expiração, TLS, hash de senha com algoritmo adaptativo e validação de payload no servidor.
