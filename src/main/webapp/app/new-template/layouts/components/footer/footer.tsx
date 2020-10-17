import React from 'react';
import { ShoppingCart } from 'react-feather';

import templateConfig from '../../../templateConfig';

const Footer = props => (
  <footer>
    <div className="container-fluid">
      <p className="text-center">
        © {new Date().getFullYear() + ' '}
        IBAM Crafted by <i className="ft-heart font-small-3" />
        <a href="https://tyba-soft.com/" rel="noopener noreferrer" target="_blank">
          {' '}
          TYBASOFT
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
