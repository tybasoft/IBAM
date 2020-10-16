import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../redux/actions/email/emailActions';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjetTab = ({ active, children, onClick }) => (
  <Link
    to="/email"
    className={'list-group-item list-group-item-action no-border text-left ' + (active ? 'active' : '')}
    onClick={onClick}
    // disabled={active}
  >
    {children}
  </Link>
);

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.emailApp.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjetTab);
