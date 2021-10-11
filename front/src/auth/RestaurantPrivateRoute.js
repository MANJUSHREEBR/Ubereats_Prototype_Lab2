/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const RestaurantPrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => (isAuthenticated() && isAuthenticated().customer[0].role === 1 ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/customersignin', state: { from: props.location } }} />
    ))}
  />
);

export default RestaurantPrivateRoute;
