import React, { Component } from 'react';
import InfoWindow from './InfoWindow.js'

class Marker extends Component {

  render() {

    const { toggleInfoOpen, openIndex, name, index, img, address } = this.props;
    let markerClass = openIndex===index ? "whiteMarker" : "redMarker";

    return(
      <div className="marker-wrap" onClick={() => toggleInfoOpen(index)}>
        <div className={"marker "+ markerClass} id={"marker"+index}></div>
        {openIndex === index &&
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
