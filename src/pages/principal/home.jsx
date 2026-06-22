import '../../css/home.css';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <div className="home">
            {/* HEADER */}
            <header className="header">
                <div className="home-navbar">
                    <div className="nav-left">
                        {/* Espaço para logo ou outro elemento à esquerda */}
                    </div>
                    <div className="nav-links">
                        <Link to="/">Início</Link>
                        <Link to="/shows">Eventos</Link>
                        <Link to="/pagamento">Ingressos</Link>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="home-hero">
                <div className="hero-left">
                    <div className="hero-brand">
                        <h1 className="main-title">Bem-vindo ao</h1>
                        <img 
                            src={logo}
                            alt="Logo"
                            className="logo-img"
                        />
                    </div>
                    
                    <div className="home-text">
                        <p>
                            Sua melhor experiência cultural aqui!
                        </p>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-card">
                        <div className="hero-card-header">
                            <span className="hero-chip">Eventos</span>
                        </div>
                        
                        <div className="hero-img-container">
                             <div className="hero-img"></div>
                        </div>

                        <div className="hero-slider">
                            <span className="slider-dot active"></span>
                            <span className="slider-dot"></span>
                            <span className="slider-dot"></span>
                        </div>
                        
                        <button className="hero-card-cta">Clique aqui</button>
                    </div>
                </div>
            </section>
        </div>
    );
}