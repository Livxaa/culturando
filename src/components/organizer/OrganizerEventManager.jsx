import { useEffect, useRef, useState } from 'react'
import { Link, useFetcher } from 'react-router-dom'
import { ROUTES } from '../../data/routes.js'
import { formatShortDate } from '../../utils/formatters.js'
import StatusMessage from '../ui/StatusMessage.jsx'

export default function OrganizerEventManager({ events }) {
  const deleteFetcher = useFetcher()
  const [eventToDelete, setEventToDelete] = useState(null)
  const [feedback, setFeedback] = useState('')
  const dialogRef = useRef(null)
  const deleteTriggerRef = useRef(null)

  useEffect(() => {
    if (deleteFetcher.data?.ok) {
      setFeedback(deleteFetcher.data.message)
      setEventToDelete(null)
      deleteTriggerRef.current?.focus()
    }
  }, [deleteFetcher.data])

  useEffect(() => {
    if (!eventToDelete) return undefined
    const dialog = dialogRef.current
    const focusable = () => [...dialog.querySelectorAll('button, a[href], input:not([disabled])')].filter((element) => !element.hasAttribute('disabled'))
    dialog.querySelector('button')?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setEventToDelete(null)
        deleteTriggerRef.current?.focus()
      }
      if (event.key !== 'Tab') return
      const elements = focusable()
      if (!elements.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [eventToDelete])

  return <section className="organizer-event-manager" aria-labelledby="managed-events-title">
    <div className="organizer-event-manager__heading"><div><p className="eyebrow">Dados publicados</p><h2 id="managed-events-title">Gerencie seus eventos</h2></div><Link className="button button--primary" to={ROUTES.ORGANIZER_NEW_EVENT}>Novo evento</Link></div>
    {feedback && <StatusMessage variant="success" title="Alteração salva">{feedback}</StatusMessage>}
    {deleteFetcher.data && !deleteFetcher.data.ok && <StatusMessage variant="error" title="Não foi possível excluir">{deleteFetcher.data.message}</StatusMessage>}
    {!events.length && <p className="empty-state">Você ainda não publicou eventos.</p>}
    <ul className="managed-event-list">{events.map((event) => <li className="managed-event-card" key={event.id}><div className="managed-event-card__content"><p className="eyebrow">{event.category}</p><h3>{event.title}</h3><p>{formatShortDate(event.date)} · {event.location}</p><span>{event.accessibility.groups.length} público(s) de acessibilidade informado(s)</span></div><div className="managed-event-card__actions"><Link className="button button--secondary" to={`${ROUTES.ORGANIZER_DASHBOARD}/eventos/${event.id}/editar`}>Editar</Link><button className="button button--danger" type="button" onClick={(eventTarget) => { deleteTriggerRef.current = eventTarget.currentTarget; setEventToDelete(event) }}>Excluir</button></div></li>)}</ul>
    {eventToDelete && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setEventToDelete(null); deleteTriggerRef.current?.focus() } }}><section ref={dialogRef} className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-event-title" aria-describedby="delete-event-description"><h2 id="delete-event-title">Excluir evento?</h2><p id="delete-event-description">O evento <strong>{eventToDelete.title}</strong> será removido da agenda. Essa ação não poderá ser desfeita.</p><div className="confirm-dialog__actions"><button className="button button--ghost" type="button" onClick={() => { setEventToDelete(null); deleteTriggerRef.current?.focus() }}>Cancelar</button><deleteFetcher.Form method="post" action={ROUTES.ORGANIZER_DASHBOARD}><input type="hidden" name="intent" value="delete" /><input type="hidden" name="eventId" value={eventToDelete.id} /><button className="button button--danger" type="submit" disabled={deleteFetcher.state === 'submitting'}>{deleteFetcher.state === 'submitting' ? 'Excluindo…' : 'Confirmar exclusão'}</button></deleteFetcher.Form></div></section></div>}
  </section>
}
