import React from "react";
import './SearchForm.css'
import icon from '../../images/icon.svg'

function SearchForm() {
    return (
        <div className="page">
            <section className="search">
                <form className="search__form">
                    <section className="search__field">
                        <input type="text" className="search__input" placeholder="Фильм" />
                        <button type="submit" className="search__btn">
                            <img src={icon} alt="Поиск" className="search__img" />
                        </button>
                    </section>

                    <section className="search__shortmovie">
                        <label className="search__checklabel">
                            <input type="checkbox" name="check" id="check" className="search__checkbox" />
                            <div className="search__switch"></div>
                            <span className="search__span">Короткометражки</span>
                        </label>
                    </section>
                </form>
            </section>
        </div>
    )
}

export default SearchForm;












