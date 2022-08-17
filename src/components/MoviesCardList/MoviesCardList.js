import React from "react";
import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  return (
    <div className="wrapper">
      <article className="cardlist">

        <section className="cardlist__tabl">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          {/* <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />           */}

        </section>

        <section className="cardlist__again">
          <button className="cardlist__btnagain">Еще</button>
        </section>

      </article>
    </div>
  )
}

export default MoviesCardList;















