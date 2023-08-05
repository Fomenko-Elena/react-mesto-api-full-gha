import React from 'react';
import { Navigate, Route } from "react-router-dom";

const ProtectedRouteElement = ({ component: Component, loggedIn, ...props  }) => {
  return (
    loggedIn ? <Component {...props}/> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRouteElement;