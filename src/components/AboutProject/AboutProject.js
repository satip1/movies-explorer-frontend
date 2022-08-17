import React from 'react';
import './AboutProject.css';



function AboutProject() {
    return (
        <div className="wrapper">
            <article className="project" id="project">
                <section className="subtitle project__header ">
                    <h2 className="subtitle__h2 project__h2 ">О проекте</h2>
                </section>

                <section className="project__tabl">
                    <div className="project__cell">
                        <h3 className="project__h3">Дипломный проект включал 5 этапов</h3>
                        <p className="project__p">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="project__cell">
                        <h3 className="project__h3">На выполнениедиплома ушло 5 недель</h3>
                        <p className="project__p">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </section>

                <section className="project__ratio">
                    <p className="project__itemtitle project__itemtitle_green">1 неделя</p>
                    <p className="project__itemtitle project__itemtitle_gray">4 недели</p>
                    <p className="project__itemweek">Back-end</p>
                    <p className="project__itemweek">Front-end</p>
                </section>
            </article>
        </div>
    )
};

export default AboutProject;





