import { useState } from 'react'
import FeaturedEventCard from './FeaturedEventCard.jsx'

export default function EventCarousel({ events }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeEvent = events[activeIndex]
  if (!activeEvent) return null
  return <div className="event-carousel" aria-label="Eventos em destaque">
    <FeaturedEventCard event={activeEvent} />
    <div className="carousel-controls"><span className="visually-hidden" aria-live="polite">Evento {activeIndex + 1} de {events.length}: {activeEvent.title}</span>{events.map((event, index) => <button key={event.id} type="button" className={`carousel-dot${index === activeIndex ? ' is-active' : ''}`} aria-label={`Mostrar ${event.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => setActiveIndex(index)} />)}</div>
  </div>
}
