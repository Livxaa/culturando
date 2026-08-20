import assert from 'node:assert/strict'
import http from 'node:http'
import { test } from 'node:test'
import { app } from '../src/app.js'

test('GET /api/v1/health deve responder status 200 ou 500 sem quebrar a aplicacao', async () => {
  const server = http.createServer(app)
  await new Promise((resolve) => server.listen(0, resolve))
  const port = server.address().port

  try {
    const res = await fetch(`http://localhost:${port}/api/v1/health`)
    assert.ok(res.status === 200 || res.status === 500)
    const json = await res.json()
    assert.ok(json, 'Resposta deve conter JSON')
  } finally {
    server.close()
  }
})
