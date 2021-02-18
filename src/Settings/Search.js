// jshint ignore: start

import React from 'react';
import _ from 'underscore';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.delayedCallback = _.debounce(function(event) {
      const value = event.target.value;
      this.props.onChange({search: value});
    }, 500);
  }

  onChange = (event) => {
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    return (
      <div className="search">
        <h2>Search</h2>
        <input onChange={this.onChange} type="search" />
      </div>
    );
  }
};

export default Search;