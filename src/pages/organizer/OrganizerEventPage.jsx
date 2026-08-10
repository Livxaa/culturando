import '../../css/organizer.css'
import OrganizerEventForm from '../../components/organizer/OrganizerEventForm.jsx'

export default function OrganizerEventPage() { return <section className="organizer-form-page page-section" aria-labelledby="new-event-title"><div className="container organizer-form-container"><p className="eyebrow">Área profissional</p><h1 id="new-event-title" tabIndex="-1">Cadastro de evento</h1><p className="organizer-form-intro">Compartilhe informações completas para que cada pessoa consiga se preparar para participar.</p><OrganizerEventForm /></div></section> }
