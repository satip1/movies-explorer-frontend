import React from "react";
import './Portfolio.css';

import { SITESTATIC, SITEADAPTIV, SITEONEPAGE } from '../../utils/constants'

function Portfolio() {

    return (
        <div className="wrapper">
            <article className="portfolio">
                <section className="portfolio__listing">
                    <h3 className="portfolio__title">Портфолио</h3>
                    <ul className="portfolio__site">
                        <li className="portfolio__sitetype">
                            <a href={SITESTATIC} target="_blank" rel="noreferrer" className="portfolio__description">Статичный сайт</a>
                        </li>
                        <li className="portfolio__sitetype">
                            <a href={SITEADAPTIV} target="_blank" rel="noreferrer" className="portfolio__description">Адаптивный сайт</a>
                        </li>
                        <li className="portfolio__sitetype">
                            <a href={SITEONEPAGE} target="_blank" rel="noreferrer" className="portfolio__description">Одностраничное приложение</a>
                        </li>
                    </ul>
                </section>
            </article>
        </div>
    )
}

export default Portfolio;













