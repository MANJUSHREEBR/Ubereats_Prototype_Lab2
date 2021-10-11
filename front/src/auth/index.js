/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { API } from '../config';

export const signUp = (user, isCustomer) => fetch(`${API}/${isCustomer}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),

})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

export const signin = (user, isCustomer) => fetch(`${API}/${isCustomer}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),

})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/customer/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  }

  return false;
};
