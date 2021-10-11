/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* `${API}/dishes/photo/${dish.id}` */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
// import { API } from '../config';
import ShowImage from './ShowImage';

const CardComponent = ({ dish, url }) => (
  <Card className="my-3 p-3 rounded">
    {(!url) && (
    <Link to={`/dishes/${dish.id}`}>
      <ShowImage item={dish} url="dishes" style={{ height: '80px', width: '100%' }} />
    </Link>
    )}
    {
    (url)
     && (
     <Link to={`/restaurant/${dish.id}`}>
       <ShowImage item={dish} url={url} style={{ height: '80px', width: '100%' }} />
     </Link>
     )
}

    <Card.Body style={{ fontFamily: 'initial' }}>
      <Card.Title as="div">

        <strong>
          {' '}
          {dish.name}
          {' '}
        </strong>
        {' '}

      </Card.Title>
      <Card.Text as="div">
        {dish.description}
      </Card.Text>
      {(url) && (
      <Card.Text as="div">
        <i className="fas fa-map-marker-alt" />
        {' '}
        {dish.location}
      </Card.Text>
      )}
      {!(url) && (
      <Card.Text as="div">
        {dish.price}
        $
      </Card.Text>
      )}

    </Card.Body>
  </Card>
);

export default CardComponent;
