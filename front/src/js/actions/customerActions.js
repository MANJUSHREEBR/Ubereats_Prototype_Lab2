/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
// import axios from 'axios';

import {
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_SIGNOUT_SUCCESS,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_SUCCESS,
  CUSTOMER_SIGNUP_FAIL,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_FAIL,
} from '../constants/customerConstants';
import {
  CART_GET_DATABASE_REQUEST,
  CART_GET_DATABASE_SUCCESS,
  CART_GET_DATABASE_FAIL,
} from '../constants/cartConstants';

import { API } from '../../config';

export const customerSignin = (user, isCustomer) => (dispatch, getState) => {
  dispatch({ type: CUSTOMER_SIGNIN_REQUEST });
  fetch(`${API}/${isCustomer}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CUSTOMER_SIGNIN_SUCCESS,
          payload: response,
        });
        localStorage.setItem('customerInfo', JSON.stringify(response));
        if (isCustomer === 'customer') {
          dispatch({ type: CART_GET_DATABASE_REQUEST });
          const { customerSignin: { customerSigninInfo } } = getState();

          fetch(`${API}/customer/cart/${customerSigninInfo.customer[0].id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${customerSigninInfo.token}`,
            },

          })
            .then((resp) => resp.json())
            .then((resp) => {
              if (!resp.error) {
                dispatch({
                  type: CART_GET_DATABASE_SUCCESS,
                  payload: resp,
                });
              } else {
                throw (resp.error);
              }
            })
            .catch((error) => {
              dispatch({
                type: CART_GET_DATABASE_FAIL,
                payload: error,
              });
            });
        }
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_SIGNIN_FAIL,
        payload: error,
      });
    });
};

export const customersignup = (user, isCustomer) => (dispatch) => {
  dispatch({ type: CUSTOMER_SIGNUP_REQUEST });
  fetch(`${API}/${isCustomer}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CUSTOMER_SIGNUP_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_SIGNUP_FAIL,
        payload: error,
      });
    });
};

export const customerUpdateProfile = (user, token, id, isCustomer) => (dispatch, getState) => {
  dispatch({ type: CUSTOMER_UPDATE_PROFILE_REQUEST });

  fetch(`${API}/${isCustomer}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: user,

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CUSTOMER_UPDATE_PROFILE_SUCCESS,
          payload: response,
        });
        console.log(response);
        const customerInfo = { token, customer: response.customer };
        dispatch({
          type: CUSTOMER_SIGNIN_SUCCESS,
          payload: customerInfo,
        });
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_UPDATE_PROFILE_FAIL,
        payload: error,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('customerInfo');
  dispatch({
    type: CUSTOMER_SIGNOUT_SUCCESS,
  });
};
