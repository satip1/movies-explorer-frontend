import React from "react";
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
    return (
        <main className="page">
            <article className="login">
                <h1 className="login__h1">Рады видеть!</h1>

                <form className="login__form">
                    <div className="login__item">
                        <label className="login__label">E-mail</label>
                        <input type="email" className="login__input" required placeholder="Введите свой email"/>
                    </div>
                    <div className="login__item">
                        <label className="login__label">Пароль</label>
                        <input type="password" className="login__input" required placeholder="Введите пароль"/>
                    </div>
                    <button type="submit" className="login__formbtn">Войти</button>
                </form>

                <section className="login__reg">
                    <span className="login__regtext">Ещё не зарегистрированы?</span>
                    <Link to="/sign-up" className="login__regbtn">Регистрация</Link>
                </section>
            </article>
        </main>

    )
}

export default Login;








