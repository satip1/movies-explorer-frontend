import React from "react";
import { useLocation } from "react-router-dom";
import { IMAGESERVER } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard(props) {

  // название фильма
  const nameRU = props.card.nameRU;

  // расчет времени
  const duration = props.card.duration;
  const time = duration < 60
    ? duration + ' м.'
    : Math.trunc(duration / 60) + ' ч. ' + duration % 60 + ' м.';

  // путь к фото
  let srcfoto = '';
  if (props.mode === 'movies')
    srcfoto = `${IMAGESERVER}${props.card.image.url}`
  else srcfoto = `${props.card.image}`;

  // состояние выбрано или нет
  const [saved, setSaved] = React.useState(props.card.saved);

  const handleBtnColor = () => {
    setSaved(!saved);
    props.onSaveMovies(props.card);
  }

  const handleBtnDelSave = () => {
    props.onSaveMovies(props.card); 
  }

  const location = useLocation();

  const pageMovies = () => {
    return (
      <button type="button" className="carditem__btn" onClick={handleBtnColor}>
        <p className={`carditem__flag ${saved ? 'carditem__flag_green' : 'carditem__flag_gray'}`}></p>       
      </button>
    )
  };

  const pageSaveMovies = () => {
    return (
      <button type="button" className="carditem__btn" onClick={handleBtnDelSave}>
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
        <h2 className="carditem__name">{nameRU}</h2>
        <p className="carditem__time">{time}</p>
        {btnActive}
      </div>
      <div className="carditem__foto">
        <img src={srcfoto} alt="Фото" className="cartitem__img" />
      </div>
    </section>
  )
};

export default MoviesCard;
