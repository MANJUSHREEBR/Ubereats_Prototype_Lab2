/* eslint-disable no-console */
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

export const RestaurantListReducer = (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loadingFromState: true, restaurants: [] };
    case RESTAURANT_LIST_SUCCESS:
      return {
        loadingFromState: false,
        restaurants: action.payload,
      };
    case RESTAURANT_LIST_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};

export const RestauranthDetailsReducer = (state = { restaurant: [{}] }, action) => {
  switch (action.type) {
    case RESTAURANT_DETAILS_REQUEST:
      return { loadingFromState: true, restaurant: { } };
    case RESTAURANT_DETAILS_SUCCESS:
      return {
        loadingFromState: false,
        restaurant: action.payload,
      };
    case RESTAURANT_DETAILS_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};

export const RestaurantDishListReducer = (state = { restdishes: [] }, action) => {
  switch (action.type) {
    case RESTAURANTDISH_LIST_REQUEST:
      return { loadingFromState: true, restdishes: [] };
    case RESTAURANTDISH_LIST_SUCCESS:
      return {
        loadingFromState: false,
        restdishes: action.payload,
      };
    case RESTAURANTDISH_LIST_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};
