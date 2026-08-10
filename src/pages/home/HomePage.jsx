import { Link, useLoaderData } from 'react-router-dom'
import { ROUTES } from '../../data/routes'
import Button from '../../components/ui/Button'
import BrandLogo from '../../components/ui/BrandLogo'
import EventCarousel from '../../components/events/EventCarousel'
import WaveBackdrop from '../../components/ui/WaveBackdrop'
import '../../css/home.css'

export default function HomePage() {
  const { featuredEvents } = useLoaderData()

  return (
    <div className="home-page page-section">
      <WaveBackdrop className="home-page__wave" />
      <div className="shell-container home-page__content">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <p className="eyebrow">Cultura para todos</p>
            <h1 id="home-title">Bem-vindo ao <span>Culturando</span></h1>
            <p className="home-hero__lead">Sua melhor experiência cultural começa aqui: encontre eventos, encontros e histórias que aproximam pessoas.</p>
            <div className="home-hero__actions">
              <Button to={ROUTES.EVENTS}>Explorar eventos</Button>
              <Link className="text-link text-link--light" to={ROUTES.REGISTER}>Criar minha conta</Link>
            </div>
            <div className="home-hero__brand" aria-hidden="true"><BrandLogo /></div>
          </div>
          <EventCarousel events={featuredEvents} />
        </section>
      </div>
    </div>
  )
}
