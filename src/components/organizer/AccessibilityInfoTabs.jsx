import { useRef, useState } from 'react'

const panels = [
  {
    id: 'communication',
    label: 'Comunicação',
    title: 'Prepare uma comunicação que inclua todo mundo',
    content: 'Informe com antecedência quais recursos estarão disponíveis. Use linguagem simples, divulgue horários, acessos, valores e um canal para tirar dúvidas antes do evento.',
  },
  {
    id: 'arrival',
    label: 'Chegada e circulação',
    title: 'Pense no caminho desde a chegada',
    content: 'Verifique calçadas, rampas, portas, filas, banheiros e assentos. Mantenha rotas acessíveis desobstruídas e combine quem estará disponível para orientar sem tocar ou conduzir alguém sem consentimento.',
  },
  {
    id: 'sensory',
    label: 'Apoio sensorial',
    title: 'Reduza barreiras sensoriais e de comunicação',
    content: 'Reserve um espaço calmo, avise sobre luzes e sons intensos, ofereça pausas e treine a equipe para perguntar qual apoio a pessoa prefere.',
  },
]

export default function AccessibilityInfoTabs() {
  const [activeId, setActiveId] = useState(panels[0].id)
  const tabRefs = useRef([])
  const activeIndex = panels.findIndex((panel) => panel.id === activeId)

  function moveTab(direction) {
    const nextIndex = direction === 'next'
      ? (activeIndex + 1) % panels.length
      : (activeIndex - 1 + panels.length) % panels.length
    const nextPanel = panels[nextIndex]
    setActiveId(nextPanel.id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="info-tabs">
      <div className="info-tabs__list" role="tablist" aria-label="Orientações de acessibilidade">
        {panels.map((panel, index) => (
          <button
            ref={(element) => { tabRefs.current[index] = element }}
            key={panel.id}
            id={`tab-${panel.id}`}
            type="button"
            role="tab"
            aria-selected={activeId === panel.id}
            aria-controls={`panel-${panel.id}`}
            tabIndex={activeId === panel.id ? 0 : -1}
            onClick={() => setActiveId(panel.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); moveTab('next') }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); moveTab('previous') }
              if (event.key === 'Home') { event.preventDefault(); setActiveId(panels[0].id); tabRefs.current[0]?.focus() }
              if (event.key === 'End') { event.preventDefault(); setActiveId(panels[panels.length - 1].id); tabRefs.current[panels.length - 1]?.focus() }
            }}
          >
            {panel.label}
          </button>
        ))}
      </div>
      {panels.map((panel) => (
        <section key={panel.id} id={`panel-${panel.id}`} role="tabpanel" aria-labelledby={`tab-${panel.id}`} hidden={activeId !== panel.id} tabIndex="0" className="info-tabs__panel">
          <p className="eyebrow">Guia para organizadores</p>
          <h2>{panel.title}</h2>
          <p>{panel.content}</p>
        </section>
      ))}
    </div>
  )
}
