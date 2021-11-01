/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_STATUS_UPDATE_REQUEST,
  ORDER_STATUS_UPDATE_SUCCESS,
  ORDER_STATUS_UPDATE_FAIL,
}
  from '../constants/orderConstants';
import { CART_REMOVE_ITEMS } from '../constants/cartConstants';
import { API } from '../../config';

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  order.user = customerSigninInfo.customer._id;
  fetch(`${API}/order/create`, {
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
          type: ORDER_CREATE_SUCCESS,
          payload: response,
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
        type: ORDER_CREATE_FAIL,
        payload: error,
      });
    });
};

export const getOrderDetails = (id) => (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  fetch(`${API}/order/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error,
      });
    });
};

export const getMyOrderList = () => (dispatch, getState) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  let url = `${API}/orders/${customerSigninInfo.customer._id} `;

  if (customerSigninInfo.customer.role === 1) url = `${API}/restaurant/orders/${customerSigninInfo.customer._id} `;

  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: MY_ORDER_LIST_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: MY_ORDER_LIST_FAIL,
        payload: error,
      });
    });
};

export const updateOrderStatus = (data, id) => (dispatch, getState) => {
  const { customerSignin: { customerSigninInfo } } = getState();
  dispatch({ type: ORDER_STATUS_UPDATE_REQUEST });
  fetch(`${API}/restaurant/orders/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },
    body: JSON.stringify(data),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: ORDER_STATUS_UPDATE_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_STATUS_UPDATE_FAIL,
        payload: error,
      });
    });
};
