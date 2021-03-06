/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, ListGroup, Image, Card, Modal,
} from 'react-bootstrap';
import { saveShippindAddress } from '../js/actions/cartActions';
import { API } from '../config';
import { getOrderDetails, updateOrderStatus } from '../js/actions/orderAction';

const Orders = ({ match, history }) => {
  const [show, setShow] = useState(true);
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderItems, loading, error } = orderDetails;
  // console.log(orderItems);
  // const { cart, address } = orderItems;
  const cart = orderItems.orderItems;
  const shippingAdd = orderItems.shippingAddress;
  // const shippingAdd = JSON.parse(address);
  // let shippingAdd = '';
  // if (address) {
  //   shippingAdd = JSON.parse(address.replace(/'/g, '"'));
  // }
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  const [selectorVal, setSelectorVal] = useState('');
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  if (cart) {
    cart.itemsPrice = addDecimals(cart.reduce((acc, item) => acc + item.orderedprice
  * item.quantity, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 35);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)
   + Number(cart.taxPrice)).toFixed(2);
  }
  const handleClose = () => {
    history.goBack();
  };
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    setSelectorVal(orderItems.status);
  }, [dispatch, orderItems]);

  const statusUpdateHandler = (e) => {
    setSelectorVal(e.target.value);
    dispatch(updateOrderStatus({ status: e.target.value }, orderId));
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} style={{ width: '100%' }}>
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                {/* {shippingAdd && shippingAdd.address && (
                <ListGroup.Item>
                  <p>
                    <strong>Address: </strong>
                    {' '}
                    {shippingAdd && shippingAdd.address}
                    ,
                    {' '}

                    {shippingAdd.city}
                    ,
                    {' '}
                    {shippingAdd.postalCode}
                    ,
                    {' '}
                    {shippingAdd.country}
                    ,
                    {' '}
                  </p>
                </ListGroup.Item>
                )} */}
                <ListGroup.Item>
                  <p>
                    Order:
                    {orderItems.orderid}
                  </p>
                  <ListGroup.Item>
                    <p> Instruction: </p>
                    { orderItems.instruction }
                  </ListGroup.Item>
                  {customerSigninInfo.customer.role === 0 && (
                  <ListGroup.Item>
                    <p> Status: </p>
                    { orderItems.status }
                  </ListGroup.Item>
                  )}
                  {customerSigninInfo.customer.deliverymode && (customerSigninInfo.customer.deliverymode.toLowerCase() === 'Delivery'.toLowerCase()
                  || customerSigninInfo.customer.deliverymode.toLowerCase() === 'Delivery & Pickup'.toLowerCase()) && (
                  <ListGroup.Item>
                    <label className="text-muted">Change Status here</label>
                    <select onChange={statusUpdateHandler} className="form-control" value={selectorVal} disabled={selectorVal == 'cancelled'}>
                      <option>Select</option>
                      <option value="Order Received">Order Received</option>
                      <option value="Processing">Processing</option>
                      <option value="On the way">On the way</option>
                      <option value="Delivered">Delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </ListGroup.Item>
                  )}
                  {customerSigninInfo.customer.deliverymode && customerSigninInfo.customer.deliverymode.toLowerCase() === 'Pickup'.toLowerCase() && (
                  <ListGroup.Item>
                    <label className="text-muted">Change Status here</label>
                    <select onChange={statusUpdateHandler} className="form-control" value={selectorVal} disabled={selectorVal == 'cancelled'}>
                      <option>Select</option>
                      <option value="Order Received">Order Received</option>
                      <option value="Processing">Processing</option>
                      <option value="Pick up Ready">Pick up Ready</option>
                      <option value="Picked up">Picked up</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </ListGroup.Item>
                  )}
                  {cart && cart.length === 0 ? (
                    <div className="alert alert-danger">

                      Your cart is empty
                      {' '}
                      <Link to="/">Go Back</Link>
                    </div>
                  ) : (

                    <ListGroup.Item variant="flush">
                      {cart && cart.map((item, index) => (
                        <ListGroup.Item>
                          <Row>
                            <Col md={2}>
                              <Image src={item.photo} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/dishes/${item.id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty}
                              {' '}
                              x
                              {' '}
                              {item.price}
                              {' '}
                              =
                              {' '}
                              $
                              {item.qty * item.price}
                            </Col>

                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Order Summary</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Items:
                      </Col>
                      <Col>
                        $
                        {orderItems && orderItems.itemsPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Shipping:
                      </Col>
                      <Col>
                        $
                        {orderItems && orderItems.shippingPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Tax:
                      </Col>
                      <Col>
                        $
                        {orderItems && orderItems.taxPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Total:
                      </Col>
                      <Col>
                        $
                        {orderItems && orderItems.totalPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                      {error}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-dark btn-block" variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
