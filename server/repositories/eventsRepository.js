import { query } from '../db.js'

const eventSelect = 'SELECT id, slug, organizer_id, title, category, starts_at, location, ticket_price, description, image_url, image_alt, cover_image, featured, sold_out, accessibility_groups, assistive_resources, onsite_support, created_at, updated_at FROM events'

const toEvent = (row) => row ? ({
  id: row.slug,
  databaseId: row.id,
  organizerId: row.organizer_id,
  title: row.title,
  category: row.category,
  date: new Date(row.starts_at).toISOString(),
  location: row.location,
  description: row.description,
  image: row.image_url,
  imageAlt: row.image_alt,
  coverImage: row.cover_image,
  fallbackImage: null,
  ticketPrices: { inteira: Number(row.ticket_price), meia: Number(row.ticket_price) / 2, pcd: Number(row.ticket_price) / 2 },
  featured: row.featured,
  soldOut: row.sold_out,
  accessibility: { groups: row.accessibility_groups || [], resources: row.assistive_resources || [], onsiteSupport: row.onsite_support },
  createdAt: row.created_at,
  updatedAt: row.updated_at,
}) : null

export async function listEvents({ featured = false, organizerId = null } = {}) {
  const filters = []
  const values = []
  if (featured) { values.push(true); filters.push(`featured = $${values.length}`) }
  if (organizerId) { values.push(organizerId); filters.push(`organizer_id = $${values.length}`) }
  const where = filters.length ? ` WHERE ${filters.join(' AND ')}` : ''
  const result = await query(`${eventSelect}${where} ORDER BY starts_at ASC`, values)
  return result.rows.map(toEvent)
}

export async function findEventBySlug(slug) {
  const result = await query(`${eventSelect} WHERE slug = $1 LIMIT 1`, [slug])
  return toEvent(result.rows[0])
}

export async function createEvent({ organizerId, title, category, date, location, price, description, coverImage, imageAlt, accessibilityGroups, assistiveResources, onsiteSupport, slug }) {
  const groups = Array.isArray(accessibilityGroups) ? accessibilityGroups : []
  const resources = Array.isArray(assistiveResources) ? assistiveResources : String(assistiveResources || '').split('\\n').map((item) => item.trim()).filter(Boolean)
  const result = await query('INSERT INTO events (slug, organizer_id, title, category, starts_at, location, ticket_price, description, image_alt, cover_image, accessibility_groups, assistive_resources, onsite_support) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *', [slug, organizerId, title, category || 'Evento cultural', date, location, Number(price), description, imageAlt || `Foto principal enviada para o evento ${title}.`, coverImage || null, groups, resources, onsiteSupport])
  return toEvent(result.rows[0])
}

export async function updateEventBySlug(slug, organizerId, changes) {
  const fields = []
  const values = []
  const add = (column, value) => { values.push(value); fields.push(`${column} = $${values.length}`) }
  if (changes.title !== undefined) add('title', changes.title)
  if (changes.category !== undefined) add('category', changes.category)
  if (changes.date !== undefined) add('starts_at', changes.date)
  if (changes.location !== undefined) add('location', changes.location)
  if (changes.price !== undefined) add('ticket_price', Number(changes.price))
  if (changes.description !== undefined) add('description', changes.description)
  if (changes.coverImage !== undefined) add('cover_image', changes.coverImage)
  if (changes.imageAlt !== undefined) add('image_alt', changes.imageAlt)
  if (changes.accessibilityGroups !== undefined) add('accessibility_groups', changes.accessibilityGroups)
  if (changes.assistiveResources !== undefined) add('assistive_resources', changes.assistiveResources)
  if (changes.onsiteSupport !== undefined) add('onsite_support', changes.onsiteSupport)
  if (!fields.length) return findEventBySlug(slug)
  values.push(slug, organizerId)
  const result = await query(`UPDATE events SET ${fields.join(', ')}, updated_at = NOW() WHERE slug = $${values.length - 1} AND organizer_id = $${values.length} RETURNING *`, values)
  return toEvent(result.rows[0])
}

export async function deleteEventBySlug(slug, organizerId) {
  const result = await query('DELETE FROM events WHERE slug = $1 AND organizer_id = $2 RETURNING id', [slug, organizerId])
  return Boolean(result.rowCount)
}
