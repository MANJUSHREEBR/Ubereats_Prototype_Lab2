/* eslint-disable import/prefer-default-export */
import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
  RESTAURANTDISH_LIST_REQUEST,
  RESTAURANTDISH_LIST_SUCCESS,
  RESTAURANTDISH_LIST_FAIL,
} from '../constants/restaurantConstants';
import { API } from '../../config';

export const listRestaurants = (keyword = 'Pickup', location = 'San Jose') => (dispatch) => {
  dispatch({ type: RESTAURANT_LIST_REQUEST });
  fetch(`${API}/restaurants?search=${keyword}&location=${location}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: RESTAURANT_LIST_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: RESTAURANT_LIST_FAIL,
        payload: error,
      });
    });
};
export const getRestaurantDetails = (id) => (dispatch) => {
  dispatch({ type: RESTAURANT_DETAILS_REQUEST });
  fetch(`${API}/restaurant/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: RESTAURANT_DETAILS_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: RESTAURANT_DETAILS_FAIL,
        payload: error,
      });
    });
};

export const RestaurantlistDishes = (id) => (dispatch) => {
  dispatch({ type: RESTAURANTDISH_LIST_REQUEST });
  fetch(`${API}/restaurant/dishes/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: RESTAURANTDISH_LIST_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: RESTAURANTDISH_LIST_FAIL,
        payload: error,
      });
    });
};
