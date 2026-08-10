import '../../css/event-detail.css'
import { useLoaderData } from 'react-router-dom'
import EventDetail from '../../components/events/EventDetail.jsx'

export default function EventDetailPage() {
  const event = useLoaderData()
  return <section className="event-detail-page page-section"><div className="container"><EventDetail event={event} /></div></section>
}
