import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency, formatShortDate, formatTicketType } from '../../utils/formatters.js'
import { ROUTES } from '../../data/routes.js'

export default function ReceiptModal({ booking, onClose }) {
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  if (!booking) return null

  const {
    id,
    eventTitle,
    ticketType,
    quantity,
    total,
    validationCode,
    createdAt,
    paymentMethod,
    emailSentLog,
  } = booking

  const formattedDate = formatShortDate(createdAt || new Date().toISOString())
  const isPix = paymentMethod === 'pix'

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="receipt-backdrop" role="presentation">
      <div
        className="receipt-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-dialog-title"
      >
        <div aria-live="polite" className="visually-hidden">
          Pagamento confirmado com sucesso. Comprovante emitido para o evento {eventTitle}.
        </div>

        <div className="receipt-header">
          <p className="eyebrow">Comprovante Digital de Compra</p>
          <h2 id="receipt-dialog-title" tabIndex="-1" ref={headingRef}>
            Pedido Confirmado!
          </h2>
          <p className="receipt-status-tag">Status: Pago com Sucesso</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-qr-section">
            <div className="receipt-qr-code" aria-label={`QR Code de validação: ${validationCode}`}>
              <svg
                width="140"
                height="140"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Código QR Fictício para validação do ingresso"
              >
                <rect width="100" height="100" fill="#ffffff" />
                <path
                  d="M10 10H40V40H10V10ZM20 20V30H30V20H20ZM60 10H90V40H60V10ZM70 20V30H80V20H70ZM10 60H40V90H10V60ZM20 70V80H30V70H20ZM50 50H60V60H50V50ZM70 50H90V60H70V50ZM50 70H70V80H50V70ZM80 70H90V90H80V70ZM60 80H70V90H60V80Z"
                  fill="#111111"
                />
              </svg>
            </div>
            <div className="receipt-validation-info">
              <span className="receipt-code-label">Código de Autenticação</span>
              <strong className="receipt-code-value">{validationCode || `CULT-2026-${id.slice(-6).toUpperCase()}`}</strong>
              <small className="receipt-code-help">
                Apresente este código ou o QR Code na entrada do evento.
              </small>
            </div>
          </div>

          <dl className="receipt-details-list">
            <div>
              <dt>Evento</dt>
              <dd><strong>{eventTitle}</strong></dd>
            </div>
            <div>
              <dt>Tipo de Ingresso</dt>
              <dd>{formatTicketType(ticketType)} ({quantity}x)</dd>
            </div>
            <div>
              <dt>Valor Pago</dt>
              <dd><strong>{formatCurrency(total)}</strong></dd>
            </div>
            <div>
              <dt>Forma de Pagamento</dt>
              <dd>{isPix ? 'Pix (Aprovação Instantânea Sandbox)' : 'Cartão de Crédito Fictício'}</dd>
            </div>
            <div>
              <dt>Data e Hora</dt>
              <dd>{formattedDate}</dd>
            </div>
          </dl>

          {emailSentLog && (
            <div className="receipt-email-notice" role="status">
              <p>✉️ {emailSentLog}</p>
            </div>
          )}
        </div>

        <div className="receipt-actions">
          <button
            type="button"
            className="button button--secondary print-receipt-btn"
            onClick={handlePrint}
            aria-label="Imprimir ou Salvar comprovante em PDF"
          >
            🖨️ Imprimir / Salvar PDF
          </button>
          <Link
            to={ROUTES.BOOKINGS}
            className="button button--primary"
            aria-label="Ir para meus ingressos"
          >
            Ver Meus Ingressos
          </Link>
          {onClose && (
            <button
              type="button"
              className="button button--ghost"
              onClick={onClose}
              aria-label="Fechar comprovante"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
