import React from 'react';
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js'

function Map(props) {
  
  const { locations, toggleInfoOpen, locationId } = props;

  return (
    <div className="map-content"> {/*Error handling for if the map does not render as expected is handled by the google-map-react package*/}
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

Map.propTypes = {
  locations: PropTypes.array.isRequired,
  toggleInfoOpen: PropTypes.func.isRequired,
  locationId: PropTypes.string.isRequired
}


export default Map;
