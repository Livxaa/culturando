import { useState } from 'react'
import { useAccessibility } from '../../context/AccessibilityContext.jsx'
import { eventsService } from '../../services/dataService.js'

const GROUP_LABELS = {
  fisica: { label: 'Acessibilidade Motora', icon: '♿' },
  visual: { label: 'Acessibilidade Visual', icon: '👁️' },
  auditiva: { label: 'Acessibilidade Auditiva', icon: '🤟' },
  neurodivergente: { label: 'Neurodivergência / Sensorial', icon: '🧩' },
  geral: { label: 'Acessibilidade Geral', icon: '🌟' },
}

export default function CommunityReviews({ event, onReviewAdded }) {
  const { announce } = useAccessibility();
  const reviews = event.communityReviews || []

  const [author, setAuthor] = useState('')
  const [userRole, setUserRole] = useState('PCD (Pessoa com Deficiência)')
  const [accessibilityGroup, setAccessibilityGroup] = useState('fisica')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
      : null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    setSubmitting(true)

    try {
      const updatedEvent = eventsService.addReview(event.id, {
        author: author.trim() || 'Usuário Culturando',
        userRole,
        accessibilityGroup,
        rating,
        comment: comment.trim(),
      })

      setComment('')
      setAuthor('')
      setFeedbackMsg('Obrigado! Sua avaliação sobre a acessibilidade real do local foi publicada com sucesso.')

      if (onReviewAdded && updatedEvent) {
        onReviewAdded(updatedEvent)
      }
    } catch {
      setFeedbackMsg('Erro ao salvar avaliação. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="community-reviews" aria-labelledby="reviews-heading">
      <div className="community-reviews__header">
        <div>
          <h2 id="reviews-heading">Avaliações da Comunidade sobre Acessibilidade</h2>
          <p className="community-reviews__sub">
            Relatos reais de Pessoas com Deficiência (PCDs) e seus familiares sobre a infraestrutura e o suporte do local.
          </p>
        </div>

        {averageRating && (
          <div className="community-reviews__score-box" role="region" aria-label="Média de avaliações">
            <span className="community-reviews__score-val" aria-label={`Nota média ${averageRating} de 5`}>
              ⭐ {averageRating}
            </span>
            <span className="community-reviews__score-count">
              {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
            </span>
          </div>
        )}
      </div>

      {/* Formulário de Avaliação */}
      <form className="community-reviews__form" onSubmit={handleSubmit} aria-labelledby="add-review-title">
        <h3 id="add-review-title">Deixar relato sobre a acessibilidade deste local</h3>

        {feedbackMsg && (
          <div className="community-reviews__alert" role="status" aria-live="polite">
            {feedbackMsg}
          </div>
        )}

        <div className="community-reviews__form-grid">
          <div className="community-reviews__field">
            <label htmlFor="rev-author">Seu Nome (opcional):</label>
            <input
              id="rev-author"
              type="text"
              className="community-reviews__input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Ana Maria"
            />
          </div>

          <div className="community-reviews__field">
            <label htmlFor="rev-role">Seu Perfil / Vínculo:</label>
            <select
              id="rev-role"
              className="community-reviews__select"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="PCD (Pessoa com Deficiência)">PCD (Pessoa com Deficiência)</option>
              <option value="Familiar / Acompanhante">Familiar / Acompanhante de PCD</option>
              <option value="Profissional de Acessibilidade">Profissional de Acessibilidade</option>
              <option value="Visitante / Aliado">Visitante / Aliado</option>
            </select>
          </div>

          <div className="community-reviews__field">
            <label htmlFor="rev-group">Categoria de Acessibilidade Avaliada:</label>
            <select
              id="rev-group"
              className="community-reviews__select"
              value={accessibilityGroup}
              onChange={(e) => setAccessibilityGroup(e.target.value)}
            >
              <option value="fisica">♿ Motora (Rampas, elevadores, banheiros)</option>
              <option value="visual">👁️ Visual (Audiodescrição, mapas táteis)</option>
              <option value="auditiva">🤟 Auditiva (Libras, legendas)</option>
              <option value="neurodivergente">🧩 Neurodivergência / Sensorial (Pausa, abafadores)</option>
              <option value="geral">🌟 Estrutura Geral</option>
            </select>
          </div>

          <div className="community-reviews__field">
            <span className="community-reviews__label" id="rating-stars-label">
              Sua Nota (1 a 5 estrelas):
            </span>
            <div className="community-reviews__stars-picker" role="group" aria-labelledby="rating-stars-label">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`community-reviews__star-btn ${rating >= star ? 'community-reviews__star-btn--selected' : ''}`}
                  onClick={() => setRating(star)}
                  aria-pressed={rating === star}
                  aria-label={`Nota ${star} de 5 estrelas`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="community-reviews__field">
          <label htmlFor="rev-comment">Relato sobre a experiência real de acessibilidade:</label>
          <textarea
            id="rev-comment"
            className="community-reviews__textarea"
            rows="3"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte se o acesso foi fácil, se havia sinalização adequada, equipe prestativa, assentos reservados ou salas de descanso..."
          />
        </div>

        <button type="submit" className="button button--primary" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Publicar Avaliação'}
        </button>
      </form>

      {/* Lista de Avaliações */}
      <div className="community-reviews__list-wrapper">
        <h3>Relatos publicados ({reviews.length})</h3>

        {reviews.length === 0 ? (
          <p className="community-reviews__empty">
            Ainda não há avaliações da comunidade para este evento. Seja o primeiro a compartilhar sua experiência!
          </p>
        ) : (
          <ul className="community-reviews__list" aria-label="Lista de avaliações da comunidade">
            {reviews.map((rev) => {
              const groupInfo = GROUP_LABELS[rev.accessibilityGroup] || GROUP_LABELS.geral
              return (
                <li
                  key={rev.id}
                  className="community-reviews__card"
                  onFocus={() => announce(`Avaliação de ${rev.author}, nota ${rev.rating} de 5. ${rev.comment}`)}
                  onMouseEnter={() => announce(`Avaliação de ${rev.author}, nota ${rev.rating} de 5. ${rev.comment}`)}
                  aria-label={`Avaliação de ${rev.author}, nota ${rev.rating} de 5. ${rev.comment}`}
                >
                  <div className="community-reviews__card-top">
                    <div>
                      <strong className="community-reviews__author">{rev.author}</strong>
                      <span className="community-reviews__badge community-reviews__badge--role">
                        {rev.userRole}
                      </span>
                    </div>
                    <div className="community-reviews__stars" aria-label={`Nota ${rev.rating} de 5`}>
                      {'★'.repeat(rev.rating)}
                      {'☆'.repeat(5 - rev.rating)}
                    </div>
                  </div>

                  <div className="community-reviews__card-meta">
                    <span className="community-reviews__badge community-reviews__badge--group">
                      <span aria-hidden="true">{groupInfo.icon}</span> {groupInfo.label}
                    </span>
                    <time dateTime={rev.date} className="community-reviews__date">
                      {rev.date}
                    </time>
                  </div>

                  <p className="community-reviews__comment">{rev.comment}</p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
