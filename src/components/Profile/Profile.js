import React from "react";
import './Profile.css'

function Profile() {
    return (
<div className="page">
    <article className="profile">

      <h1 className="profile__name">Привет, Виталий</h1>

      <form id="form" className="profile__form">
        <div className="profile__item">
          <span className="profile__span">Имя</span>
          <input type="text" name="form__name" id="name" className="profile__input" />
        </div>
        <div className="profile__item">
          <span className="profile__span">E-mail</span>
          <input type="email" name="form__email" id="email" className="profile__input" />
        </div>
      </form>

      <section className="profile__button">
        <button className="profile__btn profile__edit">Редактировать</button>
        <button className="profile__btn profile__exit">Выйти из аккаунта</button>
        {/* <p className="profile__error">Привет</p>
        <button className="profile__btnsave">Сохранить</button> */}
      </section>


    </article>
  </div>
    )
};

export default Profile;

