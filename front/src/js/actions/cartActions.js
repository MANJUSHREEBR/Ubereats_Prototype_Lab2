/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import {
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_REQUEST,
  CART_SAVE_SUCCESS,
  CART_SAVE_FAIL,
  CART_REMOVE_ITEMS,
  CART_REMOVE_ITEM,
  // CART_CLEAR_AND_ADD_NEW_ITEM,
  // CART_GET_DATABASE_REQUEST,
  // CART_GET_DATABASE_SUCCESS,
  // CART_GET_DATABASE_FAIL,
} from '../constants/cartConstants';
import { CUSTOMER_SIGNOUT_SUCCESS } from '../constants/customerConstants';
import { API } from '../../config';

export const addToCart = (id, qty) => (dispatch, getState) => {
  fetch(`${API}/dishes/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        // if (newitems == 'false') {
        dispatch({
          type: CART_ADD_ITEM,
          payload: {
            dish: response._id,
            name: response.name,
            photo: response.photo,
            price: response.price,
            description: response.description,
            qty,
          },
        });
        // }
        // else {
        //   dispatch({
        //     type: CART_CLEAR_AND_ADD_NEW_ITEM,
        //     payload: {
        //       dish: response.id,
        //       name: response.name,
        //       photo: response.photo,
        //       price: response.price,
        //       description: response.description,
        //       qty,
        //     },
        //   });
        // }
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
      }
    });
};

export const saveShippindAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const saveCartToDatabase = (order) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  fetch(`${API}/customer/addcart/${customerSigninInfo.customer[0].id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },
    body: JSON.stringify(order),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CART_SAVE_SUCCESS,
          payload: response,
        });
        localStorage.removeItem('customerInfo');
        dispatch({
          type: CUSTOMER_SIGNOUT_SUCCESS,
        });
        dispatch({
          type: CART_REMOVE_ITEMS,
          payload: {},
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CART_SAVE_FAIL,
        payload: error,
      });
    });
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
