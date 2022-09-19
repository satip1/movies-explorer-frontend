import React from "react";
import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from '../../context/CurrentUserContext';



const ProtectedRoute = ({component: Component, ...props}) => {
  console.log('запущено из защиты роутера props.loggedIn ', props.loggedIn)
  return (
    <Route>
      {
       props.loggedIn ? <Component {...props}/> : <Redirect to="/"/>
      }
    </Route>
  )
}

export default ProtectedRoute;