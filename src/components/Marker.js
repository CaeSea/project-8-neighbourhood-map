import React from 'react';
import InfoWindow from './InfoWindow.js'
import PropTypes from 'prop-types'

function Marker(props) {

  const { toggleInfoOpen, handleKeyPressInfoWindow, locationId, name, indexedLocation, img, address, index, lat, lng } = props;
  let markerClass = locationId===indexedLocation ? "blueMarker" : "redMarker";
  let latLng = { lat: lat, lng: lng};

  return(
    <div className="marker-wrap" onClick={() => toggleInfoOpen(indexedLocation, latLng, index)}>
      <div className={"marker "+ markerClass} id={"marker"+index} tabIndex="0" onKeyPress={handleKeyPressInfoWindow.bind(this, indexedLocation, latLng)}></div>
      {locationId === indexedLocation &&
        <InfoWindow
          toggleInfoOpen={ toggleInfoOpen }
          name={ name }
          img= { img }
          address = { address }>
        </InfoWindow>
      }
    </div>
  )
}

Marker.propTypes = {
  toggleInfoOpen: PropTypes.func.isRequired,
  handleKeyPressInfoWindow: PropTypes.func.isRequired,
  locationId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  indexedLocation: PropTypes.string.isRequired,
  img: PropTypes.string,
  address: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Marker
