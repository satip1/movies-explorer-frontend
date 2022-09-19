import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Header.css'

function Header(props) {

    const location = useLocation();
    let styleHeader;

    switch (location.pathname) {
        case '/sign-in':
            styleHeader = "header_sign";
            break;
        case '/sign-up':
            styleHeader = "header_sign";
            break;
        default:
            styleHeader = "header";
            break;
    }

        return (
            <header className="page">
                <article className="wrapper">
                    <section className={styleHeader}>
                        <Link to="/" className="header__logolink" />
                        <Navigation
                           onLoggedIn={props.onLoggedIn}
                        />
                    </section>
                </article>
            </header >
        )
};

export default Header;
