export default function StatusMessage({ variant = 'info', title, children, role = 'status' }) {
  return <div className={`status-message status-message--${variant}`} role={role} aria-live="polite">
    {title && <strong>{title}</strong>}
    {children && <p>{children}</p>}
  </div>
}
