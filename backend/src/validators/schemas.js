import { ValidationError } from '../errors/DomainErrors.js'

export function validateRegister(body) {
  const { name, email, password, state } = body || {}
  const fields = {}

  if (!name || typeof name !== 'string' || !name.trim()) {
    fields.name = 'Informe seu nome completo.'
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    fields.email = 'Informe um e-mail válido.'
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    fields.password = 'A senha deve ter pelo menos 6 caracteres.'
  }
  if (!state || typeof state !== 'string') {
    fields.state = 'Selecione seu estado.'
  }

  if (Object.keys(fields).length > 0) {
    throw new ValidationError('Dados de cadastro inválidos.', fields)
  }
}

export function validateLogin(body) {
  const { email, password } = body || {}
  const fields = {}

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    fields.email = 'Informe um e-mail válido.'
  }
  if (!password || typeof password !== 'string' || !password) {
    fields.password = 'Informe sua senha.'
  }

  if (Object.keys(fields).length > 0) {
    throw new ValidationError('Credenciais de login inválidas.', fields)
  }
}

export function validateCreateEvent(body) {
  const { title, date, location, price, description, accessibilityGroups, assistiveResources, onsiteSupport } = body || {}
  const fields = {}

  if (!title || typeof title !== 'string' || !title.trim()) fields.title = 'Informe o nome do evento.'
  if (!date || typeof date !== 'string' || !date.trim()) fields.date = 'Informe a data do evento.'
  if (!location || typeof location !== 'string' || !location.trim()) fields.location = 'Informe a localização.'
  if (price === undefined || price === null || Number(price) < 0) fields.price = 'Informe um valor válido.'
  if (!description || typeof description !== 'string' || !description.trim()) fields.description = 'Descreva o evento.'
  if (!Array.isArray(accessibilityGroups) || accessibilityGroups.length === 0) {
    fields.accessibilityGroups = 'Selecione pelo menos um público que o evento acolhe.'
  }
  if (!assistiveResources) fields.assistiveResources = 'Descreva os recursos assistivos disponíveis.'
  if (!onsiteSupport) fields.onsiteSupport = 'Descreva como será o apoio no local.'

  if (Object.keys(fields).length > 0) {
    throw new ValidationError('Dados do evento inválidos.', fields)
  }
}

export function validateCreateOrder(body) {
  const { eventId, ticketType, quantity } = body || {}
  const fields = {}

  if (!eventId) fields.eventId = 'Identificador do evento não fornecido.'
  if (!['inteira', 'meia', 'pcd'].includes(ticketType)) fields.ticketType = 'Selecione um tipo de ingresso válido (inteira, meia, pcd).'
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) fields.quantity = 'A quantidade deve ser entre 1 e 10.'

  if (Object.keys(fields).length > 0) {
    throw new ValidationError('Dados do pedido inválidos.', fields)
  }
}
