import React from 'react';
import './AboutMe.css';

import Foto from '../../images/foto.png'


function AboutMe() {
    return (
    <div className="wrapper">
    <article className="student" id="student"> 
         <section className="student__subheader subtitle">
            <h2 className="student__subh2 subtitle__h2">Студент</h2>
        </section>
        <section className="student__data">
            <h2 className="student__name">Виталий</h2>
            <h3 className="student__prof">Фронтенд-разработчик, 30 лет</h3>
            <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <ul className="student__list">
                <li className="student__item">Facebook</li>
                <li className="student__item">Github</li>
            </ul>
            <img src={Foto} alt="Фото студента" className="student__foto"/>
        </section>
    </article>
    </div>
    )
};

export default AboutMe;













