import { useEffect, useRef, useState } from 'react'
import BrandLogo from '../ui/BrandLogo'
import MainNav from './MainNav'

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="site-header">
      <div className="shell-container site-header__inner">
        <BrandLogo />
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{isOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
        <div id="primary-navigation" className="site-header__nav">
          <MainNav isOpen={isOpen} onNavigate={closeMenu} />
        </div>
      </div>
    </header>
  )
}
