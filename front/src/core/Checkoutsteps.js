/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3 }) => (
  <div>
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/customersignin">
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Sign in</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Shipping</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/checkout">
            <Nav.Link>Checkout</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Checkout</Nav.Link>}
      </Nav.Item>

    </Nav>

  </div>
);
export default CheckoutSteps;
