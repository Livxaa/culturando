import '../../css/events.css'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import EventGrid from '../../components/events/EventGrid.jsx'
import EventSearchFilters from '../../components/events/EventSearchFilters.jsx'

export default function EventsPage() {
  const allEvents = useLoaderData() || []
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroups, setSelectedGroups] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleGroupToggle = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedGroups([])
    setSelectedCategory('')
  }

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Busca textual (título, descrição, localidade, categoria, recursos de acessibilidade)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const titleMatch = event.title.toLowerCase().includes(query)
        const descMatch = event.description.toLowerCase().includes(query)
        const locMatch = event.location.toLowerCase().includes(query)
        const catMatch = event.category.toLowerCase().includes(query)
        const resourceMatch = event.accessibility?.resources?.some((r) => r.toLowerCase().includes(query))

        if (!titleMatch && !descMatch && !locMatch && !catMatch && !resourceMatch) {
          return false
        }
      }

      // Filtro por categoria cultural
      if (selectedCategory && event.category !== selectedCategory) {
        return false
      }

      // Filtro por grupos de acessibilidade (AND / OR: evento deve possuir TODOS os grupos de acessibilidade selecionados)
      if (selectedGroups.length > 0) {
        const eventGroups = event.accessibility?.groups || []
        const hasAllGroups = selectedGroups.every((g) => eventGroups.includes(g))
        if (!hasAllGroups) return false
      }

      return true
    })
  }, [allEvents, searchQuery, selectedCategory, selectedGroups])

  return (
    <section className="events-page page-section" aria-labelledby="events-title">
      <div className="container">
        <p className="eyebrow">Agenda cultural</p>
        <h1 id="events-title" tabIndex="-1">
          Confira os próximos eventos
        </h1>
        <p className="events-page__intro">
          Escolha uma experiência para viver a cultura de um jeito mais acessível, próximo e plural.
        </p>

        <EventSearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGroups={selectedGroups}
          onGroupToggle={handleGroupToggle}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onResetFilters={handleResetFilters}
          totalResults={filteredEvents.length}
          totalEvents={allEvents.length}
        />

        {filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
        ) : (
          <div className="empty-state" role="region" aria-label="Resultado da busca sem eventos">
            <h2>Nenhum evento encontrado</h2>
            <p>
              Não encontramos eventos com os critérios de busca selecionados. Tente ajustar as opções de
              acessibilidade ou busca textual.
            </p>
            <button
              type="button"
              className="button button--primary"
              onClick={handleResetFilters}
            >
              Mostrar todos os eventos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
