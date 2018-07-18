import React from 'react';

function InfoWindow(props) {

  const { toggleInfoOpen } = props;

  return(
    <div className="info-window" onClick={() => toggleInfoOpen()}>
      <h1>{ props.name }</h1>
    </div>
  )
}

export default InfoWindow
