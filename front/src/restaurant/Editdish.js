/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Modal, Button } from 'react-bootstrap';
import { isAuthenticated } from '../auth';
import { customerSignin } from '../js/actions/customerActions';
import { editDishes } from '../js/actions/dishActions';
import { API } from '../config';

const Adddishes = ({ history }) => {
  const disPatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.goBack();
  };
  const handleShow = () => setShow(true);
  const editDish = JSON.parse(localStorage.getItem('EditDish'));
  const [values, setValues] = useState({
    name: editDish.name || '',
    description: editDish.description || '',
    price: editDish.price || '',
    dishtype: editDish.dishtype || '',
    mainingredient: editDish.dishtype || '',
    id: editDish.id || '',
    category: editDish.category || '',
    photo: editDish.photo || '',
    loading: '',
    error: '',
    createdDish: '',
    reDirectToProfile: false,
    formData: '',

  });
  const {
    name,
    description,
    price,
    dishtype,
    loading,
    error,
    createdDish,
    reDirectToProfile,
    mainingredient,
    formData,
    id,
    category,
    photo,
  } = values;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;

  const handleChange = (Argname) => (event) => {
    const value = Argname === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(Argname, value);
    setValues({ ...values, [Argname]: value });
  };
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    disPatch(editDishes(customerSigninInfo.customer._id, editDish._id, customerSigninInfo.token, formData));
    handleShow();
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <p>Upload photo here</p>
      <div className="form-group">
        <label className="btn btn-dark">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" name="name" className="form-control" value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea onChange={handleChange('description')} name="description" type="text" className="form-control" value={description} />
      </div>
      <div className="form-group">
        <label className="text-muted">Main Ingedients</label>
        <textarea onChange={handleChange('mainingredient')} name="mainingredient" type="text" className="form-control" value={mainingredient} />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange('category')} className="form-control" value={category}>
          <option>Select</option>
          <option value="Veg">Veg</option>
          <option value="Nonveg">Nonveg</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input onChange={handleChange('price')} type="number" name="price" className="form-control" value={price} />
      </div>
      <div className="form-group">
        <label className="text-muted">Dishtype</label>
        <select onChange={handleChange('dishtype')} name="dishtype" className="form-control" value={dishtype}>
          <option>Select</option>
          <option value="Appetizer">Appetizer</option>
          <option value="MainCourse">MainCourse</option>
          <option value="Beverage">Beverage</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <button type="submit" className="btn btn-dark">Edit Dish</button>
    </form>

  );

  // const showError = () => (
  //   <div className="alert alert-danger" style={{ display: error ? 'block' : 'none' }}>
  //     {error}
  //   </div>
  // );
  // const showSuccess = () => (
  //   <div className="alert alert-info" style={{ display: createdDish ? 'block' : 'none' }}>
  //     <h5>{`${createdDish} is created`}</h5>
  //   </div>
  // );
  // const showLoading = () => (
  //   loading && (<div className="alert alert-success"><h2>Loading ... </h2></div>)
  // );

  return (
    <div className="row">
      <div className="col-md-3" />
      <div className="col-md-1">
        <Image
          src={photo}
          alt="Image not found"
          id="imageDiv1"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/100.png/09f/fff'; }}
          fluid
          roundedCircle
          style={{ height: '100px' }}
        />
      </div>
      <div className="col-md-4">
        {newPostForm()}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title />
        </Modal.Header>
        <Modal.Body>
          <div>
            Dish Updated successfully
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Adddishes;
