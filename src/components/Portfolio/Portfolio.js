import React from "react";
import './Portfolio.css'

function Portfolio() {

    return (
        <div className="wrapper">
            <article className="portfolio">
                <section className="portfolio__listing">
                    <h3 className="portfolio__title">Портфолио</h3>
                    <ul className="portfolio__site">
                        <li className="portfolio__sitetype">
                            <p className="portfolio__description">Статичный сайт</p>
                            <p className="portfolio__arrow">&#8599;</p>
                        </li>
                        <li className="portfolio__sitetype">
                            <p className="portfolio__description">Адаптивный сайт</p>
                            <p className="portfolio__arrow">&#8599;</p>
                        </li>
                        <li className="portfolio__sitetype">
                            <p className="portfolio__description">Одностраничное приложение</p>
                            <p className="portfolio__arrow">&#8599;</p>
                        </li>
                    </ul>
                </section>
            </article>
        </div>
    )
}

export default Portfolio;













