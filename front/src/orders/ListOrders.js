/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, ListGroup, Image, Card, Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getMyOrderList, updateOrderStatus } from '../js/actions/orderAction';
import Checkbox from '../core/Checkbox';

const OrdeListOrders = ({ match }) => {
  const [filter, setfilter] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [selectVlaue] = useState();
  const dispatch = useDispatch();
  const myOrderList = useSelector((state) => state.myOrderList);
  let { loading, orders, error } = myOrderList;
  console.log(orders);
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  useEffect(() => {
    dispatch(getMyOrderList(page, size));
  }, [dispatch, page, size]);
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? 'block' : 'none' }}>
      {error}
    </div>
  );
  const radios = [
    { name: 'order received', value: '1' },
    { name: 'delivered', value: '2' },
    { name: 'processing', value: '3' },
    { name: 'cancelled', value: '3' },
  ];
  const handleFilters = (filters) => {
    setfilter(filters);
  };
  const updateSize = (e) => {
    setSize(e.target.value);
    // dispatch(updateOrderStatus({ status: e.target.value }, orderId));
  };
  const cancelOrder = (orderId) => {
    dispatch(updateOrderStatus({ status: 'cancelled' }, orderId));
    window.location.reload();
  };
  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    setPage(page - 1);
  };
  if (filter.length) {
    orders = orders.filter(
      (row) => filter.includes(row.status.toLowerCase()),
    );
  }
  return (
    <>
      <Row>
        <Col md={5} />
        <Col md={6}>
          {showError()}
          <ul>
            <Checkbox categories={radios} handleFilters={(filters) => handleFilters(filters)} />
          </ul>
        </Col>
      </Row>
      <Row>
        <h4>Orders</h4>
        <Col md={12}>
          <Table bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                {customerSigninInfo && customerSigninInfo.customer.role === 0
                && (<th>Restaurant Profile</th>)}
                {customerSigninInfo && customerSigninInfo.customer.role === 1
                && (<th>User Profile</th>)}
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order.orderid}>
                  <td>{order.orderid}</td>
                  {customerSigninInfo && customerSigninInfo.customer.role === 0
                && (
                <td>
                  <p>
                    Name:
                    {order.restaurant.name}
                  </p>
                  <p>
                    Email:
                    {order.restaurant.email}
                  </p>
                  <p>
                    Location:
                    {order.restaurant.location}
                  </p>
                </td>
                )}
                  {customerSigninInfo && customerSigninInfo.customer.role === 1
                && (
                <td>
                  <p>
                    Name :
                    {order.user.name}
                  </p>
                  <p>
                    Email :
                    {order.user.email}
                  </p>
                  {/* <p>
                    Shipping Address :
                    {order.address}
                  </p> */}
                  {order.user.phone && (
                  <p>
                    Phone:
                    {order.user.phone}
                  </p>
                  )}
                </td>
                )}
                  <td>{order.updatedAt.substring(0, 10)}</td>
                  <td>

                    <span>{ order.status }</span>

                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant="dark" className="btn-md">
                        View Receipt
                      </Button>
                    </LinkContainer>
                    {customerSigninInfo && customerSigninInfo.customer.role === 0 && (
                      <Button variant="dark" className="btn-md" disabled={order.status !== 'Order Received'} onClick={() => cancelOrder(order._id)}>
                        Cancel Order
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

      </Row>
      <Row>
        <Col md={3} />
        <Col md={2}>
          <ListGroup.Item>
            {/* <label className="text-muted">Select page size</label> */}
            <select onChange={updateSize} className="form-control" value={size}>
              <option>Select</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </ListGroup.Item>
        </Col>
        <Col md={1}>
          {/* <ListGroup.Item> */}
          <div style={{ border: '1px solid', padding: '9px' }}>
            <Button variant="dark" disabled={page <= 1} onClick={decrementPage}>
              {' '}
              {'<'}
              {' '}
            </Button>
            {' '}
            {page}
            {' '}
            <Button variant="dark" onClick={incrementPage}>
              {' '}
              { '>' }
              {' '}
            </Button>
          </div>
          {/* </ListGroup.Item> */}
        </Col>
      </Row>
    </>
  );
};

export default OrdeListOrders;
