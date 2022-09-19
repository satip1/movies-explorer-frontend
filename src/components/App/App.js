import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { IMAGESERVER } from '../../utils/constants';

// импорт api для работы с сервером
import mainapi from '../../utils/MainApi';
import moviesapi from '../../utils/MoviesApi'

// глобальный контекст 
import CurrentUserContext from '../../context/CurrentUserContext';


const App = () => {

  // перемещаемся по страницам
  const history = useHistory();
  const location = useLocation();

  // глобальный контекст пользователя
  const [currentUser, setCurrentUser] = React.useState({
    id: ' ',
    name: ' ',
    email: ' ',
  });
  // сообщения об ошибках
  const [errormsg, setErrorMsg] = React.useState('');
  // регистрация пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);
  // токен пользователя
  const [token, setToken] = React.useState('');

  //серверный список фильмов
  const [movieslist, setMoviesList] = React.useState([]);
  //полный список сохраненных фильмов
  const [moviessaved, setMoviesSaved] = React.useState([]);


  const updateMovies = () => {
    let time = JSON.parse(localStorage.getItem('bd'));

    if (time == null || time.length == 0) {
      moviesapi.getMovies()
        .then((movies) => {
          localStorage.setItem('bd', JSON.stringify(movies))
        })
        .catch((err) => { return setErrorMsg(err.message) })
    }
    else {
      setMoviesList(time);
    }
  }

  // при первой отрисовке проверяем, есть ли jwt
  React.useEffect(() => {
    // updateMovies();
    console.log('при первом монтировании компонента запущен')
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return
    mainapi.getUserData(jwt)
      .then((user) => {
        setCurrentUser({
          id: user.user._id,
          name: user.user.name,
          email: user.user.email
        });
        setToken(jwt);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log('Нет токена')
        history.push('/');
      })
  }, []);

  // обновляем локальное хранилище всех фильмов 
  React.useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movieslist));
  }, [movieslist])


  // обновляем локальное хранилище сохраненных фильмов 
  React.useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(moviessaved));
  }, [moviessaved])

  const validURL = (str) => {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
      return false;
    } else {
      return true;
    }
  }


  React.useEffect(() => {
    updateMovies();
    if (loggedIn) {

      Promise.all([mainapi.getUserData(token), mainapi.getSavedMovies(token)])
        .then(([user, saved]) => {
          const movies = JSON.parse(localStorage.getItem('bd'))
          const newmovies = movies.map((item) => {
            item.country = item.country || 'https://yandex.ru';
            item.director = item.director || 'https://yandex.ru';
            item.duration = item.duration || 0;
            item.description = item.description || 'https://yandex.ru';
            item.image = item.image || 'https://yandex.ru';
            item.trailerLink = validURL(item.trailerLink) ? item.trailerLink : 'https://yandex.ru';
            item.thumbnail = validURL(item.thumbnail) ? item.thumbnail : 'https://yandex.ru';
            item.nameRU = item.nameRU || 'https://yandex.ru';
            item.nameEN = item.nameEN || 'https://yandex.ru';
            item._id = '';
            item.movieId = item.id;
            item.saved = false;
            return item
          });

          // список всех фильмов из сайта
          const timemovies = newmovies.map((item) => {
            let time = saved.find((save) => save.movieId === item.movieId)
            if (time) { item.saved = true; item._id = time._id }
            return item;
          });
          setMoviesList(timemovies);

          // список всех сохраненных фильмов из базы
          let time = saved.map(elem => { elem.saved = true; return elem });
          setMoviesSaved(time);

          localStorage.setItem('movies', JSON.stringify(movieslist));
          localStorage.setItem('saved', JSON.stringify(moviessaved));

          setCurrentUser({
            id: user.user._id,
            name: user.user.name,
            email: user.user.email
          });

          setLoggedIn(true);

        })
        .catch((err) => { return setErrorMsg(err.message) })
    }
  }, [token])


  // обработчик формы регистрации нового пользователя
  const handleRegSubmit = (name, email, password) => {
    mainapi.setRegUser(name, email, password)
      .then((res) => {
        return new Promise(resolve => setTimeout(resolve, 1000))
      })
      .then(() => {
        // setErrorMsg('err.message'); 
        // setLoggedIn(true);
        handleAuthSubmit(email, password);
      })
      .catch((err) => {
        if (err.status === 400) return setErrorMsg('Ошибка заполнения полей')
        if (err.status === 409) return setErrorMsg('Используйте другой email')
      });
  }

  // обработчик формы авторизации
  const handleAuthSubmit = (email, password) => {
    mainapi.getAuthUser(email, password)
      .then((res) => {
        if (localStorage.getItem('jwt')) localStorage.removeItem('jwt')
        mainapi.getUserData(res.token)
          .then((data) => {
            setCurrentUser({
              id: data.user._id,
              name: data.user.name,
              email: data.user.email
            });
            localStorage.setItem('jwt', res.token);
            setToken(res.token);
            setLoggedIn(true);
            history.push('/movies');
          })

      })
      .catch((err) => {
        if (err.status === 400) return setErrorMsg('Ошибка авторизации');
        if (err.status === 401) return setErrorMsg('Неправильный email или пароль')
        return console.log(err)
      })
  }

  // обработчик формы редактирования профиля
  const handleEditSubmit = (name, email) => {
    mainapi.editUserData(token, name, email)
      .then((data) => {
        setCurrentUser({
          id: data.user._id,
          name: data.user.name,
          email: data.user.email
        });
        setErrorMsg('Данные пользователя успешно обновились');
        return
      })
      .catch((err) => { return setErrorMsg(err.message) })
  }

  // выйти из аккаунта
  const handleGoOut = () => {
    localStorage.clear();
    setMoviesList([]);
    setMoviesSaved([]);
    setLoggedIn(false);
    setToken('');
    setCurrentUser({ id: ' ', name: ' ', email: ' ' });
    setErrorMsg('');
    history.push('/');
  }

  // const handleGoOut = () => {
  //   // localStorage.clear();
  //   localStorage.removeItem('clipchecked');
  //   localStorage.removeItem('clipsallfind');
  //   localStorage.removeItem('jwt');
  //   localStorage.removeItem('saved');
  //   localStorage.removeItem('searchword');
  //   setLoggedIn(false);
  //   setToken('');
  //   setCurrentUser({ id: ' ', name: ' ', email: ' ' });
  //   setErrorMsg('');
  //   history.push('/');
  // }






  // ************************************************** 


  const update = () => {
    let all = JSON.parse(localStorage.getItem('clipsallfind'));
    if (all === null) return
    let b = all.map((elem) => {
      const f = movieslist.find((item) => item.movieId === elem.movieId);
      elem._id = f._id;
      elem.saved = f.saved;
      return elem
    })
    localStorage.setItem('clipsallfind', JSON.stringify(b))
  }

  // добавление фильма в сохраненные
  const addSavedMovies = (movie) => {
    // console.log('addSavedMovies тип данных movie.movieId', typeof movie.movieId)
    const thumb = `${IMAGESERVER}${movie.image.formats.thumbnail.url}`;
    const image = `${IMAGESERVER}${movie.image.url}`;
    const item = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: image,
      trailerLink: movie.trailerLink,
      thumbnail: thumb,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }
    mainapi.addSaveMovie(token, item)
      .then((res) => {
        // обновили общий список
        let newlist = movieslist.map((elem) => {
          if (elem.movieId === res.movie.movieId) {
            elem._id = res.movie._id;
            elem.saved = true;
          }
          return elem;
        })
        setMoviesList(newlist);

        // обновили список сохраненных фильмов
        item._id = res.movie._id;
        item.saved = true;
        let saved = [...moviessaved, item];
        setMoviesSaved(saved);
      })
      .catch((err) => console.log('Фильм не сохранился: ', err));
  }

  // удаление фильма из сохраненных
  const delSavedMovies = (movie) => {
    mainapi.deleteSaveMovie(token, movie._id)
      .then((res) => {
        // обновили общий список 
        // console.log('result delete res: ', res)
        let time = movieslist.map((elem) => {
          if (elem.movieId === movie.movieId) {
            elem._id = '';
            elem.saved = false;
          }
          return elem;
        })
        setMoviesList(time);

        // обновили список сохраненных фильмов
        // console.log('movie: ', movie)
        let saved = moviessaved.map((elem) => elem);
        let index = saved.findIndex((elem) => elem.movieId === movie.movieId)
        if (index < 0) {
          console.log('Проблемы с удалением: даная карточка в списке сохраненных не найдена  index', index);
          console.log('Дальше приложение будет работать неправильно. Выйди из аккаунта. Удали записи базы')
          return;
        }
        saved.splice(index, 1);
        setMoviesSaved(saved);
        update();
      })
      .catch((err) => console.log('Сохранение не отменилось: ', err));
  }

  // обработчик кнопки сохранения фильма 
  const handleSaveMovies = (movie) => {
    if (movie.saved) {
      addSavedMovies(movie)
    }
    else {
      delSavedMovies(movie)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Switch>
        <ProtectedRoute exact path="/sign-in"
          loggedIn={!loggedIn}
          component={Login}
          onAuthUser={handleAuthSubmit}
          errormsg={errormsg}
          setErrorMsg={setErrorMsg}
        />

        <ProtectedRoute exact path="/sign-up"
          loggedIn={!loggedIn}
          component={Register}
          onRegUser={handleRegSubmit}
          errormsg={errormsg}
          setErrorMsg={setErrorMsg}
        />

        <ProtectedRoute exact path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onEditUser={handleEditSubmit}
          onGoOut={handleGoOut}
          errormsg={errormsg}
          setErrorMsg={setErrorMsg}
        />

        <ProtectedRoute exact path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          mode='movies'
          movies={movieslist}
          moviessaved={moviessaved}
          onSaveMovies={handleSaveMovies}
        />

        <ProtectedRoute exact path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          mode='saved'
          movies={moviessaved}
          onDelSaved={delSavedMovies}
        />

        <Route exact path='/'>
          <Main
            onLoggedIn={loggedIn}
          />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>

      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
