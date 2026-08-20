// src/services/api.js

const API_URL = 'http://localhost:3001/api';

export async function buscarEventos(filtroAcessibilidade = '') {
  try {
    const url = filtroAcessibilidade 
      ? `${API_URL}/eventos?acessibilidade=${encodeURIComponent(filtroAcessibilidade)}`
      : `${API_URL}/eventos`;

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Erro ao buscar eventos');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}