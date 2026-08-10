export const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export const formatDate = (isoDate) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(isoDate))

export const formatShortDate = (isoDate) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(isoDate))

export const formatTicketType = (type) => ({ inteira: 'Inteira', meia: 'Meia entrada', pcd: 'PCD' }[type] ?? type)
