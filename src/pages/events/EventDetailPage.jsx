import { useLoaderData } from 'react-router-dom'
import EventDetail from '../../components/events/EventDetail'
import '../../css/event-detail.css'

export default function EventDetailPage() {
  const event = useLoaderData()

  return (
    <div className="event-detail-page page-section">
      <div className="shell-container">
        <EventDetail event={event} />
      </div>
    </div>
  )
}
