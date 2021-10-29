/* eslint-disable import/prefer-default-export */
import { API } from '../config';

export const createDishes = (userId, token, dish) => fetch(`${API}/dishes/create/${userId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `${token}`,
  },
  body: dish,

})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });
