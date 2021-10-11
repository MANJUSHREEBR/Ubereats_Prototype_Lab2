/* eslint-disable import/prefer-default-export */
import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  DISH_DETAILS_REQUEST,
  DISH_DETAILS_SUCCESS,
  DISH_DETAILS_FAIL,
  DISH_EDIT_REQUEST,
  DISH_EDIT_SUCCESS,
  DISH_EDIT_FAIL,
} from '../constants/dishConstants';
import { API } from '../../config';

export const listDishes = (sortBy) => (dispatch) => {
  dispatch({ type: DISH_LIST_REQUEST });
  fetch(`${API}/dishes?sortBy=${sortBy}&order=DESC&limit=100`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: DISH_LIST_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: DISH_LIST_FAIL,
        payload: error,
      });
    });
};

export const getDishDetails = (id) => (dispatch) => {
  dispatch({ type: DISH_DETAILS_REQUEST });
  fetch(`${API}/dishes/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: DISH_DETAILS_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: DISH_DETAILS_FAIL,
        payload: error,
      });
    });
};

export const editDishes = (restid, dishid, token, formData) => (dispatch) => {
  dispatch({ type: DISH_EDIT_REQUEST });
  fetch(`${API}/dishes/${dishid}/${restid}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: DISH_EDIT_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: DISH_EDIT_FAIL,
        payload: error,
      });
    });
};
