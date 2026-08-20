import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateCreateOrder } from '../src/validators/schemas.js'

test('validateCreateOrder deve validar quantidade entre 1 e 10', () => {
  assert.throws(
    () => validateCreateOrder({ eventId: '123', ticketType: 'inteira', quantity: 15 }),
    (err) => err.code === 'VALIDATION_ERROR'
  )
})
