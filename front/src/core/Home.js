/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import { getDishes } from './Apicore';
import CardComponent from './CardComponent';
import { listDishes } from '../js/actions/dishActions';

const Home = () => {
  const dispatch = useDispatch();
  const dishList = useSelector((state) => state.dishList);
  const { loadingFromState, dishes, errorFromState } = dishList;
  useEffect(() => {
    dispatch(listDishes());
  }, [dispatch]);

  return (
    <div className="container">
      <Row>
        {dishes && dishes.map((dish, i) => (
          <Col sm={12} md={4} lg={3} key={i}><CardComponent key={i} dish={dish} /></Col>))}
      </Row>
    </div>
  );
};

export default Home;
