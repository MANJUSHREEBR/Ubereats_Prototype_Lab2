/* eslint-disable no-duplicate-case */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
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

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myOrderListReducer = (state = { loading: true, orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
      };
    case MY_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true, orderItems: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderItems: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderStatusUpdateReducer = (state = { }, action) => {
  switch (action.type) {
    case ORDER_STATUS_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_STATUS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_STATUS_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
