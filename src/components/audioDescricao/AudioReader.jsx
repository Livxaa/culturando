import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useAccessibility } from '../../context/AccessibilityContext.jsx'

export function AudioReader() {
  const {
    isSpeaking,
    speak,
    stopSpeaking,
    announce,
    pointAndReadActive,
    setPointAndReadActive,
    togglePointAndRead,
  } = useAccessibility()

  const [isPaused, setIsPaused] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [showSectionsMenu, setShowSectionsMenu] = useState(false)
  const [sections, setSections] = useState([])
  const hoveredElementRef = useRef(null)

  // Escuta seleção de texto pelo usuário na página
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()?.toString()?.trim()
      if (selection && selection.length > 1) {
        setSelectedText(selection)
      } else {
        setSelectedText('')
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [])

  // Atualiza as seções da página atual quando abrir o menu
  const carregarSecoesDaPagina = useCallback(() => {
    if (typeof document === 'undefined') return
    const headings = Array.from(document.querySelectorAll('main h1, main h2, main h3, #main-content h1, #main-content h2, #main-content h3'))
      .map((el, index) => ({
        id: el.id || `secao-${index}`,
        text: el.innerText.replace(/\s+/g, ' ').trim(),
        element: el,
      }))
      .filter((item) => item.text.length > 0)
    setSections(headings)
  }, [])

  // Cancela áudio ao navegar de página
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setIsPaused(false)
      setShowSectionsMenu(false)
      if (pointAndReadActive) {
        setPointAndReadActive(false)
      }
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [pointAndReadActive, setPointAndReadActive])

  // Lógica do Modo "Apontar e Ler" (Hover + Clique em partes específicas)
  useEffect(() => {
    if (!pointAndReadActive) {
      if (hoveredElementRef.current) {
        hoveredElementRef.current.classList.remove('audio-reader-hovered')
        hoveredElementRef.current = null
      }
      document.body.classList.remove('audio-reader-pointing-mode')
      return
    }

    document.body.classList.add('audio-reader-pointing-mode')

    const isInsideWidget = (el) =>
      Boolean(el.closest('.audio-reader-widget') || el.closest('.accessibility-bar') || el.closest('.audio-reader-banner'))

    const handleMouseOver = (e) => {
      if (isInsideWidget(e.target)) return

      const targetBlock =
        e.target.closest(
          'h1, h2, h3, h4, p, li, article, label, dt, dd, .event-card, .featured-card, .community-reviews__card, .search-filters'
        ) || e.target

      if (hoveredElementRef.current && hoveredElementRef.current !== targetBlock) {
        hoveredElementRef.current.classList.remove('audio-reader-hovered')
      }

      hoveredElementRef.current = targetBlock
      targetBlock.classList.add('audio-reader-hovered')
    }

    const handleMouseOut = (e) => {
      if (hoveredElementRef.current && (!e.relatedTarget || !hoveredElementRef.current.contains(e.relatedTarget))) {
        hoveredElementRef.current.classList.remove('audio-reader-hovered')
        hoveredElementRef.current = null
      }
    }

    const handleClick = (e) => {
      if (isInsideWidget(e.target)) return

      e.preventDefault()
      e.stopPropagation()

      const targetBlock =
        e.target.closest(
          'h1, h2, h3, h4, p, li, article, label, dt, dd, .event-card, .featured-card, .community-reviews__card, .search-filters'
        ) || e.target

      // Cria clone para extrair texto limpo
      const clone = targetBlock.cloneNode(true)
      clone.querySelectorAll('script, style, noscript, .visually-hidden, .sr-only').forEach((el) => el.remove())

      // Converte imagens com alt em descrição falada
      clone.querySelectorAll('img').forEach((img) => {
        const alt = img.getAttribute('alt')
        if (alt && alt.trim()) {
          const span = document.createElement('span')
          span.innerText = ` [Imagem: ${alt.trim()}]. `
          img.parentNode?.insertBefore(span, img)
        }
        img.remove()
      })

      const texto = clone.innerText ? clone.innerText.replace(/\s+/g, ' ').trim() : ''

      if (texto) {
        announce(`Lendo trecho selecionado: ${texto.slice(0, 40)}...`)
        speak(texto)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPointAndReadActive(false)
        announce('Modo Apontar e Ler desativado.')
      }
    }

    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('audio-reader-pointing-mode')
      if (hoveredElementRef.current) {
        hoveredElementRef.current.classList.remove('audio-reader-hovered')
        hoveredElementRef.current = null
      }
    }
  }, [pointAndReadActive, setPointAndReadActive, announce, speak])

  const extrairTextoAcessivel = useCallback(() => {
    if (typeof document === 'undefined') return ''

    const mainElement = document.querySelector('main') || document.querySelector('#main-content') || document.body
    if (!mainElement) return ''

    const clone = mainElement.cloneNode(true)
    const elementosParaRemover = clone.querySelectorAll(
      'script, style, noscript, .visually-hidden, .sr-only, .skip-link, .accessibility-bar, nav, [aria-hidden="true"]'
    )
    elementosParaRemover.forEach((el) => el.remove())

    const imagens = clone.querySelectorAll('img')
    imagens.forEach((img) => {
      const altText = img.getAttribute('alt')
      if (altText && altText.trim()) {
        const textoDescritivo = document.createTextNode(` [Imagem: ${altText.trim()}]. `)
        img.parentNode?.insertBefore(textoDescritivo, img)
      }
      img.remove()
    })

    const h1 = document.querySelector('h1')
    const pageTitle = h1?.innerText?.trim() || document.title || 'Culturando'
    const corpoTexto = clone.innerText ? clone.innerText.replace(/\s+/g, ' ').trim() : ''

    if (!corpoTexto) return ''
    return `Início da audiodescrição da página. ${pageTitle}. ${corpoTexto}. Fim da audiodescrição.`
  }, [])

  const lerPaginaInteira = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não possui suporte nativo para leitura de texto em voz alta.')
      return
    }

    if (isSpeaking && !isPaused) {
      stopSpeaking()
      return
    }

    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      announce('Audiodescrição retomada.')
      return
    }

    const texto = extrairTextoAcessivel()
    if (!texto) {
      announce('Nenhum texto encontrado nesta página para leitura.')
      return
    }

    announce('Iniciando audiodescrição completa da página...')
    speak(texto)
  }

  const lerTextoSelecionado = () => {
    if (!selectedText) return
    announce('Lendo texto selecionado.')
    speak(`Trecho selecionado: ${selectedText}`)
  }

  const lerSecaoEspecifica = (secao) => {
    if (!secao?.element) return
    setShowSectionsMenu(false)
    secao.element.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Extrai o conteúdo da seção (o cabeçalho e os parágrafos seguintes até o próximo título)
    let texto = secao.text + '. '
    let sibling = secao.element.nextElementSibling
    while (sibling && !['H1', 'H2', 'H3'].includes(sibling.tagName)) {
      if (sibling.innerText) {
        texto += sibling.innerText.replace(/\s+/g, ' ').trim() + '. '
      }
      sibling = sibling.nextElementSibling
    }

    announce(`Lendo seção: ${secao.text}`)
    speak(`Seção: ${texto}`)
  }

  const alternarPausa = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      announce('Audiodescrição retomada.')
    } else {
      window.speechSynthesis.pause()
      setIsPaused(true)
      announce('Audiodescrição pausada.')
    }
  }

  const pararLeitura = () => {
    stopSpeaking()
    setIsPaused(false)
    announce('Audiodescrição interrompida.')
  }

  return (
    <>
      {/* Banner Informativo quando o Modo "Apontar e Ler" está ativo */}
      {pointAndReadActive && (
        <div className="audio-reader-banner" role="status" aria-live="polite">
          <span className="audio-reader-banner__icon" aria-hidden="true">
            🎯
          </span>
          <span className="audio-reader-banner__text">
            <strong>Modo Ler Trecho Ativo:</strong> Passe o cursor e clique em qualquer parte, card ou texto da página para ouvir.
          </span>
          <button
            type="button"
            className="audio-reader-banner__close"
            onClick={togglePointAndRead}
            title="Sair do modo ler trecho (Atalho: ESC)"
          >
            ✕ Desativar (ESC)
          </button>
        </div>
      )}

      {/* Widget Flutuante de Audiodescrição Universal */}
      <aside className="audio-reader-widget" aria-label="Ferramenta de audiodescrição e leitura de partes da página">
        <div className="audio-reader-widget__container">
          {/* Botão de Ler Tudo */}
          <button
            type="button"
            onClick={lerPaginaInteira}
            className={`audio-reader-widget__btn audio-reader-widget__btn--primary ${
              isSpeaking ? 'audio-reader-widget__btn--active' : ''
            }`}
            aria-pressed={isSpeaking}
            title={isSpeaking ? 'Parar audiodescrição' : 'Ouvir toda a página'}
          >
            <span aria-hidden="true">{isSpeaking ? (isPaused ? '⏸️' : '🔊') : '🎧'}</span>
            <span className="audio-reader-widget__label">
              {isSpeaking ? (isPaused ? 'Pausado' : 'Ouvindo Página') : 'Audiodescrição'}
            </span>
          </button>

          {/* Botão de Modo Apontar e Ler Parte Específica */}
          <button
            type="button"
            onClick={togglePointAndRead}
            className={`audio-reader-widget__btn audio-reader-widget__btn--select-part ${
              pointAndReadActive ? 'audio-reader-widget__btn--active' : ''
            }`}
            aria-pressed={pointAndReadActive}
            title="Escolher uma parte específica clicando diretamente nela"
          >
            <span aria-hidden="true">🎯</span>
            <span className="audio-reader-widget__label">
              {pointAndReadActive ? 'Apontando...' : 'Ler Trecho'}
            </span>
          </button>

          {/* Botão de Escolher Seção */}
          <button
            type="button"
            onClick={() => {
              carregarSecoesDaPagina()
              setShowSectionsMenu((prev) => !prev)
            }}
            className="audio-reader-widget__btn audio-reader-widget__btn--sections"
            aria-expanded={showSectionsMenu}
            title="Escolher uma seção ou tópico da página para ouvir"
          >
            <span aria-hidden="true">📑</span>
            <span className="audio-reader-widget__label">Seções</span>
          </button>

          {/* Botão rápido se o usuário tiver selecionado um texto com o cursor */}
          {selectedText && (
            <button
              type="button"
              onClick={lerTextoSelecionado}
              className="audio-reader-widget__btn audio-reader-widget__btn--selected-text"
              title={`Ler o texto selecionado: "${selectedText.slice(0, 30)}..."`}
            >
              <span aria-hidden="true">📝</span>
              <span>Ler Seleção</span>
            </button>
          )}

          {/* Controles de pausa e parada durante a reprodução */}
          {isSpeaking && (
            <div className="audio-reader-widget__controls">
              <button
                type="button"
                onClick={alternarPausa}
                className="audio-reader-widget__btn audio-reader-widget__btn--secondary"
                title={isPaused ? 'Retomar leitura' : 'Pausar leitura'}
                aria-label={isPaused ? 'Retomar audiodescrição' : 'Pausar audiodescrição'}
              >
                <span aria-hidden="true">{isPaused ? '▶️' : '⏸️'}</span>
                <span>{isPaused ? 'Continuar' : 'Pausar'}</span>
              </button>

              <button
                type="button"
                onClick={pararLeitura}
                className="audio-reader-widget__btn audio-reader-widget__btn--stop"
                title="Parar áudio imediatamente"
                aria-label="Parar audiodescrição"
              >
                <span aria-hidden="true">⏹️</span>
                <span>Parar</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Flutuante de Seções */}
        {showSectionsMenu && (
          <div className="audio-reader-sections-menu" role="dialog" aria-label="Selecione uma seção para ouvir">
            <div className="audio-reader-sections-menu__header">
              <strong>Partes disponíveis nesta página:</strong>
              <button
                type="button"
                onClick={() => setShowSectionsMenu(false)}
                className="audio-reader-sections-menu__close"
                aria-label="Fechar menu de seções"
              >
                ✕
              </button>
            </div>

            {sections.length === 0 ? (
              <p className="audio-reader-sections-menu__empty">Nenhum título identificado nesta página.</p>
            ) : (
              <ul className="audio-reader-sections-menu__list">
                {sections.map((sec, idx) => (
                  <li key={sec.id || idx}>
                    <button
                      type="button"
                      onClick={() => lerSecaoEspecifica(sec)}
                      className="audio-reader-sections-menu__item"
                    >
                      <span aria-hidden="true">🔊</span> {sec.text}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </aside>
    </>
  )
}

export default AudioReader
