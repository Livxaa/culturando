export default function PaymentMethodSelector({ value, onChange }) {
  return (
    <fieldset className="payment-selector" aria-labelledby="payment-selector-legend">
      <legend id="payment-selector-legend" className="payment-selector__legend">
        Forma de pagamento (Ambiente Sandbox / Teste)
      </legend>
      <div
        className="payment-selector__options"
        role="radiogroup"
        aria-label="Escolha a forma de pagamento"
      >
        <label
          className={`payment-option ${value === 'pix' ? 'is-selected' : ''}`}
          htmlFor="payment-pix"
        >
          <input
            id="payment-pix"
            type="radio"
            name="paymentMethod"
            value="pix"
            checked={value === 'pix'}
            onChange={() => onChange('pix')}
            aria-checked={value === 'pix'}
          />
          <div className="payment-option__info">
            <strong>Pix (Sandbox Instantâneo)</strong>
            <span>Gere o QR Code e aprove o pagamento em ambiente de teste com 0% de taxa.</span>
          </div>
        </label>

        <label
          className={`payment-option ${value === 'card' ? 'is-selected' : ''}`}
          htmlFor="payment-card"
        >
          <input
            id="payment-card"
            type="radio"
            name="paymentMethod"
            value="card"
            checked={value === 'card'}
            onChange={() => onChange('card')}
            aria-checked={value === 'card'}
          />
          <div className="payment-option__info">
            <strong>Cartão de Crédito Fictício</strong>
            <span>Simulação direta de transação bancária aprovada (Cartão Teste 4000...).</span>
          </div>
        </label>
      </div>
    </fieldset>
  )
}
