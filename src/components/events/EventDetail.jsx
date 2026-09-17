import { Link } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'
import EventMeta from './EventMeta.jsx'
import { formatCurrency } from '../../utils/formatters.js'
import { useAccessibility } from '../../context/AccessibilityContext.jsx'

export default function EventDetail({ event }) {
  const { speak, isSpeaking, stopSpeaking } = useAccessibility()

  if (!event) return null

  const resources = event.accessibility?.resources || []
  const onsiteSupport = event.accessibility?.onsiteSupport || 'Apoio no local disponível com a equipe do evento.'
  const inteiraPrice = event.ticketPrices?.inteira ?? 0

  const handleAudioDescription = () => {
    if (isSpeaking) {
      stopSpeaking()
      return
    }
    const resourcesText = resources.length > 0 ? resources.join(', ') : 'Consulte os organizadores.'
    const textToRead = `Audiodescrição do evento: ${event.title || ''}. Categoria: ${event.category || ''}. Localização: ${event.location || ''}. Descrição do evento: ${event.description || ''}. Recursos de acessibilidade disponíveis: ${resourcesText}. Suporte presencial no local: ${onsiteSupport}. Descrição da imagem: ${event.imageAlt || 'Foto ilustrativa do evento'}.`
    speak(textToRead)
  }

  return (
    <article className="event-detail">
      <div className="event-detail__poster">
        <img
          src={event.image || event.fallbackImage}
          alt={event.imageAlt || event.title}
          onError={(eventTarget) => {
            eventTarget.currentTarget.src = event.fallbackImage
          }}
        />
      </div>
      <div className="event-detail__content">
        <div className="event-detail__header-bar">
          <p className="eyebrow">{event.category || 'Evento cultural'}</p>
          <button
            type="button"
            className={`button button--ghost event-detail__audio-btn ${isSpeaking ? 'event-detail__audio-btn--active' : ''}`}
            onClick={handleAudioDescription}
            aria-pressed={isSpeaking}
            title="Ouvir audiodescrição completa do evento em voz alta"
          >
            <span aria-hidden="true">{isSpeaking ? '⏹️' : '🔊'}</span>
            {isSpeaking ? 'Pausar Áudio' : 'Ouvir Audiodescrição'}
          </button>
        </div>

        <h1 tabIndex="-1">{event.title}</h1>
        <EventMeta event={event} />
        <p>{event.description}</p>

        <div className="event-detail__accessibility">
          <h2>Recursos de acessibilidade</h2>
          {resources.length > 0 ? (
            <ul>
              {resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          ) : (
            <p>Informações de acessibilidade disponíveis na entrada do evento.</p>
          )}
          <p>{onsiteSupport}</p>
        </div>

        <div className="event-detail__action">
          <strong>{formatCurrency(inteiraPrice)}</strong>
          <Link className="button button--primary" to={ROUTES.CHECKOUT(event.id)}>
            Comprar ingresso
          </Link>
        </div>
      </div>
    </article>
  )
}

