/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable import/named */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Image, ListGroup, Card, Button, Form, Modal,
} from 'react-bootstrap';
import { getDishDetails } from '../js/actions/dishActions';
import { API } from '../config';

const DishComponent = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const dishDetails = useSelector((state) => state.dishDetails);
  const { loadingFromState, dish, errorFromState } = dishDetails;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  useEffect(() => {
    dispatch(getDishDetails(parseInt(match.params.id)));
  }, [dispatch, match]);

  const addToCart = () => {
    if (!localStorage.getItem('restId')) {
      localStorage.setItem('restId', dish.restaurant_id);
      history.push(`/cart/${parseInt(match.params.id)}?false&qty=${qty}`);
    } else if (localStorage.getItem('restId') == dish.restaurant_id) {
      history.push(`/cart/${parseInt(match.params.id)}?false&qty=${qty}`);
    } else {
      handleShow();
    }
  };
  const decrement = () => {
    setQty(qty - 1);
  };
  const increment = () => {
    setQty(qty + 1);
  };
  const goback = () => {
    history.goBack();
  };
  const editDishes = () => {
    localStorage.setItem('EditDish', JSON.stringify(dish));
    history.push('/edit/dishes');
  };
  const updateCart = () => {
    localStorage.setItem('restId', dish.restaurant_id);
    history.push(`/cart/${parseInt(match.params.id)}?true&qty=${qty}`);
  };
  return (
    <>
      <Button className="btn btn-dark my-3" onClick={goback}> Go Back</Button>
      <Row>
        <Col md={6}>
          <Image src={`${API}/dishes/photo/${match.params.id}`} alt={dish.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{dish.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Discription:
              {' '}
              {dish.description}
              <hr />
              Main Ingredients:
              {' '}
              { dish.mainingredient}
              <hr />
              Dish Type:
              {' '}
              {dish.dishtype}
              <hr />
              Price: $
              {dish.price}
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  Price:
                </Col>
                <Col>
                  <strong>
                    $
                    {dish.price}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col data-testid="quantity">
                  <Button className="btn-block bg-dark mr-2" disabled={qty <= 1} type="button" onClick={decrement}>
                    -
                  </Button>
                  {qty}
                  <Button id="incrementQty" className="btn-block bg-dark" type="button" onClick={increment}>
                    +
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Total:</strong>
                  {' '}
                </Col>
                <Col>
                  <strong>{dish.price * qty}</strong>
                </Col>
              </Row>

            </ListGroup.Item>
            {(customerSigninInfo && customerSigninInfo.customer[0].role === 0) && (
            <ListGroup.Item>
              <Button className="btn-block bg-dark" type="button" onClick={addToCart}>
                Add To cart
              </Button>
            </ListGroup.Item>
            ) }
            {customerSigninInfo && customerSigninInfo.customer[0].role === 1 && (
            <ListGroup.Item>
              <Button className="btn-block bg-dark" type="button" onClick={editDishes}>
                Edit dish
              </Button>
            </ListGroup.Item>
            ) }

          </ListGroup>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Create a new Order? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your cart contains order from another restaurant, please make a new order for this restaurant!
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-block" variant="dark" onClick={updateCart}>
            New Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DishComponent;
