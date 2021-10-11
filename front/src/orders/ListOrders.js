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
  const [selectVlaue] = useState();
  const dispatch = useDispatch();
  const myOrderList = useSelector((state) => state.myOrderList);
  let { loading, orders, error } = myOrderList;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  useEffect(() => {
    dispatch(getMyOrderList());
  }, [dispatch]);
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? 'block' : 'none' }}>
      {error}
    </div>
  );
  const radios = [
    { name: 'order received', value: '1' },
    { name: 'delivered', value: '2' },
    { name: 'processing', value: '3' },
  ];
  const handleFilters = (filters) => {
    setfilter(filters);
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
                {customerSigninInfo && customerSigninInfo.customer[0].role === 0
                && (<th>Restaurant Profile</th>)}
                {customerSigninInfo && customerSigninInfo.customer[0].role === 1
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
                  {customerSigninInfo && customerSigninInfo.customer[0].role === 0
                && (
                <td>
                  <p>
                    Name:
                    {order.name}
                  </p>
                  <p>
                    Email:
                    {order.email}
                  </p>
                  <p>
                    Location:
                    {order.location}
                  </p>
                </td>
                )}
                  {customerSigninInfo && customerSigninInfo.customer[0].role === 1
                && (
                <td>
                  <p>
                    Name :
                    {order.name}
                  </p>
                  <p>
                    Email :
                    {order.email}
                  </p>
                  {/* <p>
                    Shipping Address :
                    {order.address}
                  </p> */}
                  {order.phone && (
                  <p>
                    Phone:
                    {order.phone}
                  </p>
                  )}
                </td>
                )}
                  <td>{order.orderdate.substring(0, 10)}</td>
                  <td>

                    <span>{ order.status }</span>

                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order.orderid}`}>
                      <Button variant="dark" className="btn-md">
                        View Receipt
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

      </Row>

    </>
  );
};

export default OrdeListOrders;
