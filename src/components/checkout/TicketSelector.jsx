import { formatCurrency } from '../../utils/formatters.js'

export default function TicketSelector({ event, value, onChange }) {
  return <fieldset className="ticket-selector"><legend>Selecione o ingresso</legend>{[['inteira', 'Inteira', 'Ingresso completo'], ['meia', 'Meia entrada', 'Para pessoas com direito à meia entrada'], ['pcd', 'PCD', 'Ingresso com recurso de acessibilidade conforme a política do evento']].map(([id, label, help]) => <label className={`ticket-option${value === id ? ' is-selected' : ''}`} key={id}><input type="radio" name="ticketType" value={id} checked={value === id} onChange={() => onChange(id)} /><span><strong>{label}</strong><small>{help}</small></span><b>{formatCurrency(event.ticketPrices[id])}</b></label>)}</fieldset>
}
