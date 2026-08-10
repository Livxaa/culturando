import { useEffect, useRef, useState } from 'react'
import { Form, Link, useActionData, useNavigation } from 'react-router-dom'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, ROUTES } from '../../data/routes.js'
import StatusMessage from '../ui/StatusMessage.jsx'

const groupOptions = [
  ['fisica', 'Acessibilidade física', 'Rotas, assentos e circulação para pessoas com deficiência física.'],
  ['auditiva', 'Acessibilidade auditiva', 'Libras, legendas ou comunicação visual acessível.'],
  ['visual', 'Acessibilidade visual', 'Audiodescrição, sinalização e apoio para orientação.'],
  ['neurodivergente', 'Apoio a pessoas neurodivergentes', 'Previsibilidade, espaço de pausa e redução de estímulos.'],
]

function FieldError({ message }) {
  return message ? <p className="field-error">{message}</p> : null
}

export default function OrganizerEventForm() {
  const actionData = useActionData()
  const navigation = useNavigation()
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')
  const inputRef = useRef(null)
  const summaryRef = useRef(null)
  const errors = actionData?.fieldErrors || {}

  useEffect(() => {
    if (actionData && !actionData.ok) summaryRef.current?.focus()
  }, [actionData])

  const validateFile = (file) => {
    if (!file) return
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFileError('Use uma imagem PNG, JPG ou WebP.')
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFileError('A imagem deve ter no máximo 8 MB.')
      return
    }
    setFileError('')
    setFileName(file.name)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    validateFile(file)
    if (inputRef.current && file) {
      const transfer = new DataTransfer()
      transfer.items.add(file)
      inputRef.current.files = transfer.files
    }
  }

  if (actionData?.ok) {
    return <div className="organizer-success">
      <StatusMessage variant="success" title="Evento publicado com sucesso!">Sua experiência já está pronta para ser revisada pela equipe.</StatusMessage>
      <div className="organizer-success__actions">
        <Link className="button button--primary" to={ROUTES.EVENTS}>Ver página pública</Link>
        <Link className="button button--secondary" to={ROUTES.ORGANIZER_DASHBOARD}>Voltar ao painel</Link>
      </div>
    </div>
  }

  const values = actionData?.values || {}
  return <Form method="post" encType="multipart/form-data" className="organizer-event-form" noValidate>
    <div ref={summaryRef} className="form-progress" tabIndex="-1" aria-label="Etapas do cadastro">
      <span className="is-active">1. Detalhes</span><span>2. Mídia</span><span>3. Acessibilidade</span>
    </div>

    {actionData && <div className="form-error-summary" role="alert">
      <strong>Revise as informações do evento.</strong>
      <ul>{Object.entries(errors).map(([key, message]) => <li key={key}><a href={`#${key}`}>{message}</a></li>)}</ul>
    </div>}

    <fieldset className="form-section">
      <legend>Detalhes básicos</legend>
      <div className="form-field"><label htmlFor="title">Nome do evento *</label><input id="title" name="title" type="text" required aria-invalid={Boolean(errors.title)} defaultValue={values.title || ''} /><FieldError message={errors.title} /></div>
      <div className="form-grid-2">
        <div className="form-field"><label htmlFor="date">Data *</label><input id="date" name="date" type="date" required aria-invalid={Boolean(errors.date)} defaultValue={values.date || ''} /><FieldError message={errors.date} /></div>
        <div className="form-field"><label htmlFor="time">Horário *</label><input id="time" name="time" type="time" required aria-invalid={Boolean(errors.time)} defaultValue={values.time || ''} /><FieldError message={errors.time} /></div>
      </div>
      <div className="form-field"><label htmlFor="location">Localização *</label><textarea id="location" name="location" rows="2" required aria-invalid={Boolean(errors.location)} defaultValue={values.location || ''} placeholder="Endereço, sala, cidade e estado" /><FieldError message={errors.location} /></div>
      <div className="form-field"><label htmlFor="price">Valor do ingresso *</label><div className="input-affix"><span aria-hidden="true">R$</span><input id="price" name="price" type="number" min="0" step="0.01" required aria-invalid={Boolean(errors.price)} defaultValue={values.price || ''} /></div><FieldError message={errors.price} /></div>
      <div className="form-field"><label htmlFor="description">Descrição do evento *</label><textarea id="description" name="description" rows="5" required aria-invalid={Boolean(errors.description)} defaultValue={values.description || ''} placeholder="Conte o que as pessoas encontrarão nesta experiência." /><FieldError message={errors.description} /></div>
    </fieldset>

    <fieldset className="form-section">
      <legend>Mídia e fotos</legend>
      <div className={`file-dropzone${fileError || errors.coverImage ? ' file-dropzone--error' : ''}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
        <input ref={inputRef} id="coverImage" name="coverImage" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => validateFile(event.target.files[0])} />
        <label htmlFor="coverImage"><span className="file-dropzone__icon" aria-hidden="true">↥</span><strong>Arraste a foto principal do evento ou clique para buscar</strong><span>Formatos aceitos: PNG, JPG ou WebP. Até 8 MB.</span>{fileName && <b>Arquivo selecionado: {fileName}</b>}</label>
      </div>
      <FieldError message={fileError || errors.coverImage} />
      <StatusMessage variant="info" title="Dica de acessibilidade">Prefira imagens com bom contraste e descreva informações essenciais no texto alternativo quando publicar.</StatusMessage>
    </fieldset>

    <fieldset id="accessibilityGroups" className="form-section">
      <legend>Acessibilidade do evento</legend>
      <p className="form-section__intro">Quais públicos o evento consegue acolher? Selecione pelo menos uma opção. *</p>
      <div className="accessibility-options">{groupOptions.map(([id, label, description]) => <label className="accessibility-option" key={id}><input type="checkbox" name="accessibilityGroups" value={id} defaultChecked={values.accessibilityGroups?.includes(id)} /><span><strong>{label}</strong><small>{description}</small></span></label>)}</div>
      <FieldError message={errors.accessibilityGroups} />
      <div className="form-field"><label htmlFor="assistiveResources">Recursos assistivos disponíveis no local *</label><textarea id="assistiveResources" name="assistiveResources" rows="4" required aria-invalid={Boolean(errors.assistiveResources)} defaultValue={values.assistiveResources || ''} placeholder="Ex.: intérprete de Libras, audiodescrição, rampa…" /><FieldError message={errors.assistiveResources} /></div>
      <div className="form-field"><label htmlFor="onsiteSupport">Instruções de suporte no local *</label><textarea id="onsiteSupport" name="onsiteSupport" rows="4" required aria-invalid={Boolean(errors.onsiteSupport)} defaultValue={values.onsiteSupport || ''} placeholder="Explique como a pessoa encontrará a equipe e receberá apoio." /><FieldError message={errors.onsiteSupport} /></div>
    </fieldset>

    <div className="form-actions"><Link className="button button--ghost" to={ROUTES.ORGANIZER_DASHBOARD}>Voltar</Link><button className="button button--primary" type="submit" disabled={navigation.state === 'submitting'}>{navigation.state === 'submitting' ? 'Publicando…' : 'Publicar evento'}</button></div>
  </Form>
}
