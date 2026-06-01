import React from 'react';
import '../../css/shows.css'
import Navbar from '../../components/navbar';'../navbar.css'

import { ShowsCard } from './shows_card';

import img1 from '../../assets/img/logo.png';
import img2 from '../../assets/img/logo_preta.png';
import img3 from '../../assets/img/logo_preta.png';

export function Shows() {

  return (

    <section className="secao-shows">

      {/* TÍTULO SUPERIOR */}

      <div className="shows-header">

        <h1>
          Confira os Próximos Shows
        </h1>

        <p>
          Os melhores eventos culturais e musicais para você aproveitar
        </p>

      </div>

      {/* GALERIA */}

      <div className="galeria-grid">

        {/* Card do Show 1 */}

        <ShowsCard
          imagem={img1}
          titulo="Show 1"
          corBotao="#f0e7d6"
          link="https://site-do-evento-1.com"
        />

        {/* Card do Show 2 */}

        <ShowsCard
          imagem={img2}
          titulo="Show 2"
          corBotao="#f0e7d6"
          link="https://site-do-evento-2.com"
        />

        {/* Card do Show 3 */}

        <ShowsCard
          imagem={img3}
          titulo="Show 3"
          corBotao="#f0e7d6"
          link="https://site-do-evento-3.com"
        />

      </div>

    </section>
  );
}