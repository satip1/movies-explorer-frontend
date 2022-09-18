import React from "react";
import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from '../../context/CurrentUserContext';



const ProtectedRoute = ({ loggedIn, ...props }) => {

  console.log('Запустился протект loggedIn ', loggedIn)
  return loggedIn ? <Route {...props} /> : <Redirect to = "/" />;

  //  return <Route {...props} /> ; 
}






export default ProtectedRoute;