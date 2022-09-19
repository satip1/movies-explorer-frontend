import React from "react";
import { Link } from "react-router-dom";
import './Login.css';

import FormValidation from "../FormValidation/FormValidation";
import Header from '../Header/Header';

function Login(props) {


    // валидация полей ввода
    const { values, handleChange, errors, isValid, setValues } = FormValidation();

    // обработчик сабмита формы 
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onAuthUser(values.email, values.password);
        // evt.target.reset();
    }

    const handleInputChange = (evt) => {
        handleChange(evt);
        if (props.errormsg.length > 0) { props.setErrorMsg("") }
    }


    return (
        <> 
         <Header/>
        <main className="page">
            <article className="login">
                <h1 className="login__h1">Рады видеть!</h1>

                <form className="login__form" onSubmit={handleSubmit}>

                    <fieldset className="login__fieldset">
                        <div className="login__item">
                            <label className="login__label">E-mail</label>
                            <input
                                name="email"
                                type="email"
                                className="login__input"
                                onChange={handleInputChange}
                                value={values.email || ''}
                                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                required
                                placeholder="Введите свой email" />
                        </div>
                        <p className="login__error">{errors.email}</p>
                    </fieldset>

                    <fieldset className="login__fieldset">
                        <div className="login__item">
                            <label className="login__label">Пароль</label>
                            <input
                                name="password"
                                type="password"
                                className="login__input"
                                onChange={handleInputChange}
                                value={values.password || ''}
                                required
                                minLength="8"
                                placeholder="Введите пароль" />
                        </div>
                        <p className="login__error">{errors.password}</p>
                    </fieldset>


                    <button
                        type="submit"
                        disabled={!isValid}
                        // className={`login__formbtn ${isValid ? '' : 'login__formbtn_disabled'}`}>
                        className="login__formbtn">
                        <p className="login__error-submit">{props.errormsg}</p>
                        Войти
                    </button>
                </form>

                <section className="login__reg">
                    <span className="login__regtext">Ещё не зарегистрированы?</span>
                    <Link to="/sign-up" className="login__regbtn">Регистрация</Link>
                </section>
            </article>
        </main>
        </>
    )
}

export default Login;








