import React, { Component } from 'react';

export default class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    $.getJSON("/gimme/members", function(data) {
      var items = [];
      $.each(data, function( key, val ) {
        items.push(val);
      });
      this.setState({data: items});
    }.bind(this));
  }
  render() {
    return <div>
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>@Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {
              this.state.data.map(function(datum) {
                return <tr key={datum.member_id}>
                    <td>{datum.member_id}</td>
                    <td>{datum.member_name}</td>
                    <td>{datum.member_descript}</td>
                    <td><a href="#">Edit</a></td>
                  </tr>
              })
            }
        </tbody>
      </table>
    </div>
  }
}
