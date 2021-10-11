/* eslint-disable import/prefer-default-export */
import {
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
}
  from '../constants/favoriteConstants';
import { API } from '../../config';

export const saveFavoriteToDatabase = (id) => (dispatch, getState) => {
  dispatch({ type: ADD_FAVORITE_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  fetch(`${API}/customer/addfav/${customerSigninInfo.customer[0].id}/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: ADD_FAVORITE_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_FAVORITE_FAIL,
        payload: error,
      });
    });
};

export const listFavRestaurants = () => (dispatch, getState) => {
  dispatch({ type: GET_FAVORITES_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  fetch(`${API}/customer/favorites/${customerSigninInfo.customer[0].id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: GET_FAVORITES_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_FAVORITES_FAIL,
        payload: error,
      });
    });
};
