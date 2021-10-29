/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image, Form, Button, Card, Modal,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../js/actions/cartActions';
import RestaurantPrivateRoute from '../auth/RestaurantPrivateRoute';
import { API } from '../config';

const Cart = ({ match, location, history }) => {
  const [show, setShow] = useState(true);
  const dishId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  // const newitems = location.search ? (location.search.split('&')[0]).split('?')[1] : 'false';
  const dispatch = useDispatch();
  useEffect(() => {
    if (dishId) {
      dispatch(addToCart(dishId, qty));
    }
  }, [dispatch, qty, dishId]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleClose = () => {
    history.goBack();
  };
  const checkOutHandler = () => {
    if (localStorage.getItem('shippingType') === 'Delivery') {
      history.push('/shipping');
    } else {
      history.push('/checkout');
    }
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    if (cartItems.length === 0) {
      localStorage.removeItem('restId');
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              {cartItems && cartItems.length === 0 ? (
                <div className="alert alert-danger">

                  Your cart is empty
                  {' '}
                  <Link to="/">Go Back</Link>
                </div>
              ) : (
                <div>
                  {cartItems && cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={3}>
                          <Image src={`${item.photo}`} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={2}>
                          <Link to={`/dishes/${item.dish}`}>
                            {' '}
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          $
                          {item.price}
                        </Col>
                        <Col md={2}>
                          <input style={{ width: '35px' }} className="mb-3" type="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.dish, Number(e.target.value)))} />
                        </Col>
                        <Col md={3}>
                          <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.dish)}>
                            <i className="fas fa-trash" />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </div>
              )}
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <p>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    ) items
                  </p>
                  $
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-success"
                    disbaled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item> */}

              </ListGroup>

            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-dark btn-block" disabled={cartItems.length === 0} variant="primary" onClick={checkOutHandler}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default Cart;
