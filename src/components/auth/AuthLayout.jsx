import BrandLogo from '../ui/BrandLogo'
import WaveBackdrop from '../ui/WaveBackdrop'

export default function AuthLayout({ title, children, eyebrow }) {
  return (
    <section className="auth-page page-section">
      <WaveBackdrop className="auth-page__wave" />
      <div className="auth-page__content">
        <BrandLogo />
        <div className="auth-card">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </section>
  )
}
