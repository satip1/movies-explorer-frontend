import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <article className="wrapper wrapper_gray">
            <section className="texnologi" id="texnologi">

                <section className="subtitle texnologi__subheader ">
                    <h2 className="subtitle__h2 texnologi__subh2 ">Технологии</h2>
                </section>

                <section className="texnologi__title">
                    <h2 className="texnologi__h2">7 технологий</h2>
                    <p className="texnologi__text">
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                </section>

                <section className="texnologi__name">
                    <ul className="texnologi__list">
                        <li className="texnologi__item">HTML</li>
                        <li className="texnologi__item">CSS</li>
                        <li className="texnologi__item">JS</li>
                        <li className="texnologi__item">React</li>
                        <li className="texnologi__item">Git</li>
                        <li className="texnologi__item">Express.js</li>
                        <li className="texnologi__item">mongoDB</li>
                    </ul>
                </section>

            </section>
        </article>
    )
};

export default Techs;
