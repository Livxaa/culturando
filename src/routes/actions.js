import { getEventById } from '../data/events'

function validateAuth(formData, mode) {
  const fieldErrors = {}
  const fullName = formData.get('fullName')?.toString().trim() || ''
  const email = formData.get('email')?.toString().trim() || ''
  const password = formData.get('password')?.toString() || ''
  const state = formData.get('state')?.toString() || ''

  if (mode === 'register' && fullName.length < 3) {
    fieldErrors.fullName = 'Informe seu nome completo.'
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    fieldErrors.email = 'Informe um e-mail válido.'
  }

  if (password.length < 6) {
    fieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
  }

  if (mode === 'register' && !state) {
    fieldErrors.state = 'Selecione seu estado.'
  }

  return { fieldErrors, fullName, email, password, state }
}

export async function loginAction({ request }) {
  const formData = await request.formData()
  const { fieldErrors, email } = validateAuth(formData, 'login')

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, message: 'Revise os campos destacados.' }
  }

  return {
    ok: true,
    user: { name: email.split('@')[0], email },
    message: 'Login realizado com sucesso.',
  }
}

export async function registerAction({ request }) {
  const formData = await request.formData()
  const { fieldErrors, fullName, email } = validateAuth(formData, 'register')

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, message: 'Revise os campos destacados.' }
  }

  return {
    ok: true,
    user: { name: fullName, email },
    message: 'Cadastro realizado com sucesso.',
  }
}

export async function organizerLoginAction({ request }) {
  const formData = await request.formData()
  const { fieldErrors, email } = validateAuth(formData, 'login')

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, message: 'Revise os campos destacados.' }
  }

  return {
    ok: true,
    user: { name: email.split('@')[0], email, role: 'organizer' },
    message: 'Acesso de organizador liberado.',
  }
}

export async function organizerEventAction({ request }) {
  const formData = await request.formData()
  const requiredFields = ['title', 'date', 'time', 'location', 'cost', 'description', 'disabilityAudience', 'onSiteSupport']
  const fieldErrors = Object.fromEntries(requiredFields
    .filter((field) => !formData.get(field)?.toString().trim())
    .map((field) => [field, 'Preencha este campo para publicar o evento.']))

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, message: 'Revise os campos obrigatórios antes de publicar.' }
  }

  return {
    ok: true,
    message: 'Evento publicado com sucesso! Ele já pode ser revisado na sua área de organizador.',
    event: {
      title: formData.get('title').toString(),
      date: formData.get('date').toString(),
      location: formData.get('location').toString(),
      photoName: formData.get('photo')?.name || '',
    },
  }
}

export async function checkoutAction({ request, params }) {
  const formData = await request.formData()
  const event = getEventById(params.eventId)
  const ticketType = formData.get('ticketType')?.toString() || ''
  const quantity = Number(formData.get('quantity') || 0)

  if (!event) {
    return { ok: false, message: 'Não encontramos este evento. Volte para a agenda e tente novamente.' }
  }

  if (!event.ticketPrices[ticketType]) {
    return { ok: false, message: 'Selecione uma categoria de ingresso.' }
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 8) {
    return { ok: false, message: 'Escolha uma quantidade entre 1 e 8 ingressos.' }
  }

  const total = event.ticketPrices[ticketType] * quantity

  return {
    ok: true,
    message: 'Compra realizada com sucesso. Seu ingresso está reservado.',
    order: { eventId: event.id, ticketType, quantity, total },
  }
}
