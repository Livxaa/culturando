export default function StatusMessage({ children, tone = 'info', className = '', ...props }) {
  return (
    <div className={`status-message status-message--${tone} ${className}`.trim()} role={tone === 'error' ? 'alert' : 'status'} {...props}>
      {children}
    </div>
  )
}
