export default function FormField({ id, label, error, helpText, required = false, children }) {
  const describedBy = [helpText && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children({ describedBy })}
      {helpText && <p id={`${id}-help`} className="form-field__help">{helpText}</p>}
      {error && <p id={`${id}-error`} className="form-field__error">{error}</p>}
    </div>
  )
}
