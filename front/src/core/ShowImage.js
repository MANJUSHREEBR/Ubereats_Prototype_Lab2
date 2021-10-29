/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Card } from 'react-bootstrap';
// import { API } from '../config';

const ShowImage = ({ item }) => (
  <div>
    <Card.Img
      src={item.photo}
      variant="top"
    />
  </div>
);

export default ShowImage;
