import { redirect } from 'react-router-dom'
import { getEventById } from '../data/events.js'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, TICKET_TYPES } from '../data/routes.js'

const asText = (formData, key) => String(formData.get(key) ?? '').trim()
const valuesOf = (formData, keys) => Object.fromEntries(keys.map((key) => [key, asText(formData, key)]))

export async function loginAction({ request }) {
  const formData = await request.formData()
  const values = valuesOf(formData, ['email', 'password'])
  const fieldErrors = {}
  if (!values.email) fieldErrors.email = 'Informe seu e-mail.'
  if (!values.password) fieldErrors.password = 'Informe sua senha.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values }
  return { ok: true, message: 'Login realizado com sucesso.', values }
}

export async function registerAction({ request }) {
  const formData = await request.formData()
  const values = valuesOf(formData, ['name', 'email', 'password', 'state'])
  const fieldErrors = {}
  if (!values.name) fieldErrors.name = 'Informe seu nome completo.'
  if (!values.email) fieldErrors.email = 'Informe seu e-mail.'
  if (values.password.length < 6) fieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
  if (!values.state) fieldErrors.state = 'Selecione seu estado.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values }
  return { ok: true, message: 'Cadastro realizado com sucesso.', values }
}

export async function organizerLoginAction({ request }) {
  const formData = await request.formData()
  const values = valuesOf(formData, ['email', 'password'])
  const fieldErrors = {}
  if (!values.email || !values.email.includes('@')) fieldErrors.email = 'Informe um e-mail profissional válido.'
  if (values.password.length < 6) fieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values }
  return {
    ok: true,
    message: 'Acesso liberado. Redirecionando para o painel.',
    values,
    session: { role: 'organizer', email: values.email, displayName: values.email.split('@')[0] },
  }
}

export async function createEventAction({ request }) {
  const formData = await request.formData()
  const groups = formData.getAll('accessibilityGroups').map(String).filter(Boolean)
  const file = formData.get('coverImage')
  const values = valuesOf(formData, ['title', 'date', 'time', 'location', 'price', 'description', 'assistiveResources', 'onsiteSupport'])
  const fieldErrors = {}
  if (!values.title) fieldErrors.title = 'Informe o nome do evento.'
  if (!values.date) fieldErrors.date = 'Informe a data do evento.'
  if (!values.time) fieldErrors.time = 'Informe o horário do evento.'
  if (!values.location) fieldErrors.location = 'Informe a localização.'
  if (!values.price || Number(values.price) < 0) fieldErrors.price = 'Informe um valor válido.'
  if (!values.description) fieldErrors.description = 'Descreva o evento.'
  if (!groups.length) fieldErrors.accessibilityGroups = 'Selecione pelo menos um público que o evento acolhe.'
  if (!values.assistiveResources) fieldErrors.assistiveResources = 'Descreva os recursos assistivos disponíveis.'
  if (!values.onsiteSupport) fieldErrors.onsiteSupport = 'Descreva como será o apoio no local.'
  if (!file || typeof file === 'string' || !file.name) fieldErrors.coverImage = 'Escolha uma foto principal do evento.'
  else if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) fieldErrors.coverImage = 'Use uma imagem PNG, JPG ou WebP.'
  else if (file.size > MAX_IMAGE_SIZE) fieldErrors.coverImage = 'A imagem deve ter no máximo 8 MB.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values: { ...values, accessibilityGroups: groups.join(', ') } }
  return { ok: true, message: 'Evento publicado com sucesso!', event: { ...values, accessibilityGroups: groups, imageName: file.name } }
}

export async function checkoutAction({ request, params }) {
  const event = getEventById(params.eventId)
  const formData = await request.formData()
  const ticketType = asText(formData, 'ticketType')
  const quantity = Number(formData.get('quantity'))
  if (!event) return { ok: false, message: 'Não encontramos este evento.' }
  if (!TICKET_TYPES.includes(ticketType)) return { ok: false, message: 'Selecione um tipo de ingresso.' }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return { ok: false, message: 'Escolha entre 1 e 10 ingressos.' }
  return { ok: true, message: 'Pedido registrado. Você receberá as instruções de pagamento.', total: event.ticketPrices[ticketType] * quantity }
}

export function legacyPaymentRedirect() {
  return redirect('/shows')
}
