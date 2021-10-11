/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Container, Row, Col, Jumbotron, Button,
} from 'react-bootstrap';
import logo from '../images/uberlogo.jpeg';

const Footer = () => (

  <footer>
    <Jumbotron style={{ backgroundColor: 'black', color: 'white' }}>
      <p>
        <p style={{ textAlign: 'center' }}>
          copyright @ Uber Eats
        </p>
        <img
          src={logo}
          variant="top"
          style={{ height: '100px' }}
        />
      </p>

      <hr />
    </Jumbotron>
  </footer>

);

export default Footer;
