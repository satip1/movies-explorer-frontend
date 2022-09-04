import React from "react";
import './SearchForm.css'
import icon from '../../images/icon.png'



function SearchForm(props) {

    const [inputtext, setInputText] = React.useState('') // значение инпута
    const [errortext, setErrorText] = React.useState(''); // текст ошибки инпута

    const [checked, setChecked] = React.useState(false); // отметка выбора короткометражки
    const [resulttext, SetResultText] = React.useState(''); // сообщение результата поиска

    const changeCheckbox = () => {
        setChecked(!checked);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (inputtext === '') { return setErrorText('Нужно ввести ключевое слово') }
        props.searchMovies(inputtext, checked);
    }

    const handleInputChange = (evt) => { 
        setInputText(evt.target.value);
        if (errortext.length !== 0) { setErrorText('') }
    }

    React.useEffect(() => {
          if (resulttext.length > 0) props.onMessage(' ');        
    }, [inputtext])

    React.useEffect(() => {
        SetResultText(props.message);
    }, [props.message])

    React.useEffect(() => {
        setInputText(props.searchword);
    }, [props.searchword])

    React.useEffect(() => {
        setChecked(props.clipchecked);
    }, [props.clipchecked])


    return (
        <article className="page">
            <section className="search">
                <form className="search__form" onSubmit={handleSubmit}>
                    <p className="search__error">{errortext}</p>
                    <section className="search__field">
                        <input
                            type="text"
                            name="text"
                            className="search__input"
                            placeholder="Поиск фильма"
                            value={inputtext || ''}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="search__btn">
                            <img src={icon} alt="Поиск" className="search__img" />
                        </button>
                    </section>

                    <section className="search__shortmovie">
                        <label className="search__checklabel">
                            <input
                                type="checkbox"
                                name="check"
                                id="check"
                                checked={checked}
                                onChange={changeCheckbox}
                                className="search__checkbox" />
                            <div className="search__switch"></div>
                            <span className="search__span">Короткометражки</span>
                        </label>
                    </section>
                    <p className="search__message">{resulttext}</p>
                </form>


            </section>
        </article>
    )
}

export default SearchForm;












