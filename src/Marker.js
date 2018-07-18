import React from 'react';
import InfoWindow from './InfoWindow.js'

function Marker(props) {

  const { toggleInfoOpen, openIndex, name, index } = props;

  return(
    <div className="marker" onClick={() => toggleInfoOpen(index)}>
    {openIndex === index &&
      <InfoWindow
        toggleInfoOpen={ toggleInfoOpen }
        name={ name }>
      </InfoWindow>
    }
    </div>
  )
}

export default Marker
