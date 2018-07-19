import React from 'react';

function InfoWindow(props) {

  const { toggleInfoOpen, name, address } = props;

  return(
    <div className="info-window" onClick={() => toggleInfoOpen('')}>
      <div className="info-window-content">
        <h1>{ name }</h1><span>&times;</span>
        <div className="location-img" style={{ backgroundImage: `url("${props.img?props.img : `http://via.placeholder.com/128x193?text=No%20Image`}")`}}></div>
        <p><strong>Address:</strong> { address === 'United Kingdom' ? 'No Address Available' :  address }</p>
      </div>
    </div>
  )
}

export default InfoWindow
