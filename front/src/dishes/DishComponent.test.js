/* eslint-disable no-global-assign */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch, useSelector, Provider } from 'react-redux';
import DishComponent from './DishComponent';
import store from '../js/store';
import { API } from '../config';

it('Testing Dish Component whether an element is present or not', () => {
  const history = {};
  const match = { params: ' ' };
  render(<Provider store={store}><DishComponent history={history} match={match} /></Provider>);
  const buttonElement = screen.getByText('+');
  expect(buttonElement).toBeInTheDocument();
});
it('Testing Proper image source value', () => {
  const history = {};
  const match = { params: { id: 4 } };
  const src = `${API}/dishes/photo/${match.params.id}`;
  render(<Provider store={store}><DishComponent history={history} match={match} /></Provider>);
  const imageElement = screen.getByRole('img');
  expect(imageElement.src === src);
});
it('Testing initial value', () => {
  const history = {};
  const match = { params: { id: 4 } };
  render(<Provider store={store}><DishComponent history={history} match={match} /></Provider>);
  const quantityElement = screen.getByTestId('quantity');
  expect(quantityElement).toBeInTheDocument();
});
