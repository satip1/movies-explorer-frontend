import React from 'react';
import './AboutProject.css';



function AboutProject() {
    return (
        <div class="wrapper">
            <article class="project">
                <section class="subtitle project__header ">
                    <h2 class="subtitle__h2 project__h2 ">О проекте</h2>
                </section>

                <section class="project__tabl">
                    <div class="project__cell">
                        <h3 class="project__h3">Дипломный проект включал 5 этапов</h3>
                        <p class="project__p">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div class="project__cell">
                        <h3 class="project__h3">На выполнениедиплома ушло 5 недель</h3>
                        <p class="project__p">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </section>

                <section class="project__ratio">
                    <p class="project__itemtitle project__itemtitle_green">1 неделя</p>
                    <p class="project__itemtitle project__itemtitle_gray">4 недели</p>
                    <p class="project__itemweek">Back-end</p>
                    <p class="project__itemweek">Front-end</p>
                </section>
            </article>
        </div>
    )
};

export default AboutProject;





