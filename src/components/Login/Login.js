import React from "react";
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
    return (
        <div className="page">
            <section className="login">
                <h1 className="login__h1">Рады видеть!</h1>

                <form className="login__form">

                    <div className="login__item">
                        <label className="login__label">E-mail</label>
                        <input type="email" className="login__input" />
                    </div>

                    <div className="login__item">
                        <label className="login__label">Пароль</label>
                        <input type="email" className="login__input" />
                    </div>
                    <button type="button" className="login__formbtn">Войти</button>

                </form>

                <div className="login__reg">
                    <span className="login__regtext">Ещё не зарегистрированы?</span>
                    <Link to="/sign-up" className="login__regbtn">Регистрация</Link>
                </div>
            </section>
        </div>

    )
}

export default Login;








