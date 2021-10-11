/* eslint-disable max-len */
/* eslint-disable no-global-assign */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch, useSelector, Provider } from 'react-redux';
import RestaurantComponent from './RestaurantComponent';
import store from '../js/store';
import { API } from '../config';

it('Testing whether it has particular element ', () => {
  const history = {};
  const match = { params: ' ' };
  render(<Provider store={store}><RestaurantComponent history={history} match={match} /></Provider>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
