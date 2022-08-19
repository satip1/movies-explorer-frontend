import React from "react";
import foto from '../../images/pic_foto.png';
import './MoviesCard.css';

function MoviesCard() {

  return (
    <section className="carditem">
      <div className="carditem__header">
        <h2 className="carditem__name">33 слова о дизайне</h2>
        <p className="carditem__time">1ч 47м</p>

        <button type="button" className="carditem__btn">
          <p className="carditem__flag carditem__flag_green"></p>
        </button>

      </div>  
      <div className="carditem__foto">
        <img src={foto} alt="Фото" className="cartitem__img" />
      </div>
    </section>
  )
};

export default MoviesCard;
