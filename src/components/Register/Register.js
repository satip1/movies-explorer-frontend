import React from "react";
import { Link } from "react-router-dom";
import './Register.css'

function Register() {
    return (
        <div className="page">
            <section className="register">

                <h1 className="register__h1">Добро пожаловать</h1>

                <form className="register__form">
                    <div className="register__item">
                        <label className="register__label">Имя</label>
                        <input type="email" className="register__input" />
                        {/* <span className="register__error">Что-то пошло не так</span> */}
                    </div>
                    <div className="register__item">
                        <label className="register__label">E-mail</label>
                        <input type="email" className="register__input" />
                        <span className="register__error">Что-то пошло не так</span>
                    </div>
                    <div className="register__item">
                        <label className="register__label">Пароль</label>
                        <input type="password" className="register__input" />
                        <span className="register__error">Что-то пошло не так</span>
                    </div>
                    <button type="button" className="register__formbtn">Зарегистрироваться</button>
                </form>

                <div className="register__reg">
                    <span className="register__regtext">Уже зарегистрированы?</span>
                    <Link to="/sign-in" className="register__regbtn">Войти</Link>
                </div>

            </section>
        </div>
    )
};

export default Register;












