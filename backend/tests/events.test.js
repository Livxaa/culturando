import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateCreateEvent } from '../src/validators/schemas.js'

test('validateCreateEvent deve lancar ValidationError quando campos obrigatorios faltarem', () => {
  assert.throws(
    () => validateCreateEvent({ title: '' }),
    (err) => err.code === 'VALIDATION_ERROR' && err.status === 422
  )
})

test('validateCreateEvent deve passar quando todos os campos obrigatorios forem fornecidos', () => {
  assert.doesNotThrow(() => {
    validateCreateEvent({
      title: 'Festival de Teste',
      date: '2026-10-10T19:00:00-03:00',
      location: 'São Paulo',
      price: 50,
      description: 'Descrição de teste',
      accessibilityGroups: ['fisica'],
      assistiveResources: 'Rampa de acesso',
      onsiteSupport: 'Apoio na entrada',
    })
  })
})
