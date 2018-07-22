import React from 'react';
import InfoWindow from './InfoWindow.js'
import PropTypes from 'prop-types'

function Marker(props) {

  const { toggleInfoOpen, locationId, name, indexedLocation, img, address, index } = props;
  let markerClass = locationId===indexedLocation ? "blueMarker" : "redMarker";

  return(
    <div className="marker-wrap" onClick={() => toggleInfoOpen(indexedLocation)}>
      <div className={"marker "+ markerClass} id={"marker"+index}></div>
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
  locationId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  indexedLocation: PropTypes.string.isRequired,
  img: PropTypes.string,
  address: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Marker
