import { MAINSERVER, IMAGESERVER } from './constants';

class MainApi {
  constructor() {
    this.server = MAINSERVER;
    this.imgserver = IMAGESERVER;
  }

  // регистрация пользователя 
  setRegUser(name, email, password) {
    // console.log(name);
    // console.log(email);
    // console.log(password)
    return fetch(`${this.server}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": name, "email": email, "password": password })
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
  }


  // авторизация пользователя и получение токена
  getAuthUser(email, password) {
    return fetch(`${this.server}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": email, "password": password })
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
  }

  // получение данных о пользователе
  getUserData(jwt) {
    return fetch(`${this.server}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
  }

  // сохранение изменных данных о пользователе 
  editUserData = (jwt, name, email) => {
    return fetch(`${this.server}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({ name, email })
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
  }


  // получение сохраненных карточек
  getSavedMovies = (jwt) => {
    return fetch(`${this.server}/movies`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
  }

  // сохранить фильм в сохраненных
  addSaveMovie = (jwt, movie) => {
    return fetch(`${this.server}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image, ///
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,     //// 
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: String(movie.movieId),     
      })
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
  }

  // удалить фильм из сохраненных 
  deleteSaveMovie = (jwt, id) => {
    console.log('id карточки из mainapi:', id)
    return fetch(`${this.server}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.log(res);
        return Promise.reject(res);
      })
  }













}
const mainapi = new MainApi();
export default mainapi;



