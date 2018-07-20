import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListView extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {

    const { locations, toggleInfoOpen } = this.props;
    const { query } = this.state;
    const { updateQuery } = this;

    let showingSites;
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingSites = locations.filter((location) => match.test(location.venue.name))
    } else {
      showingSites = locations;
    }

    showingSites.sort(sortBy('venue.name'))

    return (
      <div className="listview-content">
        <h1>Camping Sites in West Wales</h1>
        <div className="search-wrapper">
          <input type="search" placeholder="Search..." value={query} onChange={(event) => updateQuery(event.target.value) }/>
        </div>
        <ul className="list-locations">
          {showingSites.map((location, i) => (
            <li key={location.venue.id}>
              <button className="listview-location-name" onClick={() => toggleInfoOpen(location.venue.id)}>
                {location.venue.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}/*
<ol className="books-grid">
        {booksOnShelf.map((book) => (
          <li key={book.id}>
            <BookListing
              book = {book}
              changeBookShelf = {changeBookShelf}
            />
          </li>
        ))}
      </ol>*/
export default ListView;
