/* eslint-disable import/extensions */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-dom';
import {
  Container, Navbar, Nav, Card, NavDropdown, ToggleButton, ButtonGroup, Button,
} from 'react-bootstrap';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../js/actions/customerActions';
import { saveCartToDatabase, saveShippindAddress } from '../js/actions/cartActions';
import Search from './Search';
import logo from '../images/logo.png';

const Menu = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const text = location.search ? (location.search.split('=')[1]) : '';
  const customer = useSelector((state) => state.customerSignin);
  const [radioValue, setRadioValue] = useState('Pickup');
  const cart = useSelector((state) => state.cart);
  const {
    customerSigninInfo,
  } = customer;
  const logoutHandler = () => {
    localStorage.removeItem('restId');
    // localStorage.removeItem('shippingAddress');
    // dispatch(saveShippindAddress({
    //   address: '',
    //   city: '',
    //   postalCode: '',
    //   country: '',
    // }));
    if (cart.cartItems.length) {
      dispatch(saveCartToDatabase({ cart }));
    } else {
      dispatch(logout());
    }
    setRadioValue('Pickup');
    history.push('/search/Pickup');
  };
  const radios = [
    { name: 'Delivery' },
    { name: 'Pickup' },
  ];
  useEffect(() => {
    localStorage.setItem('shippingType', radioValue);
  }, [radioValue]);
  const handleOnchange = (e) => {
    setRadioValue(e.currentTarget.value);
    // localStorage.setItem('shippingType', e.currentTarget.value);
    if (!text) history.push(`/search/${e.currentTarget.value}`);
    else history.push(`/search/${e.currentTarget.value}?text=${text}`);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <i className="fal fa-angle-down" />
        <LinkContainer to={customerSigninInfo && customerSigninInfo.customer[0].role === 1 ? `/restaurant/${customerSigninInfo.customer[0].id}` : '/search/Pickup'}>
          <Navbar.Brand expand="lg">
            <Card.Img src={logo} variant="top" style={{ height: '80px' }} />
          </Navbar.Brand>
        </LinkContainer>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-secondary' : 'outline-secondary'}
              name="radio"
              value={radio.name}
              checked={radioValue === radio.name}
              onChange={handleOnchange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {(customerSigninInfo
        && (
        <Button variant="light" rounded>
          <i className="fas fa-map-marker-alt" />
          {' '}
          {customerSigninInfo && customerSigninInfo.customer[0].location}
        </Button>
        )
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {customerSigninInfo ? (
              <NavDropdown title={customerSigninInfo.customer[0].name} id="username">
                <LinkContainer to="/customerdashboard">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/customer/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                {customerSigninInfo && customerSigninInfo.customer[0].role === 0 && (
                <LinkContainer to="/favorites">
                  <NavDropdown.Item>favorites</NavDropdown.Item>
                </LinkContainer>
                )}
                {customerSigninInfo && customerSigninInfo.customer[0].role === 1 && (
                <LinkContainer to="/create/dishes">
                  <NavDropdown.Item>Add dishes</NavDropdown.Item>
                </LinkContainer>
                )}
                <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
              </NavDropdown>

            ) : (

              <LinkContainer to="/customersignin">
                <Nav.Link>
                  <i className="fas fa-user" />
                  Signin
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Route render={() => <Search history={history} location={location} />} />
          {(customerSigninInfo && customerSigninInfo.customer[0].role === 0) && (
          <LinkContainer to="/cart" variant="dark">
            <Nav.Link>
              <Button variant="dark">
                <i className="fas fa-shopping-cart" style={{ color: 'white' }} />
                {'    '}
                <span style={{ color: 'white' }}>{ cart && cart.cartItems.length}</span>
              </Button>
            </Nav.Link>
          </LinkContainer>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
