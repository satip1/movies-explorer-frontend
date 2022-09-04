import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
  // список найденных фильмов из локал сторедж

  // при первой отрисовке проверяем, есть ли jwt
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return
    setLoggedIn(true);
    setToken(jwt);

  }, []);

  // обновляем локальное хранилище всех фильмов 
  React.useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movieslist));
  }, [movieslist])

  // обновляем локальное хранилище сохраненных фильмов 
  React.useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(moviessaved));
    let a = JSON.parse(localStorage.getItem('clipsallfind'));
    if (moviessaved.length > 0) {
      if (a) {
        let b = a.map((elem) => {
          let find = moviessaved.find((item) => item.movieId === elem.movieId)
          if (!find) { elem._id = ''; elem.saved = false }
          return elem
        })
        localStorage.setItem('clipsallfind', JSON.stringify(b))
      }
    }
  }, [moviessaved])


  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainapi.getUserData(token), moviesapi.getMovies(), mainapi.getSavedMovies(token)])
        .then(([user, movies, saved]) => {
          const newmovies = movies.map((item) => {
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

        })
        .catch((err) => { return setErrorMsg(err.message) })
    }
  }, [loggedIn, token])


  // обработчик формы регистрации нового пользователя
  const handleRegSubmit = (name, email, password) => {
    mainapi.setRegUser(name, email, password)
      .then((res) => {
        return new Promise(resolve => setTimeout(resolve, 1000))
      })
      .then(() => { setErrorMsg('err.message'); handleAuthSubmit(email, password); })
      .catch((err) => {
        if (err.status === 400) return setErrorMsg('Ошибка заполнения полей')
        if (err.status === 409) return setErrorMsg('Используйте другой email')
      });
  }

  // обработчик формы авторизации
  const handleAuthSubmit = (email, password) => {
    mainapi.getAuthUser(email, password)
      .then((res) => {
        console.log(res);
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
          .catch((err) => { return console.log(err) })
      })
      .catch((err) => {
        if (err.status === 400) return setErrorMsg('Ошибка авторизации');
        if (err.status === 401) return setErrorMsg('Неправильный email или пароль')
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
    setLoggedIn(false);
    setCurrentUser({ id: ' ', name: ' ', email: ' ' });
    setMoviesList([]);
    setErrorMsg('');
    setToken('');
    history.push('/');
  }

  // ************************************************** 

  // добавление фильма в сохраненные
  const addSavedMovies = (movie) => {
    // console.log('addSavedMovies тип данных movie.movieId', typeof movie.movieId)
    const thumb = `${IMAGESERVER}${movie.image.formats.thumbnail.url}`;
    const image = `${IMAGESERVER}${movie.image.url}`;
    console.log(image);
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
        console.log('result delete res: ', res)
        let time = movieslist.map((elem) => {
          if (elem.movieId === movie.movieId) {
            elem._id = '';
            elem.saved = false;
          }
          return elem;
        })
        setMoviesList(time);

        // обновили список сохраненных фильмов
        console.log('movie: ', movie)
        let saved = moviessaved.map((elem) => elem);
        let index = saved.findIndex((elem) => elem.movieId === movie.movieId)
        if (index < 0) {
          console.log('Проблемы с удалением: даная карточка в списке сохраненных не найдена  index', index);
          console.log('Дальше приложение будет работать неправильно. Выйди из аккаунта. Удали записи базы')
          return;
        }
        saved.splice(index, 1);
        setMoviesSaved(saved);
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
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Switch>
          <Route path='/sign-in'>
            <Header
            />
            <Login
              onAuthUser={handleAuthSubmit}
              errormsg={errormsg}
              setErrorMsg={setErrorMsg}
            />
          </Route>

          <Route path='/sign-up'>
            <Header />
            <Register
              onRegUser={handleRegSubmit}
              errormsg={errormsg}
              setErrorMsg={setErrorMsg}
            />
          </Route>

          <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
            <Header />
            <Profile
              onEditUser={handleEditSubmit}
              onGoOut={handleGoOut}
              errormsg={errormsg}
              setErrorMsg={setErrorMsg}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
            <Header />
            <Movies
              mode='movies'
              movies={movieslist}
              moviessaved={moviessaved}  
      
              onSaveMovies={handleSaveMovies}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
            <Header />
            <SavedMovies
              mode='saved'
              movies={moviessaved}
              onDelSaved={delSavedMovies}
            />
            <Footer />
          </ProtectedRoute>

          <Route exact path='/'>
            <Header
              onLoggedIn={loggedIn}
            />
            <Main />
            <Footer />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
