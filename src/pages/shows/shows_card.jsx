import React from 'react';
import '../../css/shows_card.css'

// Passamos o 'link' como uma das propriedades
export function ShowsCard({ imagem, titulo, corBotao, link }) {
  return (
    <div className="card-container">
      <img src={imagem} alt={titulo} className="card-imagem" />
      
      {/* O link envolve o botão para abrir a nova aba */}
      <a href={link} target="_blank" rel="noreferrer" style={{ width: '100%' }}>
        <button 
          className="card-botao" 
          style={{ backgroundColor: corBotao }}
        >
          {titulo}
        </button>
      </a>
    </div>
  );
}