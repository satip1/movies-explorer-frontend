import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Header.css'

function Header() {

    const location = useLocation();
    let styleHeader;

    switch (location.pathname) {
        case '/sign-in':
            styleHeader = "header_sign";
            break;
        case '/sign-up':
            styleHeader = "header_sign";
            break;
        // case '/profile':
        //     styleHeader = "header_profile";
        //     break;
        default:
            styleHeader = "header";
            break;
    }

    return (
        <div className="page">
            <div className="wrapper">
                <header className={styleHeader}>
                    <Link to="/" className="header__logolink" />
                    <Navigation />
                </header>
            </div>
        </div >
    )
};

export default Header;













