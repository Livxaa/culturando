// src/components/AudioReader.jsx
import React, { useState } from 'react';

export default function AudioReader() {
  const [lendo, setLendo] = useState(false);

  const lerPaginaInteira = () => {
    if (!('speechSynthesis' in window)) {
      alert("Seu navegador não suporta leitura de texto em voz alta.");
      return;
    }

    // Cancela leituras anteriores
    window.speechSynthesis.cancel();

    // Captura o texto visível da tag <main> ou do <body> se não houver <main>
    const conteudoMain = document.querySelector('main') || document.body;
    
    // Pega todo o texto da tela ignorando scripts/estilos
    const textoParaLer = conteudoMain.innerText.trim();

    if (!textoParaLer) {
      alert("Nenhum texto encontrado nesta página para leitura.");
      return;
    }

    const mensagem = new SpeechSynthesisUtterance(textoParaLer);
    mensagem.lang = 'pt-BR';
    mensagem.rate = 1.0; // Velocidade da fala (1.0 = normal)

    mensagem.onstart = () => setLendo(true);
    mensagem.onend = () => setLendo(false);
    mensagem.onerror = () => setLendo(false);

    window.speechSynthesis.speak(mensagem);
  };

  const pararLeitura = () => {
    window.speechSynthesis.cancel();
    setLendo(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      gap: '8px',
      backgroundColor: '#ffffff',
      padding: '10px 14px',
      borderRadius: '30px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      border: '1px solid #e0e0e0'
    }}>
      <button 
        onClick={lerPaginaInteira} 
        disabled={lendo}
        type="button"
        aria-label="Ouvir conteúdo desta página"
        style={{
          cursor: lendo ? 'not-allowed' : 'pointer',
          border: 'none',
          background: 'transparent',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        🔊 {lendo ? 'Lendo página...' : 'Ouvir Página'}
      </button>

      {lendo && (
        <button 
          onClick={pararLeitura} 
          type="button"
          aria-label="Parar leitura"
          style={{
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            color: '#d32f2f',
            fontWeight: 'bold'
          }}
        >
          ⏸️ Parar
        </button>
      )}
    </div>
  );
}