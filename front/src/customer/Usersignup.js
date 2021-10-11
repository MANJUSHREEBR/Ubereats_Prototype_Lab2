/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { customersignup } from '../js/actions/customerActions';
import locations from '../location';

import { signUp } from '../auth';
import './UserSign.css';
import logo from '../images/logo.png';

const Usersignup = () => {
  const disPatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    isCustomer: 'customer',
    location: '',

  });
  const {
    name, email, password, error, success, isCustomer, location,
  } = values;
  const { loadingFromState, errorFromState, successFromState } = useSelector((state) => state.cutomerSignup);

  const handleChange = (nameArg) => (event) => {
    setValues({ ...values, error: false, [nameArg]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    let user;
    if (isCustomer === 'customer') {
      user = {
        name, email, password,
      };
    } else {
      user = {
        name, email, password, location,
      };
    }
    disPatch(customersignup(user, isCustomer));
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <div className="switch switch-green">
          <input onChange={handleChange('isCustomer')} type="radio" className="switch-input radio-warning" name="userrole" value="customer" checked={isCustomer === 'customer'} />
          <label htmlFor="week2" className="switch-label switch-label-off" style={{ paddingLeft: '4px', paddingRight: '11px' }}>Customer</label>
          <input onChange={handleChange('isCustomer')} type="radio" className="switch-input" name="userrole" value="restaurant" checked={isCustomer === 'restaurant'} />
          <label htmlFor="month2" className="switch-label switch-label-on" style={{ paddingLeft: '4px', paddingRight: '11px' }}>Restaurant</label>
          <span className="switch-selection" />
        </div>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
      </div>
      {isCustomer === 'restaurant' && (
      <div className="form-group">
        <label className="text-muted">Location</label>
        {/* <input onChange={handleChange('location')} type="text" className="form-control" value={location} /> */}
        <select onChange={handleChange('location')} className="form-control">
          <option>Select</option>
          {/* <option value="San Jose">San Jose</option>
          <option value="Santa Clara">Santa Clara</option>
          <option value="Sunnyvale">Sunnyvale</option>
          <option value="Freemont">Freemont</option> */}
          {locations.map((loc) => (
            <option value={loc}>{loc}</option>
          ))}
        </select>

      </div>
      )}
      <button type="submit" className="btn btn-dark" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );
  const showerror = () => (
    <div className="alert alert-danger" style={{ display: errorFromState ? '' : 'none' }}>
      {errorFromState}
    </div>
  );
  const showsucess = () => (
    <div className="alert alert-info" style={{ display: successFromState ? '' : 'none' }}>
      signeup successfull!
      {' '}
      <Link to="/customersignin"> Signin here</Link>
    </div>
  );
  const showLoading = () => (
    loadingFromState && (<div className="alert alert-info"><h2>Loading...</h2></div>)
  );

  return (
    <div className="container col-md-8 offset-md-2">
      <img src={logo} alt="Uber Eats" style={{ height: '75px' }} />
      {showLoading()}
      {showerror()}
      {showsucess()}
      {signUpForm()}
    </div>

  );
};

export default Usersignup;
