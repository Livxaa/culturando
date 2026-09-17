import '../../css/event-detail.css'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import EventDetail from '../../components/events/EventDetail.jsx'
import CommunityReviews from '../../components/events/CommunityReviews.jsx'

export default function EventDetailPage() {
  const loadedEvent = useLoaderData()
  const [event, setEvent] = useState(loadedEvent)

  if (!event) {
    return (
      <section className="event-detail-page page-section">
        <div className="container">
          <p>Evento não encontrado ou carregando…</p>
        </div>
      </section>
    )
  }

  return (
    <section className="event-detail-page page-section">
      <div className="container">
        <EventDetail event={event} />
        <CommunityReviews event={event} onReviewAdded={(updated) => setEvent(updated)} />
      </div>
    </section>
  )
}

