import React from "react";
import './MoviesCardList.css';

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader"

function MoviesCardList(props) {


  return (
    <article className="wrapper">
      <section className="cardlist">
        {props.loader && <Preloader />}
        <section className="cardlist__tabl">

          {props.movies.map((item) =>
       
            <MoviesCard
              mode={props.mode}
              card={item}
              key={item.movieId}
              onSaveMovies={props.onSaveMovies}
            />
          )}
        </section>
        <section className={`cardlist__again `}>
          <button
            type="button"
            onClick={props.onStill}
            className={`cardlist__btnagain ${props.btnstill && 'cardlist__none'}`}>
            Еще
          </button>
        </section>


      </section>
    </article >
  )
}

export default MoviesCardList;
