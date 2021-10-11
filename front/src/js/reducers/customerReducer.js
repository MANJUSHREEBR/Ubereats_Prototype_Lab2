/* eslint-disable import/prefer-default-export */
import {
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_SIGNOUT_SUCCESS,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_FAIL,
  CUSTOMER_SIGNUP_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_FAIL,
} from '../constants/customerConstants';

export const customerSigninReducer = (state = { }, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNIN_REQUEST:
      return { loadingFromState: true, successFromState: false };
    case CUSTOMER_SIGNIN_SUCCESS:
      return {
        loadingFromState: false,
        customerSigninInfo: action.payload,
        successFromState: true,
      };
    case CUSTOMER_SIGNIN_FAIL:
      return { loadingFromState: false, errorFromState: action.payload, successFromState: false };
    case CUSTOMER_SIGNOUT_SUCCESS:
      return { };
    default:
      return state;
  }
};

export const customerSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNUP_REQUEST:
      return { loadingFromState: true, successFromState: false };
    case CUSTOMER_SIGNUP_SUCCESS:
      return {
        loadingFromState: false,
        successFromState: true,
      };
    case CUSTOMER_SIGNUP_FAIL:
      return { loadingFromState: false, errorFromState: action.payload, successFromState: false };
    default:
      return state;
  }
};

export const customerUpdateProfileReducer = (state = { }, action) => {
  switch (action.type) {
    case CUSTOMER_UPDATE_PROFILE_REQUEST:
      return { loadingFromState: true };
    case CUSTOMER_UPDATE_PROFILE_SUCCESS:
      return {
        loadingFromState: false,
        successFromState: true,
        customerInfo: action.payload,
      };
    case CUSTOMER_UPDATE_PROFILE_FAIL:
      return { loadingFromState: false, errorFromState: action.payload, successFromState: false };
    default:
      return state;
  }
};
