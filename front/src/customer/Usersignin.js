/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
// import { signin, authenticate, isAuthenticated } from '../auth';
import { customerSignin } from '../js/actions/customerActions';
import logo from '../images/logo.png';

const Usersignin = ({ location, history }) => {
  const disPatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
    isCustomer: 'customer',
  });

  // const redirect = location.search ? location.search.split('=')[1] : '/search/delivery';

  const {
    email, password,
    isCustomer,
  } = values;
  const handleChange = (nameArg) => (event) => {
    setValues({ ...values, error: false, [nameArg]: event.target.value });
  };
  const customerInfo = useSelector((state) => state.customerSignin);
  const {
    loadingFromState, errorFromState, customerSigninInfo, successFromState,
  } = customerInfo;
  console.log(customerInfo);
  useEffect(() => {
    if (customerSigninInfo && customerSigninInfo.customer.role === 0) {
      history.push('search/Pickup');
    } else if ((customerSigninInfo && customerSigninInfo.customer.role === 1)) {
      history.push(`/restaurant/${customerSigninInfo.customer._id}`);
    }
  }, [history, customerSigninInfo]);

  const clickSubmit = (event) => {
    event.preventDefault();
    disPatch(customerSignin({ email, password }, isCustomer));
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
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
      </div>
      New User?
      {' '}
      <Link to="/customersignup">Please Signup here! </Link>
      <div />
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
  const showLoading = () => (
    loadingFromState && (<div className="alert alert-info"><h2>Loading...</h2></div>)
  );

  return (
    <div className="container col-md-8 offset-md-2">
      <img src={logo} alt="Uber Eats" style={{ height: '75px' }} />
      {showerror()}
      {showLoading()}
      {signUpForm()}
      {/* { successFromState && <Redirect to="/customerdashboard" />} */}
    </div>

  );
};

export default Usersignin;
