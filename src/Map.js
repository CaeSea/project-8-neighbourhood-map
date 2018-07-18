import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js'

function Map(props) {

  const { locations } = props;

  return (
    <div style={{ height: '100vh', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyB75r35CSSKNhFtuJnU-W0DV7X1hee6AIU' }}
        defaultCenter={{lat: 51.801881, lng: -4.971565}}
        defaultZoom={10}
      >
      {locations.map((location) => (
          <Marker
            key={ location.venue.id }
            classname={ location.venue.name }
            lat={ location.venue.location.lat}
            lng={ location.venue.location.lng }
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map;
