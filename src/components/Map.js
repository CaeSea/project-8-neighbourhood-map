import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js'

class Map extends Component {

    render() {

      const { locations, toggleInfoOpen, locationId } = this.props;

      return (
        <div className="map-content">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB75r35CSSKNhFtuJnU-W0DV7X1hee6AIU' }}
            defaultCenter={{lat: 51.801881, lng: -4.971565}}
            defaultZoom={10}
          >
          {locations.map((location, i) => (
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
    )
  }
}

export default Map;
