import '../../css/pagamento.css'

function Pagamento() {
  return (
    <div className="payment-container">

      <div className="payment-box">

        <div className="payment-header">
          <h2>Pagamento</h2>
          <span>Selecione ingresso</span>
        </div>

        <div className="payment-content">

          <div className="payment-option">
            <p>Inteira</p>
            <input type="checkbox" />
          </div>

          <div className="payment-option">
            <p>Meia entrada</p>
            <input type="checkbox" />
          </div>

          <div className="payment-option">
            <p>PCD</p>
            <input type="checkbox" />
          </div>

          <div className="final-box">

            <h3>Valor Final</h3>

            <button className="btn">
              Pagar
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Pagamento;