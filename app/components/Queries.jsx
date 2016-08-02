import React, { Component } from 'react';
import _ from 'lodash';

export default class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      forms: []
    }
  }
  componentDidMount() {
    $.getJSON("/gimme/" + this.props.item, function(data) {
      let items = [];
      $.each(data, function( key, val ) {
        items.push(val);
      });
      this.setState({data: items});
    }.bind(this));
  }
  formOn(datum) {
    console.log("Hey, I'm supposed to turn the form field on");
    let newState = _.union([datum], this.state.forms);
    this.setState({ forms: newState });
  }
  formOff(datum) {
    console.log("Hey, I'm supposed to turn the form field off and post data");
    let newState = _.remove(this.state.forms, function(item) {
      return item == datum;
    });
    this.setState({ forms: newState });
  }
  render() {
    let endpoint = `take/${this.props.item}`;
    return <div>
      <form action={endpoint} method="POST">
        <table className="table table-responsive table-hover">
          <thead>
            <tr>
              {
                this.props.keys.map(function(key) {
                  return <th>
                      { key.split("_").map( (word) => word.substring(0,1).toUpperCase() + word.substring(1, word.length) ).join(" ") }
                    </th>
                })
              }
              <th></th>
            </tr>
          </thead>
          <tbody>
              {
                this.state.data.map(function(datum) {
                  if (this.state.forms.indexOf(datum) > -1) {
                    return <tr>
                          {
                            Object.keys(datum).map(function(key) {
                              return <td>
                              {
                                key.includes('_id') ? [datum[key], <input type="hidden" name={key} value={ datum[key] } />] : <input type="text" name={key} placeholder={ datum[key] } />
                              }
                              </td>
                            })
                          }
                          <td>
                            <a onClick={() => this.formOff(datum) } href="#">
                              <input type="submit" value="Update" />
                            </a>
                          </td>
                      </tr>
                  }
                  return <tr>
                      {
                        Object.keys(datum).map(function(key) {
                          return <td>{datum[key]}</td>
                        })
                      }
                      <td>
                        <a onClick={() => this.formOn(datum) } href="#">
                          Edit
                        </a>
                      </td>
                    </tr>
                }.bind(this))
              }
          </tbody>
        </table>
      </form>
    </div>
  }
}
