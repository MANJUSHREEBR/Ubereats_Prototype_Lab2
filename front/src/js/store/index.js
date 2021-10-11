/* eslint-disable import/named */
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { customerSigninReducer, customerSignupReducer, customerUpdateProfileReducer } from '../reducers/customerReducer';
import { DishListReducer, DishDetailsReducer, DishUpdateReducer } from '../reducers/DishReducer';
import { cartReducer } from '../reducers/cartReducers';
import { RestaurantListReducer, RestauranthDetailsReducer, RestaurantDishListReducer } from '../reducers/RestaurantReducer';
import {
  orderCreateReducer, orderDetailsReducer, myOrderListReducer,
  orderStatusUpdateReducer,
} from '../reducers/orderReducer';
import { addFavoriteReducer, FavRestaurantListReducer } from '../reducers/favoriteReducer';

const reducers = combineReducers({
  customerSignin: customerSigninReducer,
  cutomerSignup: customerSignupReducer,
  dishList: DishListReducer,
  dishDetails: DishDetailsReducer,
  cart: cartReducer,
  customerUpdateProfile: customerUpdateProfileReducer,
  restaurantList: RestaurantListReducer,
  restaurantDetails: RestauranthDetailsReducer,
  restaurantDishList: RestaurantDishListReducer,
  ordercreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrderList: myOrderListReducer,
  orderStatus: orderStatusUpdateReducer,
  addFavorite: addFavoriteReducer,
  favRestaurantList: FavRestaurantListReducer,
  dishUpdate: DishUpdateReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const customerSignInfoFromStorage = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  customerSignin: { customerSigninInfo: customerSignInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
};
const middleware = [thunk];

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  storeEnhancers(applyMiddleware(...middleware)),
);
export default store;
