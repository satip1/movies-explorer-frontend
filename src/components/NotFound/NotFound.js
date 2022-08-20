import React from "react";
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div className="page">
            <section className="error404">
                <h1 className="error404__h1">404</h1>
                <p className="error404__text">Страница не найдена</p>
                <Link to="/" className="error404__back">Назад</Link>
            </section>
        </div>
    )
}

export default NotFound;











