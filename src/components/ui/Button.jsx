export default function Button({ children, variant = 'primary', type = 'button', disabled = false, ...props }) {
  return <button type={type} className={`button button--${variant}`} disabled={disabled} {...props}>{children}</button>
}
