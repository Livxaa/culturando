import { formatBRL } from '../events/EventMeta'

const ticketOptions = [
  { value: 'inteira', label: 'Inteira', description: 'Ingresso com valor integral.' },
  { value: 'meia', label: 'Meia entrada', description: 'Sujeita às regras de comprovação vigentes.' },
  { value: 'pcd', label: 'PCD', description: 'Ingresso acessível conforme a política do evento.' },
]

export default function TicketSelector({ event, selectedType, onTypeChange, quantity, onQuantityChange }) {
  return (
    <fieldset className="ticket-selector">
      <legend>Selecione seu ingresso</legend>
      <div className="ticket-options">
        {ticketOptions.map((option) => (
          <label className={`ticket-option ${selectedType === option.value ? 'is-selected' : ''}`} key={option.value}>
            <input type="radio" name="ticketType" value={option.value} checked={selectedType === option.value} onChange={() => onTypeChange(option.value)} required />
            <span className="ticket-option__copy">
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
            <span className="ticket-option__price">{formatBRL(event.ticketPrices[option.value])}</span>
          </label>
        ))}
      </div>
      <label className="quantity-field" htmlFor="quantity">
        <span>Quantidade</span>
        <select id="quantity" name="quantity" value={quantity} onChange={(event) => onQuantityChange(Number(event.target.value))}>
          {Array.from({ length: 8 }, (_, index) => index + 1).map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <p className="field-note">Se precisar de uma adaptação ou apoio para acessar o evento, fale com a produção antes da compra.</p>
    </fieldset>
  )
}
