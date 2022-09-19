import React from "react";
import { Link } from "react-router-dom";
import './Register.css';

import FormValidation from "../FormValidation/FormValidation";
import Header from '../Header/Header';

const Register = (props) => {

    // валидация полей ввода
    const { values, handleChange, errors, isValid, setValues } = FormValidation();


    // обработчик сабмита формы 
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onRegUser(values.name, values.email, values.password);
        // evt.target.reset();
    }

    const handleInputChange = (evt) => {
        console.log(props.errormsg);
        handleChange(evt);
        if (props.errormsg.length > 0) { props.setErrorMsg("") }
    }

    return (
        <>
            <Header />
            <main className="page">
                <article className="register">
                    <h1 className="register__h1">Добро пожаловать</h1>

                    <form className="register__form" onSubmit={handleSubmit}>
                        <div className="register__item">
                            <label className="register__label">Имя</label>
                            <input
                                name="name"
                                type="text"
                                className="register__input"
                                onChange={handleInputChange}
                                value={values.name || ''}
                                required
                                minLength="2"
                                maxLength="30"
                                pattern="[а-яА-Яaa-zA-ZёЁ\- ]{1,}"
                                placeholder="Ваше имя в системе" />
                            <p className="register__error">{errors.name}</p>
                        </div>
                        <div className="register__item">
                            <label className="register__label">E-mail</label>
                            <input
                                name="email"
                                type="email"
                                className="register__input"
                                onChange={handleInputChange}
                                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                required
                                placeholder="Введите email" />
                            <p className="register__error">{errors.email}</p>
                        </div>
                        <div className="register__item">
                            <label className="register__label">Пароль</label>
                            <input
                                name="password"
                                type="password"
                                className="register__input"
                                onChange={handleInputChange}
                                required
                                minLength="8"
                                placeholder="Введите пароль" />
                            <p className="register__error">{errors.password}</p>
                        </div>
                        <button
                            type="submit"
                            disabled={!isValid}
                            // className={`register__formbtn ${isValid ? '' : 'register__formbtn_disabled'}`}>
                            className="register__formbtn">
                            <p className="register__error-submit">{props.errormsg}</p>
                            Зарегистрироваться
                        </button>
                    </form>

                    <section className="register__reg">
                        <span className="register__regtext">Уже зарегистрированы?</span>
                        <Link to="/sign-in" className="register__regbtn">Войти</Link>
                    </section>

                </article>
            </main>
        </>
    )
};

export default Register;
