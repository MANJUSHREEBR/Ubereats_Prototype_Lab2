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

export const addFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE_REQUEST:
      return {
        loading: true,
      };
    case ADD_FAVORITE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_FAVORITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const FavRestaurantListReducer = (state = { FavRestaurants: [] }, action) => {
  switch (action.type) {
    case GET_FAVORITES_REQUEST:
      return { loadingFromState: true, FavRestaurants: [] };
    case GET_FAVORITES_SUCCESS:
      return {
        loadingFromState: false,
        FavRestaurants: action.payload.favorites,
      };
    case GET_FAVORITES_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};
