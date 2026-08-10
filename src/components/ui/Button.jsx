import { Link } from 'react-router-dom'

export default function Button({ children, className = '', variant = 'primary', to, ...props }) {
  const classes = `button button--${variant} ${className}`.trim()

  if (to) {
    return <Link className={classes} to={to} {...props}>{children}</Link>
  }

  return <button className={classes} {...props}>{children}</button>
}
