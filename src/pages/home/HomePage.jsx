import '../../css/home.css'
import { Link, useLoaderData } from 'react-router-dom'
import BrandLogo from '../../components/ui/BrandLogo.jsx'
import EventCarousel from '../../components/events/EventCarousel.jsx'

export default function HomePage() {
  const featuredEvents = useLoaderData()
  return <div className="home-page">
    <section className="home-hero page-section" aria-labelledby="home-title">
      <div className="container home-hero__grid">
        <div className="home-hero__copy"><p className="eyebrow">Agenda cultural</p><h1 id="home-title" tabIndex="-1">Viva a cultura do seu jeito</h1><p className="home-hero__lead">Eventos pensados para que mais pessoas possam chegar, participar e pertencer.</p><div className="home-hero__actions"><Link className="button button--primary" to="/shows">Explorar eventos</Link><Link className="text-link" to="/organizador/login">Sou organizador</Link></div><BrandLogo dark /></div>
        <EventCarousel events={featuredEvents} />
      </div>
    </section>
    <section className="home-intro page-section" aria-labelledby="home-intro-title"><div className="container"><p className="eyebrow">Culturando</p><h2 id="home-intro-title">Experiências culturais mais próximas e plurais</h2><p className="text-measure">Encontre encontros, espetáculos e celebrações com informações claras sobre acessibilidade antes de comprar.</p></div></section>
  </div>
}
