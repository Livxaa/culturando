import { useEffect, useId, useState } from 'react'
import EventMeta from './EventMeta'
import FeaturedEventCard from './FeaturedEventCard'

export default function EventCarousel({ events }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const titleId = useId()
  const event = events[activeIndex]

  useEffect(() => {
    if (activeIndex >= events.length) setActiveIndex(0)
  }, [activeIndex, events.length])

  if (!event) return null

  return (
    <div className="home-hero__feature" aria-labelledby={titleId}>
      <span id={titleId} className="visually-hidden">Evento em destaque</span>
      <FeaturedEventCard event={event} />
      <div className="hero-carousel-controls">
        <div className="hero-carousel-controls__dots" role="group" aria-label="Escolher evento em destaque">
          {events.map((featuredEvent, index) => (
            <button
              key={featuredEvent.id}
              type="button"
              className={`carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
              aria-label={`Mostrar ${featuredEvent.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <EventMeta event={event} compact />
      </div>
    </div>
  )
}
