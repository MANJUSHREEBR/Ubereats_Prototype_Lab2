/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Image, ListGroup, Card, Button, Form, Modal, Jumbotron, Container,
} from 'react-bootstrap';
import { getRestaurantDetails, RestaurantlistDishes } from '../js/actions/restaurantAction';
import { saveFavoriteToDatabase } from '../js/actions/favoriteActions';
import CardComponent from '../core/CardComponent';
import { API } from '../config';

const RestaurantComponent = ({ history, match }) => {
  const dispatch = useDispatch();
  const [isClick, setClick] = useState(false);
  const [favDisabled, setfavDisabled] = useState(false);
  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { loadingFromState, restaurant, errorFromState } = restaurantDetails;
  const restaurantDishList = useSelector((state) => state.restaurantDishList);
  const { restdishes } = restaurantDishList;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  useEffect(() => {
    dispatch(getRestaurantDetails(parseInt(match.params.id)));
    dispatch(RestaurantlistDishes(match.params.id));
  }, [dispatch, match]);
  const favoriteHandler = (e) => {
    setfavDisabled(true);
    dispatch(saveFavoriteToDatabase(match.params.id));
  };
  return (
    <>
      {/* <Link className="btn btn-success my-3" to="/"> Go Back</Link> */}
      <Row>
        <Col md={12}>
          {customerSigninInfo && customerSigninInfo.customer[0].role === 0 && (
          // <Button variant="success" onClick={favoriteHandler} disabled={favDisabled} className="btn-md">Add as your Favorite Restaurant</Button>
          <button className="likeBtn" onClick={favoriteHandler} disabled={favDisabled} style={{ color: 'red', position: 'absolute' }}>
            <i className="fa fa-heart" style={{ color: 'red', position: 'relative' }} />
          </button>
          )}
          <Jumbotron style={{ backgroundImage: `url(${API}/restaurant/photo/${match.params.id})`, backgroundSize: 'cover' }}>
            <h1 style={{ color: 'white' }}>
              {' '}
              {restaurant.name}
            </h1>
            <p style={{ color: 'white' }}>
              $0.49 Delivery Fee
              •
              Delivered in 55 to 65 min
              55–65 Min
              •
              4.5
              (200+)
            </p>
            <p>
              <Button variant="light">
                Order now
              </Button>
            </p>
          </Jumbotron>
          <br />
          {/* <Image
            src={`${API}/restaurant/photo/${match.params.id}`}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/100.png/09f/fff'; }}
            fluid
            style={{ width: '100%', height: '300px' }}
          /> */}
        </Col>
        <div style={{ fontFamily: 'cursive' }}>
          {' '}
          {restaurant.name}
        </div>
        <div style={{ fontFamily: 'cursive' }}>
          {' '}
          {restaurant.about}
        </div>
        <div style={{ fontFamily: 'cursive' }}>
          {' '}
          <i className="fas fa-map-marker-alt" />
          {' '}
          {restaurant.location}
          {' '}
        </div>
        <div style={{ fontFamily: 'cursive' }}>
          <i className="far fa-clock" />
          {' '}
          {restaurant.starttime ? (
            <>
              {restaurant.starttime}
              {' '}
              -
              {restaurant.endtime}
            </>
          )
            : (
              <>
                No timing information available
              </>
            )}
        </div>
      </Row>
      <hr />
      <Row>
        <strong>Menu</strong>
      </Row>
      <Row>
        {restdishes && restdishes.map((dish, i) => (
          <Col sm={12} md={4} lg={2} key={i}><CardComponent key={i} dish={dish} /></Col>))}
      </Row>
    </>
  );
};

export default RestaurantComponent;
