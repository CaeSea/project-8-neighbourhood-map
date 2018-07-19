import React, { Component } from 'react';


class ListView extends Component {

  render() {
    const { locations, toggleInfoOpen } = this.props;
    return (
      <div className="listview-content">
        <h1>Camping Sites in West Wales</h1>
        <ul className="list-locations">
          {locations.map((location, i) => (
            <li key={location.venue.id}>
              <button className="listview-location-name" onClick={() => toggleInfoOpen(i)}>
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
