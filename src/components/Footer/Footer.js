import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="wrapper wrapper_grayfooter">
            <article className="footer">
                <section className="footer__subheader">
                    <h3 className="footer__subh3">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                </section>
                <section className="footer__copy">
                    <p className="footer__text">&copy; {new Date().getFullYear()}</p>
                    <ul className="footer__list">
                        <li className="footer__item">
                            <a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__item">
                            <a href="https://github.com" className="footer__link" target="_blank" rel="noreferrer">Github</a>
                        </li>
                        <li className="footer__item">
                            <a href="https://vk.com" className="footer__link" target="_blank" rel="noreferrer">Facebook</a>
                        </li>
                    </ul>
                </section>
            </article>
        </footer>
    );
}

export default Footer;





