import React from 'react';
// To create random data
import { makeData } from '../utils';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName
      }
    ]
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Status',
        accessor: 'status'
      }
    ]
  },
  {
    Header: 'Stats',
    columns: [
      {
        Header: 'Visits',
        accessor: 'visits'
      }
    ]
  }
];

export default class Example extends React.Component<any, any> {
  constructor(p) {
    super(p);
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: '20px' }}>
                <em>You can put any component you want here, even another React Table!</em>
                <br />
                <br />
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={3}
                  showPagination={false}
                  SubComponent={row => {
                    return <div style={{ padding: '20px' }}>Another Sub Component!</div>;
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}
