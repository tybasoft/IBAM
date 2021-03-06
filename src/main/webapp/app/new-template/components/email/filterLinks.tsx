import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FilterLinks = ({ active, children, onClick }) => (
  <Link
    to="/email"
    className={'list-group-item list-group-item-action no-border text-left ' + (active ? 'active' : '')}
    onClick={onClick}
    // disabled={active}
  >
    {children}
  </Link>
);

export default FilterLinks;
