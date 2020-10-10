import React, { Component } from 'react';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Search, X } from 'react-feather';
import { debounce } from 'lodash';
class NavbarSearch extends Component<any, any> {
  state = {
    list: [
      {
        url: '/',
        name: 'eCommerce'
      },
      {
        url: '/analytics-dashboard',
        name: 'Analytics'
      },
      {
        url: '/sales-dashboard',
        name: 'Sales'
      },
      {
        url: '/email',
        name: 'Email'
      },
      {
        url: '/chat',
        name: 'Chat'
      },
      {
        url: '/contacts',
        name: 'Contacts'
      },
      {
        url: '/todo',
        name: 'Todo'
      },
      {
        url: '/calendar',
        name: 'Calendar'
      },
      {
        url: '/cards/advanced-card',
        name: 'Advanced card'
      },
      {
        url: '/cards/statistic-card',
        name: 'Statistic card'
      }
    ],
    searchTerm: '',
    filtered: []
  };
  escFunction = e => {
    if (e.keyCode === 27) {
      this.setState({
        searchTerm: '',
        filtered: []
      });
    }
  };

  handleClick = e => {
    if (this.state.searchTerm) {
      if (this.node.contains(e.target)) {
        setTimeout(
          function() {
            this.setState({
              searchTerm: '',
              filtered: ''
            });
          }.bind(this),
          100
        );

        return;
      } else {
        this.setState({
          searchTerm: '',
          filtered: []
        });
      }
    }
  };

  handleSearch = () => {
    let searchTerm = this.state.searchTerm;
    if (searchTerm !== '') this.props.search(searchTerm);
  };

  handleCancel = () => {
    this.setState({
      searchTerm: ''
    });
    this.props.clear();
  };
  handleChange = e => {
    // return debounce(e => this.props.search(e.target.value), 300);
    // else
    // Variable to hold the original version of the list
    // let currentList: any = [];

    // // Variable to hold the filtered list before putting into state
    // let newList = [];

    // // If the search bar isn't empty
    // if (e.target.value !== '') {
    //   // Assign the original list to currentList
    //   currentList = this.state.list;

    //   // Use .filter() to determine which items should be displayed
    //   // based on the search terms
    //   newList = currentList.filter(item => {
    //     // change current item to lowercase
    //     const lc = item.name.toLowerCase();
    //     // change search term to lowercase
    //     const filter = e.target.value.toLowerCase();
    //     return lc.includes(filter);
    //   });
    // } else {
    //   // If the search bar is empty, set newList to original task list
    //   newList = [];
    // }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      // filtered: newList,
      searchTerm: e.target.value
    });
  };
  node: any;

  componentWillMount() {
    // document.addEventListener('mousedown', this.handleClick, true);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  render() {
    let searchTerm = this.state.searchTerm;
    return (
      <div className="position-relative has-icon-right">
        <Input
          id="search-term"
          type="text"
          className="form-control round"
          placeholder="Try quick search"
          onChange={this.handleChange}
          value={searchTerm}
        />
        <div className="form-control-position">
          <Search onClick={() => this.handleSearch()} size={16} style={{ cursor: 'pointer' }} className="mb-0 mr-2" />
          <X onClick={() => this.handleCancel()} size={16} style={{ cursor: 'pointer' }} className="mb-0" />
        </div>
        {/* <div className="form-control-position"></div> */}
        {this.state.filtered ? (
          <div ref={node => (this.node = node)}>
            <ListGroup className="navbar-search">
              {this.state.filtered.map((search: any, i) => {
                return (
                  <ListGroupItem key={i} className="py-1">
                    {[
                      <Link to={`${search.url}`} className="nav-link p-0" key={i}>
                        {search.name}
                      </Link>
                    ]}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default NavbarSearch;
