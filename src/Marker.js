import React from 'react';
import InfoWindow from './InfoWindow.js'

function Marker(props) {

  const { toggleInfoOpen, openIndex, name, index, img, address } = props;

  return(
    <div>
      <div className="marker" onClick={() => toggleInfoOpen(index)}></div>
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

export default Marker
