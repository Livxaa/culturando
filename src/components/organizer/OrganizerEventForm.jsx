import { useEffect, useRef, useState } from 'react'
import { Form, useActionData, useNavigation } from 'react-router-dom'
import Button from '../ui/Button'
import StatusMessage from '../ui/StatusMessage'

const accessibilityOptions = [
  { value: 'wheelchair', label: 'Pessoas com deficiência física', description: 'Rotas acessíveis, circulação sem barreiras e banheiro adaptado.' },
  { value: 'libras', label: 'Pessoas surdas ou com deficiência auditiva', description: 'Intérprete de Libras, legendas ou apoio de comunicação.' },
  { value: 'audio', label: 'Pessoas cegas ou com baixa visão', description: 'Audiodescrição, materiais acessíveis e orientação no local.' },
  { value: 'neurodivergent', label: 'Pessoas neurodivergentes', description: 'Espaço calmo, previsibilidade e redução de estímulos.' },
]

export default function OrganizerEventForm() {
  const actionData = useActionData()
  const navigation = useNavigation()
  const fileInputRef = useRef(null)
  const statusRef = useRef(null)
  const [selectedSupports, setSelectedSupports] = useState([])
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const errors = actionData?.fieldErrors || {}
  const isSubmitting = navigation.state === 'submitting'

  useEffect(() => {
    if (actionData?.ok === false) statusRef.current?.focus()
  }, [actionData])

  function handleFile(file) {
    if (!file) return
    setFileName(file.name)
    const transfer = new DataTransfer()
    transfer.items.add(file)
    if (fileInputRef.current) fileInputRef.current.files = transfer.files
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    handleFile(event.dataTransfer.files?.[0])
  }

  function toggleSupport(value) {
    setSelectedSupports((supports) => supports.includes(value)
      ? supports.filter((support) => support !== value)
      : [...supports, value])
  }

  return (
    <>
      {actionData?.message && (
        <div ref={statusRef} tabIndex="-1" className="organizer-form__status">
          <StatusMessage tone={actionData.ok ? 'success' : 'error'}>{actionData.message}</StatusMessage>
        </div>
      )}
      {actionData?.ok ? (
        <section className="organizer-success" aria-labelledby="organizer-success-title">
          <p className="organizer-success__mark" aria-hidden="true">✓</p>
          <h2 id="organizer-success-title">Evento publicado com sucesso!</h2>
          <p>Recebemos as informações de <strong>{actionData.event.title}</strong>. Você poderá revisar os próximos passos na sua visão geral.</p>
          <Button to="/organizador">Voltar para a visão geral</Button>
        </section>
      ) : (
        <Form method="post" encType="multipart/form-data" className="organizer-event-form">
          <ol className="form-progress" aria-label="Etapas do cadastro">
            <li className="is-active">1. Detalhes</li>
            <li>2. Mídia</li>
            <li>3. Acessibilidade</li>
          </ol>

          <section className="organizer-form-section" aria-labelledby="details-title">
            <div className="organizer-form-section__heading">
              <p className="eyebrow">Etapa 1</p>
              <h2 id="details-title">Conte sobre o evento</h2>
              <p>Essas informações serão usadas para apresentar a experiência para quem compra ingressos.</p>
            </div>
            <div className="organizer-form-grid">
              <FormField id="title" label="Nome do evento" error={errors.title} required>
                <input id="title" name="title" type="text" required aria-invalid={Boolean(errors.title)} />
              </FormField>
              <FormField id="date" label="Data" error={errors.date} required>
                <input id="date" name="date" type="date" required aria-invalid={Boolean(errors.date)} />
              </FormField>
              <FormField id="time" label="Horário" error={errors.time} required>
                <input id="time" name="time" type="time" required aria-invalid={Boolean(errors.time)} />
              </FormField>
              <FormField id="location" label="Localização" error={errors.location} required className="is-wide">
                <textarea id="location" name="location" rows="3" placeholder="Endereço, espaço e orientações para chegar" required aria-invalid={Boolean(errors.location)} />
              </FormField>
              <FormField id="cost" label="Valor do ingresso" error={errors.cost} required>
                <div className="currency-field"><span aria-hidden="true">R$</span><input id="cost" name="cost" type="number" min="0" step="0.01" required aria-invalid={Boolean(errors.cost)} /></div>
              </FormField>
              <FormField id="description" label="Descrição do evento" error={errors.description} required className="is-wide">
                <textarea id="description" name="description" rows="5" placeholder="Conte o que as pessoas irão vivenciar" required aria-invalid={Boolean(errors.description)} />
              </FormField>
            </div>
          </section>

          <section className="organizer-form-section" aria-labelledby="media-title">
            <div className="organizer-form-section__heading">
              <p className="eyebrow">Etapa 2</p>
              <h2 id="media-title">Escolha uma imagem</h2>
              <p>Uma imagem clara ajuda as pessoas a reconhecerem o evento. Prefira boa iluminação e contraste.</p>
            </div>
            <div
              className={`upload-zone ${isDragging ? 'is-dragging' : ''}`}
              onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <p className="upload-zone__mark" aria-hidden="true">↑</p>
              <p><strong>Arraste a foto principal aqui</strong> ou escolha um arquivo no seu dispositivo.</p>
              <label className="button button--secondary" htmlFor="photo">Buscar foto</label>
              <input ref={fileInputRef} id="photo" name="photo" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFile(event.target.files?.[0])} />
              {fileName && <p className="upload-zone__file" role="status">Arquivo selecionado: {fileName}</p>}
            </div>
            <StatusMessage tone="info">Descreva a imagem no texto alternativo quando ela for publicada. Evite usar texto essencial dentro da foto.</StatusMessage>
          </section>

          <section className="organizer-form-section" aria-labelledby="accessibility-title">
            <div className="organizer-form-section__heading">
              <p className="eyebrow">Etapa 3</p>
              <h2 id="accessibility-title">Planeje uma experiência acessível</h2>
              <p>Marque os recursos disponíveis e explique como a equipe vai acolher as pessoas no local.</p>
            </div>
            <fieldset className="support-options">
              <legend>Quais pessoas com deficiência o evento consegue acolher?</legend>
              <div className="support-options__grid">
                {accessibilityOptions.map((option) => (
                  <label className={`support-option ${selectedSupports.includes(option.value) ? 'is-selected' : ''}`} key={option.value}>
                    <input type="checkbox" name="supportTypes" value={option.value} checked={selectedSupports.includes(option.value)} onChange={() => toggleSupport(option.value)} />
                    <span className="support-option__text"><strong>{option.label}</strong><small>{option.description}</small></span>
                    <span className="support-option__check" aria-hidden="true">✓</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <FormField id="disabilityAudience" label="Descrição do público que será acolhido" error={errors.disabilityAudience} required>
              <textarea id="disabilityAudience" name="disabilityAudience" rows="4" placeholder="Explique quais necessidades foram consideradas e quais limitações ainda existem" required aria-invalid={Boolean(errors.disabilityAudience)} />
            </FormField>
            <FormField id="onSiteSupport" label="Apoio disponível no local" error={errors.onSiteSupport} required>
              <textarea id="onSiteSupport" name="onSiteSupport" rows="4" placeholder="Ex.: equipe identificada com colete amarelo, rota acessível e intérprete na entrada" required aria-invalid={Boolean(errors.onSiteSupport)} />
            </FormField>
          </section>

          <div className="organizer-form__actions">
            <p>Ao publicar, você confirma que as informações de acessibilidade estão atualizadas.</p>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Publicando...' : 'Publicar evento'}</Button>
          </div>
        </Form>
      )}
    </>
  )
}

function FormField({ id, label, error, required, className = '', children }) {
  return (
    <div className={`form-field ${className} ${error ? 'has-error' : ''}`.trim()}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {error && <p className="form-field__error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
