import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Main extends Component {

  state = {
    query: '',
    open: false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  openNav = () => {
    const listView = document.querySelector(".listview");
    listView.classList.remove('closeMobMenu')
    listView.classList.add('openMobMenu');
  }

  closeNav = () => {
    const listView = document.querySelector(".listview");
    listView.classList.remove('openMobMenu')
    listView.classList.add('closeMobMenu');
  }

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') return;

    if(!this.state.open) {
      this.openNav();
      this.setState({
        open: true
      })
    } else {
      this.closeNav();
      this.setState({
        open: false
      })
    }
  }

  render() {

    const { locations, toggleInfoOpen, locationId } = this.props;
    const { query } = this.state;
    const { updateQuery, openNav, closeNav, handleKeyPress     } = this;

    let showingSites;
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingSites = locations.filter((location) => match.test(location.venue.name))
    } else {
      showingSites = locations;
    }

    showingSites.sort(sortBy('venue.name'))

    return (
      // All content here relies on this state to filter locations.
      <div className="main-wrapper">
        <section className="listview">
          <div className="listview-content">
            <span className="closebtn" onClick={closeNav} onKeyPress={handleKeyPress} tabIndex="2">&times;</span>
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
            <aside className="foursquare-attr">
              <img src="https://developer.foursquare.com/docs/images/attribution.svg" alt="FourSquare Logo"/>
            </aside>
          </div>
        </section>
        <section className="map-container">
          <div className="map-content"> {/*Error handling for if the map does not render as expected is handled by the google-map-react package*/}
            <span className="openbtn" onClick={openNav} onKeyPress={handleKeyPress} tabIndex = "1">MENU</span>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyB75r35CSSKNhFtuJnU-W0DV7X1hee6AIU' }}
              defaultCenter={{lat: 51.801881, lng: -4.971565}}
              defaultZoom={ 8 }
            >
            {showingSites.map((location, i) => (
                <Marker
                  key={ location.venue.id }
                  lat={ location.venue.location.lat}
                  lng={ location.venue.location.lng }
                  name={ location.venue.name }
                  img={ location.venue.photo }
                  address={ location.venue.location.formattedAddress.join(', ') }
                  toggleInfoOpen={toggleInfoOpen}
                  locationId={ locationId }
                  indexedLocation = { location.venue.id }
                  index = { i }
                />
              ))}
            </GoogleMapReact>
          </div>
        </section>
      </div>
    )
  }

  static propTypes = {
    locations: PropTypes.array.isRequired,
    toggleInfoOpen: PropTypes.func.isRequired,
    locationId: PropTypes.string.isRequired
  }

}

export default Main;
