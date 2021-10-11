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
import { listFavRestaurants } from '../js/actions/favoriteActions';
import Checkbox from '../core/Checkbox';

const Favorites = ({ match }) => {
  const dispatch = useDispatch();
  const restaurantList = useSelector((state) => state.favRestaurantList);
  let { loadingFromState, FavRestaurants: restaurants, errorFromState } = restaurantList;

  useEffect(() => {
    dispatch(listFavRestaurants());
  }, [dispatch]);
  return (
    <div className="container">
      <Row>
        <h3 style={{ textAlign: 'center' }}>
          Favorites
          <i className="fa fa-heart" style={{ color: 'red', position: 'relative' }} />
        </h3>

        <hr />
        <div className="alert alert-danger" style={{ display: errorFromState ? 'block' : 'none' }}>
          {errorFromState}
        </div>
        {restaurants && restaurants.map((restaurant, i) => (
          <Col sm={8} md={4} lg={3} key={i}><CardComponent key={i} dish={restaurant} url="restaurant" /></Col>))}
      </Row>
    </div>
  );
};

export default Favorites;
