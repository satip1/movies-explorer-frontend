import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <nav className="wrapper">
            <section className="navtab">
                <ul className="navtab__menu">
                    <li className="navtab__list"> <a className="navtab__a" href="#project">О проекте </a></li>
                    <li className="navtab__list"><a className="navtab__a"  href="#texnologi">Технологии </a></li>
                    <li className="navtab__list"> <a className="navtab__a"  href="#student">Студент</a> </li>
                </ul>
            </section>
        </nav >
    )

};

export default NavTab;
