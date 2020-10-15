import React, { Component } from 'react';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Search, X } from 'react-feather';
import { debounce } from 'lodash';
import useDebounce from 'app/new-template/utility/context/useDebounce';

const NavbarSearch = props => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const debouncedValue = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    if (debouncedValue !== '') props.search(debouncedValue);
    else props.clear();
  }, [debouncedValue]);

  const handleSearch = () => {
    if (searchTerm !== '') props.search(searchTerm);
  };

  const handleCancel = () => {
    setSearchTerm('');
    props.clear();
  };

  return (
    <div className="position-relative has-icon-right">
      <Input
        id="search-term"
        type="text"
        className="form-control round"
        placeholder="Try quick search"
        onChange={event => setSearchTerm(event.target.value)}
        value={searchTerm}
      />
      <div className="form-control-position">
        <Search onClick={() => handleSearch()} size={16} style={{ cursor: 'pointer' }} className="mb-0 mr-2" />
        <X onClick={() => handleCancel()} size={16} style={{ cursor: 'pointer' }} className="mb-0" />
      </div>
      {/* <div className="form-control-position"></div> */}
    </div>
  );
};

export default NavbarSearch;
