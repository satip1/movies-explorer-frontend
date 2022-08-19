import React from "react";
import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  return (
    <article className="wrapper">
      <section className="cardlist">

        <section className="cardlist__tabl">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </section>

        <section className="cardlist__again">
          <button type="button" className="cardlist__btnagain">Еще</button>
        </section>

      </section>
    </article>
  )
}

export default MoviesCardList;
