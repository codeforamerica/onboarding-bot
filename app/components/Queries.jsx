import React, { Component } from 'react';

export default class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    $.getJSON("/gimme/" + this.props.item, function(data) {
      var items = [];
      $.each(data, function( key, val ) {
        items.push(val);
      });
      this.setState({data: items});
    }.bind(this));
  }
  render() {
    var data_keys;
    return <div>
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            { this.props.keys.map(function(key) {
                return <th>{key}</th>
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
            {
              this.state.data.map(function(datum) {
                return <tr>
                    { Object.keys(datum).map(function(key) {
                      return <td>{datum[key]}</td>
                    }) }
                    <td><a href="#">Edit</a></td>
                  </tr>
              })
            }
        </tbody>
      </table>
    </div>
  }
}
