import React from "react";
import './SavedMovies';
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


const SavedMovies = (props) => {

    const [loader, setLoader] = React.useState(false); //запускает лоудер
    const [message, SetMessage] = React.useState(''); // какие-то сообщения
    const [btnstill, setBtnStill] = React.useState(true);

    const [still, setStill] = React.useState(''); // шаг в зависимости от разрешения, зависит от разрешения  
    const [startepisod, setStartEpisod] = React.useState(''); // число первоначальной загрузки карточек, зависит от разрешения
    const [target, setTarget] = React.useState([]); // конечный массив для загрузки

    const [clipsall, setClipsAll] = React.useState([]); // тут все карточки, полученные из сайта, нужны для поиска
    const [clipsallfind, setClipsAllFind] = React.useState([]); // массив результата поиска карточек 

    React.useEffect(() => {
        let time = props.movies.map((item) => item);
        setClipsAll(time);
        setClipsAllFind(time);
        handleResizeScreen();
        window.addEventListener('resize', handleResizeScreen);
        return window.removeEventListener('resize', handleResizeScreen);
    }, []);


    React.useEffect(() => {
        let time = props.movies.map((item) => item)
        setClipsAll(time);
        let index;
        time = target.map((elem) => {
            index = clipsall.find((item) => item.movieId === elem.movieId)
            if (index.saved !== elem.saved) {elem.saved = index.saved; elem._id = index._id}
            return elem
        })
    }, [props.movies])

    React.useEffect(() => {
        if (clipsallfind.length <= startepisod) setBtnStill(true)
        else setBtnStill(false);
        const time = clipsallfind.slice(0, startepisod);
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

    const handleClickStill = () => {
        setBtnStill(false);
        let end = target.length + still;
        if (clipsallfind.length < end) { end = clipsallfind.length; setBtnStill(true) };
        const time = clipsallfind.slice(0, end);
        setTarget(time);
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

        setTimeout(() => {
            setClipsAllFind(result);
        }, 500)
    }

    const hendleDelClip = (item) => {
        props.onDelSaved(item);
        let time = target.map((item) => item);
        let index = time.findIndex((elem) => elem.movieId === item.movieId)
        time.splice(index, 1);
        setTarget(time);
        // props.onsetTapSaved(true);
    }
    return (
        <main>
            <SearchForm
                mode={props.mode}
                searchword={``}
                clipchecked={false}
                message={message}
                onMessage={SetMessage}
                searchMovies={searchMovies}
            />

            <MoviesCardList
                mode={props.mode}
                movies={target}
                loader={loader}
                btnstill={btnstill}
                onSaveMovies={hendleDelClip}
                onStill={handleClickStill}
            />
        </main>
    )
}


export default SavedMovies;
