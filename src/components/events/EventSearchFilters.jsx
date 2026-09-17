import { useId } from 'react'
import { useAccessibility } from '../../context/AccessibilityContext.jsx'

const ACCESSIBILITY_CATEGORIES = [
  {
    id: 'fisica',
    label: 'Acessibilidade Motora',
    description: 'Rampas, elevadores, rotas acessíveis e banheiros adaptados',
    icon: '♿',
  },
  {
    id: 'visual',
    label: 'Acessibilidade Visual',
    description: 'Audiodescrição, mapa tátil e textos ampliados',
    icon: '👁️',
  },
  {
    id: 'auditiva',
    label: 'Acessibilidade Auditiva',
    description: 'Intérprete de Libras e legendagem descritiva',
    icon: '🤟',
  },
  {
    id: 'neurodivergente',
    label: 'Neurodivergência & Sensorial',
    description: 'Salas de pausa sensorial, abafadores de som e sessões relaxadas',
    icon: '🧩',
  },
]

export default function EventSearchFilters({
  searchQuery,
  onSearchChange,
  selectedGroups,
  onGroupToggle,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  totalResults,
  totalEvents,
}) {
  const searchInputId = useId()
  const categorySelectId = useId()
const { announce } = useAccessibility();

  const hasActiveFilters = searchQuery.trim() !== '' || selectedGroups.length > 0 || selectedCategory !== ''

  return (
    <section className="search-filters-section" aria-labelledby="filters-title">
      <h2 id="filters-title" className="visually-hidden">
        Filtros de busca e acessibilidade de eventos
      </h2>
      
      <form role="search" className="search-filters" onSubmit={(e) => e.preventDefault()}>
        <div className="search-filters__primary">
          <div className="search-filters__field search-filters__field--text">
            <label htmlFor={searchInputId} className="search-filters__label">
              Buscar eventos:
            </label>
            <input
              id={searchInputId}
              type="search"
              className="search-filters__input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Digite o nome do evento, artista ou cidade..."
              aria-label="Buscar eventos por nome, artista ou cidade"
            />
          </div>

          <div className="search-filters__field search-filters__field--select">
            <label htmlFor={categorySelectId} className="search-filters__label">
              Categoria cultural:
            </label>
            <select
              id={categorySelectId}
              className="search-filters__select"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filtrar por categoria cultural"
            >
              <option value="">Todas as categorias</option>
              <option value="Música e cultura">Música e cultura</option>
              <option value="Teatro">Teatro</option>
              <option value="Gastronomia">Gastronomia</option>
            </select>
          </div>
        </div>

        <fieldset className="search-filters__fieldset">
          <legend className="search-filters__legend">
            Filtrar por recursos de acessibilidade:
          </legend>
          <div className="search-filters__group-list">
            {ACCESSIBILITY_CATEGORIES.map((cat) => {
              const isChecked = selectedGroups.includes(cat.id)
              return (
                <label
                  key={cat.id}
                  className={`search-filters__checkbox-card ${isChecked ? 'search-filters__checkbox-card--active' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onGroupToggle(cat.id)}
                    aria-describedby={`desc-${cat.id}`}
                    onFocus={() => announce(`${cat.label}: ${cat.description}`)}
                    onMouseEnter={() => announce(`${cat.label}: ${cat.description}`)}
                  />
                  <span className="search-filters__checkbox-content">
                    <span className="search-filters__checkbox-title">
                      <span aria-hidden="true">{cat.icon}</span> {cat.label}
                    </span>
                    <span id={`desc-${cat.id}`} className="search-filters__checkbox-desc">
                      {cat.description}
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="search-filters__bar" role="status" aria-live="polite">
          <div className="search-filters__results-count">
            <strong>{totalResults}</strong> {totalResults === 1 ? 'evento encontrado' : 'eventos encontrados'}
            {totalEvents > 0 && ` (de ${totalEvents} no total)`}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="button button--ghost search-filters__reset-btn"
              onClick={onResetFilters}
              aria-label="Limpar todos os filtros de busca e acessibilidade"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
