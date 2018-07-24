import React, { Component } from 'react';
import PropTypes from 'prop-types'

class InfoWindow extends Component {

  componentDidMount() {
    this.closeBtn.focus();
    const infoWindow = document.querySelector(".info-window");
    infoWindow.addEventListener('keydown', this.trapTabKey)
  }

  trapTabKey = (event) => { // This locks focus into a infoWindow when opened.

    const closeBtn = this.closeBtn;

    if(event.keyCode === 9) {
      if(event.shiftKey) {
        event.preventDefault();
        closeBtn.focus();
      } else {
        event.preventDefault();
        closeBtn.focus();
      }
    }
    if(event.keyCode === 27) {
      this.props.toggleInfoOpen('',{lat: 51.801881, lng: -4.971565});
    }
  }

  render() {
    const { toggleInfoOpen, name, address } = this.props;

    return(
      <div className="info-window" onClick={() => toggleInfoOpen('',{lat: 51.801881, lng: -4.971565})}>
        <div className="info-window-content">
          <h1>{ name }</h1>
          <button ref={(close) => { this.closeBtn = close; }} className="close-infowindow">&times;</button>
          <div className="location-img" style={{ backgroundImage: `url("${this.props.img?this.props.img : `http://via.placeholder.com/128x193?text=No%20Image`}")`}}></div>
          <p><strong>Address:</strong> { address === 'United Kingdom' ? 'No Address Available' :  address }</p>
        </div>
      </div>
    )
  }
}

InfoWindow.propTypes = {
  toggleInfoOpen: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}

export default InfoWindow
