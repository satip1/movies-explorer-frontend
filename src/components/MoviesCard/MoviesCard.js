import React from "react";
import { useLocation } from "react-router-dom";
import foto from '../../images/pic_foto.png';
import './MoviesCard.css';

function MoviesCard() {

  const location = useLocation();

  const pageMovies = () => {
    return (
      <button type="button" className="carditem__btn">
        <p className="carditem__flag carditem__flag_green"></p>
      </button>
    )
  };

  const pageSaveMovies = () => {
    return (
      <button type="button" className="carditem__btn">
        <p className="carditem__cross"></p>
      </button>
    )
  };

  let btnActive;
  switch (location.pathname) {
    case '/movies':
      btnActive = pageMovies();
      break;
    case '/saved-movies':
      btnActive = pageSaveMovies();
      break;
    default:
      break;
  }

  return (
    <section className="carditem">
      <div className="carditem__header">
        <h2 className="carditem__name">33 слова о дизайне</h2>
        <p className="carditem__time">1ч 47м</p>
   
        {btnActive}

      </div>
      <div className="carditem__foto">
        <img src={foto} alt="Фото" className="cartitem__img" />
      </div>
    </section>
  )
};

export default MoviesCard;
