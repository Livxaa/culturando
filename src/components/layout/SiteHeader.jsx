import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../ui/BrandLogo.jsx'
import MainNav from './MainNav.jsx'

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  useEffect(() => { const handleKeyDown = (event) => { if (event.key === 'Escape' && isOpen) { setIsOpen(false); buttonRef.current?.focus() } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown) }, [isOpen])
  return <header className="site-header"><div className="site-header__inner"><Link className="site-header__brand" to="/" aria-label="Ir para a página inicial"><BrandLogo /></Link><button ref={buttonRef} className="site-header__menu-button" type="button" aria-expanded={isOpen} aria-controls="main-navigation" onClick={() => setIsOpen((value) => !value)}>{isOpen ? 'Fechar menu' : 'Abrir menu'}</button><MainNav isOpen={isOpen} /></div></header>
}
