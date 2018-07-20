import React, { Component } from 'react';
import InfoWindow from './InfoWindow.js'

class Marker extends Component {

  render() {

    const { toggleInfoOpen, locationId, name, indexedLocation, img, address, index } = this.props;
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
}

export default Marker
