import '../../css/organizer.css'
import OrganizerEventEditor from '../../components/organizer/OrganizerEventEditor.jsx'

export default function OrganizerEditEventPage() { return <section className="organizer-form-page page-section" aria-labelledby="edit-event-title"><div className="container organizer-form-container"><p className="eyebrow">Área profissional</p><h1 id="edit-event-title" tabIndex="-1">Editar evento</h1><p className="organizer-form-intro">Atualize os dados para manter as informações públicas corretas e acessíveis.</p><OrganizerEventEditor /></div></section> }
