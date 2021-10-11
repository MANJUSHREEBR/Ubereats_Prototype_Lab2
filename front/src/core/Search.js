/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ history, location }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const val = keyword;
      setKeyword('');
      history.push(`${location.pathname}?text=${val}`);
    } else {
      history.push('/search/Pickup');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <i className="fas fa-search" style={{ position: 'absolute', padding: '5px' }} />
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="   What are you craving?"
        className="mr-sm-2"
        style={{ width: '800px', backgroundColor: '#F6F6F6' }}
      />
    </Form>
  );
};

export default SearchBox;
