import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import './Navigation.css';

function Navigation() {

    // состояние отображения бургер-меню
    const [isBurgerVision, setBurgerVision] = React.useState('burger__menu burger__menu_vision');

    const location = useLocation();

    const onBurgerOpen = () => {
        setBurgerVision('burger__menu');
    }

    const onBurgerClose = () => {
        setBurgerVision('burger__menu burger__menu_vision');
    }

    const navReturn = () => {
        return (
            <>
                <nav className="navigate nav1280">
                    <div className="navigate__films">
                        <NavLink to='/movies' className="navigate__link" activeClassName="navigate__link_active">Фильмы</NavLink>
                        <NavLink to='/saved-movies' className="navigate__link" activeClassName="navigate__link_active">Сохраненные фильмы</NavLink>
                    </div>
                    <Link to='/profile' className="navigate__account">Аккаунт</Link>
                </nav>

                <nav className="burger burger_vision">

                    <button className="burger__btn" onClick={onBurgerOpen} />

                    <section className={isBurgerVision}>
                        <div className="burger__page">
                            <button className="burger__btnclose" onClick={onBurgerClose}>
                                <div className="btncross"></div>
                            </button>
                            <div className="burger__block">
                                <NavLink to='/' className="burger__link" onClick={onBurgerClose}>Главная</NavLink>
                                <NavLink to='/movies' className="burger__link" onClick={onBurgerClose}>Фильмы</NavLink>
                                <NavLink to='/saved-movies' className="burger__link" onClick={onBurgerClose}>Сохраненные фильмы</NavLink>
                            </div>
                            <Link to='/profile' className="navigate__account">Аккаунт</Link>
                        </div>
                    </section>
                </nav>
            </>
        );
    }

    switch (location.pathname) {
        case '/':
            return (
                <section className="navigate">
                    <Link to='/sign-up' className="navigate__linkland">Регистрация</Link>
                    <Link to='/sign-in' className="navigate__linkland">Войти</Link>
                </section>
            );

        case '/movies':
            return (
                navReturn()
            )

        case '/saved-movies':
            return (
                navReturn()
            )

        case '/profile':
            return (
                navReturn()
            )



        default:
            break;
    };



};
export default Navigation;


















