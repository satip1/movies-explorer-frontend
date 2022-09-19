import React from "react";
import './Profile.css';

import CurrentUserContext from '../../context/CurrentUserContext';
import FormValidation from "../FormValidation/FormValidation";
import Header from '../Header/Header';

function Profile(props) {

  // console.log('Проерка при редактировании профиля ', props.errormsg);

  const currentUser = React.useContext(CurrentUserContext);
  const { email, name } = currentUser;
  const { values, handleChange, errors, isValid, setValues } = FormValidation();


  const [visiblebtnsave, setVisibleBtnSave] = React.useState('profile__btn_visible');
  const [visiblebtnedit, setVisibleBtnEdit] = React.useState('');
  const [savedisabled, setSaveDisabled] = React.useState(true)


  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);


  React.useEffect(() => {
    if (name === values.name && email === values.email) setSaveDisabled(true)
    else setSaveDisabled(!isValid)
  }, [values.name, values.email])

  // обработчик сабмита формы 
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onEditUser(values.name, values.email);

    setTimeout(() => {
      setVisibleBtnSave('profile__btn_visible');
      setVisibleBtnEdit('');
      props.setErrorMsg('');
      setSaveDisabled(true)
    }, 1000);

    // evt.target.reset();
  }

  const handleOnEdit = () => {
    setVisibleBtnSave('');
    setVisibleBtnEdit('profile__btn_visible');
  }

  const handleInputChange = (evt) => {
    handleChange(evt);
    if (props.errormsg.length > 0) { props.setErrorMsg("") }
  }

  return (
    <>
       <Header />
    <main className="page">
      <article className="profile">

        <h1 className="profile__name">{`Привет, ${values.name}`}</h1>

        <form id="form__edit" className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__item">
              <span className="profile__span">Имя</span>
              <input
                type="text"
                name="name"
                id="name"
                className={`profile__input ${isValid ? '' : 'profile__input_disabled'}`}
                onChange={handleInputChange}
                value={values.name || ''}
                disabled={!visiblebtnedit}
                required
                minLength="2"
                maxLength="30"
                pattern="[а-яА-Яaa-zA-ZёЁ\- ]{1,}"
                placeholder="Имя для редактирования"
              />
            </div>
            <p className="profile__error">{errors.name}</p>
          </fieldset>

          <fieldset className="profile__fieldset">
            <div className="profile__item">
              <span className="profile__span">E-mail</span>
              <input
                type="email"
                name="email"
                id="email"
                className={`profile__input ${isValid ? '' : 'profile__input_disabled'}`}
                onChange={handleInputChange}
                value={values.email || ''}
                disabled={!visiblebtnedit}
                required
                placeholder="Почта для редактирования"
              />
            </div>
            <p className="profile__error">{errors.email}</p>
          </fieldset>

        </form>

        <section className="profile__button">

          <button
            type="submit"
            form="form__edit"
            disabled={savedisabled}
            className={`profile__btnsave ${visiblebtnsave} `}>
            <p className="profile__error-submit">{props.errormsg}</p>
            Сохранить
          </button>

          <button
            type="button"
            onClick={handleOnEdit}
            className={`profile__btn profile__edit ${visiblebtnedit}`}>
            Редактировать
          </button>

          <button
            type="button"
            onClick={props.onGoOut}
            className="profile__btn profile__exit">
            Выйти из аккаунта
          </button>

        </section>

      </article>
    </main>
    </>
  )
};

export default Profile;
