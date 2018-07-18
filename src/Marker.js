import React from 'react';
import InfoWindow from './InfoWindow.js'

function Marker(props) {

  const { toggleInfoOpen, infoWindowOpen } = props;

  return(
    <div className="marker" onClick={() => toggleInfoOpen()}>
    {infoWindowOpen &&
      <InfoWindow
        toggleInfoOpen={ toggleInfoOpen }
        name={ props.name }>
      </InfoWindow>
    }
    </div>
  )
}

export default Marker
