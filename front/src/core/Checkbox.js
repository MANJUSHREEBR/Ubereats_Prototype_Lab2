/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const current = checked.indexOf(c); // return first index or -1
    const newChecked = [...checked];
    if (current === -1) {
      newChecked.push(c);
    } else {
      newChecked.splice(current, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };

  return categories.map((c, i) => (
    <li className="list-unstyled" style={{ padding: '8px' }}>
      <input onChange={handleToggle(c.name)} value={checked.indexOf(c.name === -1)} type="checkbox" className="form-check-input" key={i} />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};
export default Checkbox;
