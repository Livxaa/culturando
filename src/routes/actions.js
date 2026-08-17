import { redirect } from 'react-router-dom'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, TICKET_TYPES } from '../data/routes.js'
import { authService, bookingsService, eventsService } from '../services/dataService.js'

const asText = (formData, key) => String(formData.get(key) ?? '').trim()
const valuesOf = (formData, keys) => Object.fromEntries(keys.map((key) => [key, asText(formData, key)]))
const currentSession = () => authService.getSession()

export async function loginAction({ request }) {
  const formData = await request.formData()
  const values = valuesOf(formData, ['email', 'password'])
  const fieldErrors = {}
  if (!values.email) fieldErrors.email = 'Informe seu e-mail.'
  if (!values.password) fieldErrors.password = 'Informe sua senha.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values }
  const result = await authService.authenticate({ ...values, role: 'buyer' })
  if (!result.ok) return { ok: false, fieldErrors: { email: result.message }, values }
  return { ok: true, message: 'Login realizado com sucesso.', values: { email: values.email, password: '' }, session: result.session }
}

export async function registerAction({ request }) {
  const formData = await request.formData()
  const values = valuesOf(formData, ['name', 'email', 'password', 'state'])
  const fieldErrors = {}
  if (!values.name) fieldErrors.name = 'Informe seu nome completo.'
  if (!values.email || !values.email.includes('@')) fieldErrors.email = 'Informe um e-mail válido.'
  if (values.password.length < 6) fieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
  if (!values.state) fieldErrors.state = 'Selecione seu estado.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values }
  const result = await authService.register(values)
  if (!result.ok) return { ok: false, fieldErrors: { email: result.message }, values }
  return { ok: true, message: 'Cadastro realizado com sucesso. Você já pode explorar seus ingressos.', values: { ...values, password: '' }, session: result.session }
}

export async function organizerLoginAction({ request }) {
  const formData = await request.formData()
  const values = valuesOf(formData, ['email', 'password'])
  const fieldErrors = {}
  if (!values.email || !values.email.includes('@')) fieldErrors.email = 'Informe um e-mail profissional válido.'
  if (values.password.length < 6) fieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values }
  const result = await authService.authenticate({ ...values, role: 'organizer' })
  if (!result.ok) return { ok: false, fieldErrors: { email: result.message }, values }
  return { ok: true, message: 'Acesso liberado. Redirecionando para o painel.', values, session: result.session }
}

export async function createEventAction({ request }) {
  const session = currentSession()
  if (session?.role !== 'organizer') throw redirect('/organizador/login')
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

  const event = await eventsService.create({
    ...values,
    date: `${values.date}T${values.time}:00-03:00`,
    accessibilityGroups: groups,
    organizerId: session.userId,
    coverImage: { name: file.name, type: file.type, size: file.size, lastModified: file.lastModified },
  })
  return { ok: true, message: 'Evento publicado com sucesso!', event }
}

export async function organizerEventMutationAction({ request }) {
  const session = currentSession()
  if (session?.role !== 'organizer') throw redirect('/organizador/login')
  const formData = await request.formData()
  const intent = asText(formData, 'intent')
  const eventId = asText(formData, 'eventId')
  if (intent !== 'delete' || !eventId) return { ok: false, message: 'Não foi possível identificar o evento.' }
  const event = await eventsService.getById(eventId)
  if (!event || event.organizerId !== session.userId) return { ok: false, message: 'Evento não encontrado ou sem permissão.' }
  try {
    const removed = await eventsService.remove(eventId)
    return removed ? { ok: true, message: 'Evento excluído com sucesso.' } : { ok: false, message: 'Não foi possível excluir o evento.' }
  } catch (error) {
    return { ok: false, message: error?.message || 'Não foi possível excluir o evento. Verifique se existem ingressos vinculados.' }
  }
}

export async function updateEventAction({ request, params }) {
  const session = currentSession()
  if (session?.role !== 'organizer') throw redirect('/organizador/login')
  const formData = await request.formData()
  const groups = formData.getAll('accessibilityGroups').map(String).filter(Boolean)
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
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values: { ...values, accessibilityGroups: groups } }
  const event = await eventsService.getById(params.eventId)
  if (!event || event.organizerId !== session.userId) return { ok: false, message: 'Evento não encontrado ou sem permissão.' }
  const updated = await eventsService.update(params.eventId, { ...values, date: `${values.date}T${values.time}:00-03:00`, accessibilityGroups: groups, assistiveResources: values.assistiveResources.split('\\n').map((item) => item.trim()).filter(Boolean), onsiteSupport: values.onsiteSupport })
  return updated ? { ok: true, message: 'Evento atualizado com sucesso.', event: updated } : { ok: false, message: 'Não foi possível atualizar o evento.' }
}

export async function checkoutAction({ request, params }) {
  const event = await eventsService.getById(params.eventId)
  const formData = await request.formData()
  const ticketType = asText(formData, 'ticketType')
  const quantity = Number(formData.get('quantity'))
  if (!event) return { ok: false, message: 'Não encontramos este evento.' }
  if (!TICKET_TYPES.includes(ticketType)) return { ok: false, message: 'Selecione um tipo de ingresso.' }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return { ok: false, message: 'Escolha entre 1 e 10 ingressos.' }
  const session = currentSession()
  const booking = await bookingsService.create({
    userId: session?.userId || 'guest',
    buyerName: session?.displayName || 'Pessoa visitante',
    eventId: event.id,
    eventTitle: event.title,
    ticketType,
    quantity,
    unitPrice: event.ticketPrices[ticketType],
    total: event.ticketPrices[ticketType] * quantity,
  })
  return { ok: true, message: 'Pedido registrado. Você receberá as instruções de pagamento.', total: booking.total, bookingId: booking.id }
}

export function legacyPaymentRedirect() {
  return redirect('/shows')
}
