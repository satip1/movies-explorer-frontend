import React from "react";
import { Link, useHistory } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const history = useHistory();

    const handleBackClick = (evt) => {
        evt.preventDefault();
        // history.goBack();
        history.go(-2);
       
    }

    return (
        <div className="page">
            <section className="error404">
                <h1 className="error404__h1">404</h1>
                <p className="error404__text">Страница не найдена</p>
                <Link to="" onClick={handleBackClick} className="error404__back">Назад</Link>
            </section>
        </div>
    )

    // return (
    //     <div className="page">
    //         <section className="error404">
    //             <h1 className="error404__h1">404</h1>
    //             <p className="error404__text">Страница не найдена</p>
    //             <button className="error404__back" onClick={handleBackClick}>Назад</button>
    //         </section>
    //     </div>
    // )







}

export default NotFound;











