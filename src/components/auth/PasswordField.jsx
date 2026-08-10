import { useState } from 'react'

export default function PasswordField({ id = 'password', label = 'Senha', error, help = 'Use pelo menos 6 caracteres.', value = '', onChange, name = 'password', required = true, autoComplete = 'current-password' }) {
  const [visible, setVisible] = useState(false)
  const descriptionId = error ? `${id}-error` : `${id}-help`
  return <div className={`form-field${error ? ' form-field--error' : ''}`}>
    <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    <div className="password-field">
      <input id={id} name={name} type={visible ? 'text' : 'password'} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={descriptionId} required={required} autoComplete={autoComplete} />
      <button type="button" className="password-field__toggle" onClick={() => setVisible((current) => !current)} aria-pressed={visible}>{visible ? 'Ocultar' : 'Mostrar'}</button>
    </div>
    <p id={descriptionId} className={error ? 'field-error' : 'field-help'}>{error || help}</p>
  </div>
}
