import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateLogin, validateRegister } from '../src/validators/schemas.js'

test('validateRegister deve rejeitar email sem @', () => {
  assert.throws(
    () => validateRegister({ name: 'User', email: 'invalido', password: '123', state: 'SP' }),
    (err) => err.code === 'VALIDATION_ERROR'
  )
})

test('validateLogin deve exigir email e senha', () => {
  assert.throws(
    () => validateLogin({ email: '' }),
    (err) => err.code === 'VALIDATION_ERROR'
  )
})
