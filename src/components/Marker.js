import React from 'react';
import InfoWindow from './InfoWindow.js'
import PropTypes from 'prop-types'

function Marker(props) {

  const { toggleInfoOpen, handleKeyPressInfoWindow, locationId, name, indexedLocation, img, address, index, lat, lng, photoApiFail } = props;
  let markerClass = locationId===indexedLocation ? "blueMarker" : "redMarker";
  let latLng = { lat: lat, lng: lng};

  return(
    <div role="button" aria-label={name + " map marker"} className="marker-wrap" onClick={() => toggleInfoOpen(indexedLocation, latLng)} onKeyPress={handleKeyPressInfoWindow.bind(this, indexedLocation, latLng)}>
      <div className={"marker "+ markerClass} id={"marker"+index} tabIndex="0"></div>
      {locationId === indexedLocation &&
        <InfoWindow
          toggleInfoOpen={ toggleInfoOpen }
          name={ name }
          img= { img }
          address = { address }
          locationId= { locationId }
          photoApiFail = { photoApiFail }>
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
  index: PropTypes.number.isRequired,
  photoApiFail: PropTypes.bool.isRequired
}

export default Marker
