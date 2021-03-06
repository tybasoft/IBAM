import React from 'react';
// To create random data
import { makeData } from '../utils';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class Example extends React.Component<any, any> {
  constructor() {
    super(null);
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
          columns={[
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
                  accessor: (d: any) => d.lastName
                }
              ]
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age'
                }
              ]
            }
          ]}
          defaultPageSize={20}
          style={{
            height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
