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
import Checkbox from './Checkbox';
import store from '../js/store';

it('Should render the prop values same as passed', () => {
  const radios = [
    { name: 'veg', value: '1' },
    { name: 'nonveg', value: '2' },
    { name: 'vegan', value: '3' },
  ];
  const handleFilters = () => {

  };
  render(<Provider store={store}><Checkbox categories={radios} handleFilters={handleFilters} /></Provider>);
  const labelElement = screen.getByText('veg');
  const totallabelElement = screen.getAllByRole('checkbox');
  expect(totallabelElement.length).toBe(3);
  expect(labelElement).toBeInTheDocument();
});
