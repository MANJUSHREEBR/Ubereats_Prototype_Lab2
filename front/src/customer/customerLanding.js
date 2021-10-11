/* eslint-disable react/button-has-type */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, ButtonGroup,
  ToggleButton, Button,
} from 'react-bootstrap';
// import { getDishes } from './Apicore';
import CardComponent from '../core/CardComponent';
import { listRestaurants } from '../js/actions/restaurantAction';
import Checkbox from '../core/Checkbox';

const Home = ({ location, match }) => {
  const [filter, setfilter] = useState([]);
  let { keyword } = match.params;
  const text = location.search ? (location.search.split('=')[1]) : '';
  const dispatch = useDispatch();
  const restaurantList = useSelector((state) => state.restaurantList);
  let { loadingFromState, restaurants, errorFromState } = restaurantList;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  let customerLocation;
  if (customerSigninInfo && customerSigninInfo.customer[0].location) {
    customerLocation = customerSigninInfo.customer[0].location;
  }
  if (text !== undefined) {
    if (restaurants) {
      restaurants = restaurants.filter(
        (row) => row.name.toLowerCase().indexOf(text.toLowerCase()) > -1
    || row.location.toLowerCase().indexOf(text.toLowerCase()) > -1
    || row.deliverymode.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
    }
  }
  if (filter.length) {
    restaurants = restaurants.filter(
      (row) => filter.includes(row.category.toLowerCase())
      || row.category.toLowerCase().indexOf('all') > -1,
    );
  }
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  if (cartItems.length) {
    localStorage.setItem('restId', cartItems[0].restaurant_id);
  } else {
    localStorage.removeItem('restId');
  }
  useEffect(() => {
    dispatch(listRestaurants(keyword, customerLocation));
  }, [dispatch, keyword, text, filter]);

  const radios = [
    { name: 'veg', value: '1' },
    { name: 'nonveg', value: '2' },
    { name: 'vegan', value: '3' },
  ];
  const [radValue, setRadValue] = useState('1');

  const handleFilters = (filters) => {
    setfilter(filters);
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col md={2} style={{ padding: '60px' }}>
          <h4>
            All stores
            {' '}
            {' '}
            <i className="fas fa-chevron-down" />
          </h4>
          <ul>
            <Checkbox categories={radios} handleFilters={(filters) => handleFilters(filters)} />
          </ul>

        </Col>
        <Col md={9}>
          <Row>
            {restaurants && restaurants.map((restaurant, i) => (
              <Col sm={10} md={5} lg={2} key={i}>
                <button
                  className="likeBtn"
                  style={{
                    color: 'red', position: 'absolute', zIndex: '1', top: '30px', right: '24px', border: 'none', background: 'initial',
                  }}
                >
                  <i className="fa fa-heart" style={{ color: 'red', position: 'relative', zIndex: '1' }} />
                </button>
                <CardComponent key={i} dish={restaurant} url="restaurant" />
              </Col>
            ))}
            {/* {restaurants && restaurants.length === 0 && (
            <Col md={8}>
              <img src="https://www.ubereats.com/_static/fca2c1eff67cb98be2dcf69dacf95347.svg" />
              <h2>We didn't find matching</h2>
              <p>Try searching for somewher else instead</p>
              <Button variant="dark">Search All Restaurants</Button>
            </Col>
            )} */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
