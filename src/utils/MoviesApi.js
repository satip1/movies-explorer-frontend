import { MOVIESSERVER } from './constants';

class MoviesApi {

    constructor() {
      this.server = MOVIESSERVER;
    }

  getMovies() {
    return fetch(this.server, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) return res.json()
        else Promise.reject({ status: res.status, text: res.statusText })
      })
      .catch (err => err);
  }

  
}

const moviesapi = new MoviesApi();
export default moviesapi;












