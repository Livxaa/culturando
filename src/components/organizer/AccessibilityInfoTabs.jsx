import { useRef, useState } from 'react'

const panels = [
  { id: 'communication', label: 'Comunicação', title: 'Comunique com clareza e respeito', items: ['Fale diretamente com a pessoa, não apenas com quem a acompanha.', 'Pergunte qual apoio é necessário e respeite a resposta.', 'Disponibilize informações em formatos acessíveis antes e durante o evento.'] },
  { id: 'arrival', label: 'Chegada e circulação', title: 'Planeje uma chegada autônoma', items: ['Mantenha rotas acessíveis livres de objetos e com sinalização legível.', 'Treine a equipe para orientar sem tocar na pessoa ou no equipamento sem consentimento.', 'Reserve assentos acessíveis e garanta que eles tenham boa visibilidade.'] },
  { id: 'sensory', label: 'Apoio sensorial', title: 'Reduza barreiras e imprevistos', items: ['Informe antecipadamente sobre luzes, sons, filas e mudanças na programação.', 'Ofereça um espaço de pausa com menos estímulos quando possível.', 'Combine um ponto de referência e um canal de apoio durante toda a atividade.'] },
]

export default function AccessibilityInfoTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const move = (next) => { const index = (next + panels.length) % panels.length; setActive(index); tabRefs.current[index]?.focus() }
  const onKeyDown = (event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); move(active + 1) } if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); move(active - 1) } if (event.key === 'Home') { event.preventDefault(); move(0) } if (event.key === 'End') { event.preventDefault(); move(panels.length - 1) } }
  const panel = panels[active]
  return <div className="guide-tabs"><div className="guide-tabs__list" role="tablist" aria-label="Orientações de acessibilidade">{panels.map((item, index) => <button ref={(node) => { tabRefs.current[index] = node }} key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={active === index} aria-controls={`panel-${item.id}`} tabIndex={active === index ? 0 : -1} onKeyDown={onKeyDown} onClick={() => setActive(index)}>{item.label}</button>)}</div><section className="guide-tabs__panel" id={`panel-${panel.id}`} role="tabpanel" aria-labelledby={`tab-${panel.id}`} tabIndex="0"><h2>{panel.title}</h2><ul>{panel.items.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
}
