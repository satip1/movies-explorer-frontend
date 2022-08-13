import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="wrapper wrapper_grayfooter">
            <footer className="footer">
                <section className="footer__subheader">
                    <h3 className="footer__subh3">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                </section>
                <section className="footer__copy">
                    <p className="footer__text">&copy; 2022</p>
                    <ul className="footer__list">
                        <li className="footer__item">Яндекс.Практикум</li>
                        <li className="footer__item">Github</li>
                        <li className="footer__item">Facebook</li>
                    </ul>
                </section>
            </footer>
        </div>
    );
}

export default Footer;





