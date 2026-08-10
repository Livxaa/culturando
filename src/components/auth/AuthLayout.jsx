import { Link } from 'react-router-dom'
import BrandLogo from '../ui/BrandLogo.jsx'

export default function AuthLayout({ title, eyebrow, description, alternateText, alternateLabel, alternateTo, children }) {
  return <section className="auth-page" aria-labelledby="auth-title">
    <div className="auth-page__brand"><BrandLogo /></div>
    <div className="auth-card">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="auth-title" tabIndex="-1">{title}</h1>
      <p className="auth-card__description">{description}</p>
      {children}
      <p className="auth-card__alternate">{alternateText} <Link to={alternateTo}>{alternateLabel}</Link></p>
    </div>
  </section>
}
