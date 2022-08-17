import React from 'react';
import { Route, Switch } from 'react-router-dom';
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



function App() {
  return (
    <>      
      <Switch>
        <Route path='/sign-in'>
          <Header />
          <Login />
        </Route>

        <Route path='/sign-up'>
          <Header />
          <Register />
        </Route>

        <Route path='/profile'>
          <Header />
          <Profile />
        </Route>

        <Route path='/movies'>
          <Header /> 
          <Movies />
          <Footer />
        </Route>

        <Route path='/saved-movies'>
          <Header />  
          <SavedMovies />
          <Footer />
        </Route>
        

        <Route exact path='/'>
          <Header />    
          <Main />
          <Footer />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>

    </>
  );
}

export default App;
