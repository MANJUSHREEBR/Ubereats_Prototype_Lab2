/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import {
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_REQUEST,
  CART_SAVE_SUCCESS,
  CART_SAVE_FAIL,
  CART_REMOVE_ITEMS,
  CART_GET_DATABASE_REQUEST,
  CART_GET_DATABASE_SUCCESS,
  CART_GET_DATABASE_FAIL,
  CART_CLEAR_AND_ADD_NEW_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.dish === item.dish);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.dish === existItem.dish ? item : x)),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    case CART_CLEAR_AND_ADD_NEW_ITEM:
      const itemNew = action.payload;
      return {
        ...state,
        cartItems: [itemNew],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_REMOVE_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case CART_GET_DATABASE_REQUEST:
      return {
        ...state,
      };
    case CART_GET_DATABASE_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.items,
      };
    case CART_GET_DATABASE_FAIL:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_SAVE_REQUEST:
      return {
        loading: true,
      };
    case CART_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CART_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
