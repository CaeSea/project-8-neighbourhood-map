import React, { Component } from 'react';

class Search extends Component {

  render() {
    return (
      <div className="search-wrapper">
        <input type="search" placeholder="Search..."/>
        <button className="search-btn">Filter</button>
      </div>
    )
  }

}


export default Search;
