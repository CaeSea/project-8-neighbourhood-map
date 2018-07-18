import React from 'react';

function InfoWindow(props) {

  const { toggleInfoOpen, name } = props;

  return(
    <div className="info-window" onClick={() => toggleInfoOpen('')}>
      <h1>{ name }</h1>
    </div>
  )
}

export default InfoWindow
