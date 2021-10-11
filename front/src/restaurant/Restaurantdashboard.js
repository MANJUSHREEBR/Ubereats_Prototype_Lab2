/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const Restaurantdashboard = () => {
  const { customer } = isAuthenticated();
  const adminLinks = () => (
    <div className="card">
      <h4 className="card-header">Admin links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/dishes">Add dishes</Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/rprofile/update">Update profile</Link>
        </li>
      </ul>
    </div>
  );
  const adminInfo = () => (
    <div className="card mb-5">
      <h3>Resturant Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{ customer[0].username }</li>
      </ul>
    </div>
  );

  return (
    <div className="container">

      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          {adminInfo()}
        </div>

      </div>
    </div>
  );
};
export default Restaurantdashboard;
