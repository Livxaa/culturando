import { useState } from 'react'

export default function PasswordField({ id, label, error, describedBy, required = true }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <div className="password-field">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          autoComplete={id === 'password' ? 'current-password' : 'new-password'}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
        <button type="button" className="password-field__toggle" onClick={() => setVisible((value) => !value)}>
          {visible ? 'Ocultar senha' : 'Mostrar senha'}
        </button>
      </div>
      {error && <p id={`${id}-error`} className="form-field__error">{error}</p>}
    </div>
  )
}
