import { query } from '../config/db.js'

function formatEvent(row) {
  if (!row) return null
  const ticketPrice = Number(row.ticket_price)
  return {
    id: row.id,
    slug: row.slug,
    organizerId: row.organizer_id,
    title: row.title,
    category: row.category,
    date: row.starts_at ? new Date(row.starts_at).toISOString() : null,
    location: row.location,
    price: ticketPrice,
    ticketPrices: {
      inteira: ticketPrice,
      meia: Number((ticketPrice / 2).toFixed(2)),
      pcd: 0,
    },
    description: row.description,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    coverImage: row.cover_image,
    featured: Boolean(row.featured),
    soldOut: Boolean(row.sold_out),
    accessibilityGroups: row.accessibility_groups || [],
    assistiveResources: row.assistive_resources || [],
    onsiteSupport: row.onsite_support,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listEvents({ featured = false, organizerId = null, category = null } = {}) {
  const params = []
  const conditions = []

  if (featured) {
    params.push(true)
    conditions.push(`featured = $${params.length}`)
  }

  if (organizerId) {
    params.push(organizerId)
    conditions.push(`organizer_id = $${params.length}`)
  }

  if (category) {
    params.push(category)
    conditions.push(`category = $${params.length}`)
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const result = await query(
    `SELECT * FROM events ${whereClause} ORDER BY starts_at ASC`,
    params
  )

  return result.rows.map(formatEvent)
}

export async function findEventBySlugOrId(slugOrId) {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId)

  const sql = isUuid
    ? `SELECT * FROM events WHERE id = $1 LIMIT 1`
    : `SELECT * FROM events WHERE slug = $1 LIMIT 1`

  const result = await query(sql, [slugOrId])
  return formatEvent(result.rows[0])
}

export async function createEvent(data) {
  const slug = data.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)

  const result = await query(
    `INSERT INTO events (
      slug, organizer_id, title, category, starts_at, location, ticket_price,
      description, image_url, image_alt, cover_image, featured, sold_out,
      accessibility_groups, assistive_resources, onsite_support
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *`,
    [
      slug,
      data.organizerId,
      data.title,
      data.category || 'Evento cultural',
      data.date,
      data.location,
      data.price,
      data.description,
      data.imageUrl || null,
      data.imageAlt || `Foto principal do evento ${data.title}`,
      data.coverImage ? JSON.stringify(data.coverImage) : null,
      Boolean(data.featured),
      Boolean(data.soldOut),
      data.accessibilityGroups || [],
      Array.isArray(data.assistiveResources)
        ? data.assistiveResources
        : (data.assistiveResources || '').split('\n').filter(Boolean),
      data.onsiteSupport || '',
    ]
  )

  return formatEvent(result.rows[0])
}

export async function updateEventBySlugOrId(slugOrId, organizerId, changes) {
  const existing = await findEventBySlugOrId(slugOrId)
  if (!existing) return null
  if (existing.organizerId !== organizerId) return null

  const title = changes.title ?? existing.title
  const category = changes.category ?? existing.category
  const startsAt = changes.date ?? existing.date
  const location = changes.location ?? existing.location
  const price = changes.price !== undefined ? changes.price : existing.price
  const description = changes.description ?? existing.description
  const groups = changes.accessibilityGroups ?? existing.accessibilityGroups
  const resources = Array.isArray(changes.assistiveResources)
    ? changes.assistiveResources
    : typeof changes.assistiveResources === 'string'
    ? changes.assistiveResources.split('\n').filter(Boolean)
    : existing.assistiveResources
  const support = changes.onsiteSupport ?? existing.onsiteSupport

  const result = await query(
    `UPDATE events
     SET title = $1, category = $2, starts_at = $3, location = $4, ticket_price = $5,
         description = $6, accessibility_groups = $7, assistive_resources = $8, onsite_support = $9,
         updated_at = NOW()
     WHERE id = $10 AND organizer_id = $11
     RETURNING *`,
    [title, category, startsAt, location, price, description, groups, resources, support, existing.id, organizerId]
  )

  return formatEvent(result.rows[0])
}

export async function deleteEventBySlugOrId(slugOrId, organizerId) {
  const existing = await findEventBySlugOrId(slugOrId)
  if (!existing || existing.organizerId !== organizerId) return false

  const result = await query(
    `DELETE FROM events WHERE id = $1 AND organizer_id = $2`,
    [existing.id, organizerId]
  )

  return result.rowCount > 0
}
