import React from 'react';

function InfoWindow(props) {

  const { toggleInfoOpen, name } = props;

  return(
    <div className="info-window" onClick={() => toggleInfoOpen('')}>
      <h1>{ name }</h1>
      <div className="location-img" style={{ backgroundImage: `url("${props.img?props.img : `http://via.placeholder.com/128x193?text=No%20Cover`}")`}}></div>
    </div>
  )
}

export default InfoWindow
