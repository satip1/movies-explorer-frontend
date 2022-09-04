import React from "react";
import './Movies.css';
import { DURATION_SHORT_CLIP } from '../../utils/constants'

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import {
    MIDDLE_SCREEN_WIDTH,
    SMALL_SCREEN_WIDTH,
    LARGE_SCREEN_EPISODE,
    MIDDLE_SCREEN_EPISODE,
    SMALL_SCREEN_EPISODE,
    LARGE_SCREEN_STEP,
    MIDDLE_SCREEN_STEP,
    SMALL_SCREEN_STEP,
} from '../../utils/constants'


const Movies = (props) => {


    const [loader, setLoader] = React.useState(false); //запускает лоудер
    const [message, SetMessage] = React.useState(''); // какие-то сообщения
    const [btnstill, setBtnStill] = React.useState(true);

    const [still, setStill] = React.useState(''); // шаг в зависимости от разрешения, зависит от разрешения  
    const [startepisod, setStartEpisod] = React.useState(''); // число первоначальной загрузки карточек, зависит от разрешения
    const [target, setTarget] = React.useState([]); // конечный массив для загрузки


    const [clipsall, setClipsAll] = React.useState([]); // тут все карточки, полученные из сайта, нужны для поиска
    const [clipsallfind, setClipsAllFind] = React.useState([]); // массив результата поиска карточек 
    const [searchword, setSearchWord] = React.useState(''); // это поисковое слово
    const [clipchecked, setClipChecked] = React.useState(''); // это отметка выбора короткометражки

    const [tapflag, setTapFlag] = React.useState(false); // это отметка выбора 


    React.useEffect(() => {
        let ls_searchword = '';
        let ls_clipchecked = 'false';
        let ls_clipsallfind = '[]';

        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            ls_searchword = localStorage.getItem('searchword');
            ls_clipchecked = localStorage.getItem('clipchecked');
            ls_clipsallfind = localStorage.getItem('clipsallfind');

            if (!(ls_searchword && ls_clipchecked && ls_clipsallfind)) {
                localStorage.removeItem('searchword');
                localStorage.removeItem('clipchecked');
                localStorage.removeItem('clipsallfind');
                ls_searchword = '';
                ls_clipchecked = 'false';
                ls_clipsallfind = '[]';
            }
        }

        setClipsAllFind(JSON.parse(ls_clipsallfind));
        setClipChecked(JSON.parse(ls_clipchecked));

        setSearchWord(ls_searchword);
        console.log('кошмар');

        handleResizeScreen();
        window.addEventListener('resize', handleResizeScreen);
        return window.removeEventListener('resize', handleResizeScreen);

    }, [])

    React.useEffect(() => {
        let time = props.movies.map((item) => item)
        setClipsAll(time);
    }, [props.movies])

    React.useEffect(() => {
        if (tapflag) {
            let time = clipsallfind.map((elem) => {
                let find = props.movies.find((item) => item.movieId === elem.movieId)
                if (find) { elem._id = find._id; elem.movieId = find.movieId }
                return elem
            })
            setClipsAllFind(time);
            let ls_clipsallfind = JSON.stringify(time);
            localStorage.setItem('clipsallfind', ls_clipsallfind);
            setTapFlag(false);
        }
    }, [props.moviessaved])

    React.useEffect(() => {
        if (clipsallfind.length <= startepisod) setBtnStill(true)
        else setBtnStill(false);
        let length = 0;
        if (target.length === 0) length = startepisod
        else length = target.length;
        const time = clipsallfind.slice(0, length);
        setTarget(time);
    }, [clipsallfind])


    const handleResizeScreen = () => {
        const width = window.innerWidth;
        if (width > MIDDLE_SCREEN_WIDTH) {
            setStartEpisod(LARGE_SCREEN_EPISODE);
            setStill(LARGE_SCREEN_STEP);
        }

        if ((width <= MIDDLE_SCREEN_WIDTH) && (width > SMALL_SCREEN_WIDTH)) {
            setStartEpisod(MIDDLE_SCREEN_EPISODE);
            setStill(MIDDLE_SCREEN_STEP);
        }

        if (width <= SMALL_SCREEN_WIDTH) {
            setStartEpisod(SMALL_SCREEN_EPISODE);
            setStill(SMALL_SCREEN_STEP);
        }
    }

    const searchMovies = (text, checked) => {
        setLoader(true);
        setTimeout(() => setLoader(false), 300)
        setTarget([]);
        const entry = new RegExp(text, 'gi');
        let result = [];
        if (checked)
            result = clipsall.filter(item => entry.test(item.nameRU) && item.duration <= DURATION_SHORT_CLIP)
        else result = clipsall.filter(item => entry.test(item.nameRU))

        if (result.length === 0) { SetMessage('Ничего не найдено'); }
        localStorage.setItem('clipsallfind', JSON.stringify(result));
        localStorage.setItem('searchword', text);
        localStorage.setItem('clipchecked', JSON.stringify(checked));
        setTimeout(() => {
            setClipsAllFind(result);
            setSearchWord(text);
            setClipChecked(checked);
        }, 500)
    }

    const handleClickStill = () => {
        setBtnStill(false);
        let end = target.length + still;
        if (clipsallfind.length < end) { end = clipsallfind.length; setBtnStill(true) };
        const time = clipsallfind.slice(0, end);
        setTarget(time);
    }

    const hendleSaveClip = (item) => {
        setTapFlag(true);
        item.saved = !item.saved;
        props.onSaveMovies(item);
    }

    return (
        <main>
            <SearchForm
                mode={props.mode}
                searchword={searchword}
                clipchecked={clipchecked}
                message={message}
                onMessage={SetMessage}
                searchMovies={searchMovies}
            />

            <MoviesCardList
                mode={props.mode}
                movies={target}
                loader={loader}
                btnstill={btnstill}
                onSaveMovies={hendleSaveClip}
                onStill={handleClickStill}
            />
        </main>
    )
}

export default Movies;
