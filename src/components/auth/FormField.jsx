export default function FormField({ id, label, error, help, required = false, children }) {
  const descriptionId = error ? `${id}-error` : `${id}-help`
  return <div className={`form-field${error ? ' form-field--error' : ''}`}>
    <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': descriptionId, required })}
    <p id={descriptionId} className={error ? 'field-error' : 'field-help'}>{error || help}</p>
  </div>
}
