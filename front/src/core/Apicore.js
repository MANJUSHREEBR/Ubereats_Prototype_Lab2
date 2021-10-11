/* eslint-disable import/prefer-default-export */
import { API } from '../config';

export const getDishes = (sortBy) => fetch(`${API}/dishes?sortBy=${sortBy}&order=DESC&limit=100`, {
  method: 'GET',
})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });
