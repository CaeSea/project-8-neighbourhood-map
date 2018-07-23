import React from 'react';
import PropTypes from 'prop-types'

function InfoWindow(props) {

  const { toggleInfoOpen, name, address } = props;

  return(
    <div className="info-window" onClick={() => toggleInfoOpen('',{lat: 51.801881, lng: -4.971565})}>
      <div className="info-window-content">
        <h1>{ name }</h1><span>&times;</span>
        <div className="location-img" style={{ backgroundImage: `url("${props.img?props.img : `http://via.placeholder.com/128x193?text=No%20Image`}")`}}></div>
        <p><strong>Address:</strong> { address === 'United Kingdom' ? 'No Address Available' :  address }</p>
      </div>
    </div>
  )
}

InfoWindow.propTypes = {
  toggleInfoOpen: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}

export default InfoWindow
