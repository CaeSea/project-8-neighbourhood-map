import React, { Component } from 'react';
import PropTypes from 'prop-types'

class InfoWindow extends Component {

  //Puts keyboard focus onto the close button as soon the component is mounted (infowindow is opened)
  //Also adds an event listener to the infoWindow to trap the tab key, allows better UX for keyboards.
  componentDidMount() {
    this.closeBtn.focus();
    const infoWindow = document.querySelector(".info-window");
    infoWindow.addEventListener('keydown', this.trapTabKey)
  }

  // Traps the keyboard focus within an info window when it is opened.
  trapTabKey = (event) => { // This locks focus into a infoWindow when opened.

    const closeBtn = this.closeBtn;
    const focusElements = document.getElementsByClassName("focusable");
    const lastTab = focusElements[2];

    if(event.keyCode === 9) {
      if(event.shiftKey) {
        if(document.activeElement === closeBtn) {
          event.preventDefault();
          lastTab.focus()
        }
      } else {
        if(document.activeElement === lastTab) {
          event.preventDefault();
          closeBtn.focus();
        }
      }
    }
    if(event.keyCode === 27) {
      this.props.toggleInfoOpen(this.props.locationId, {lat: 51.801881, lng: -4.971565});
    }
  }

  render() {
    const { toggleInfoOpen, name, address } = this.props;

    return(
      <div className="info-window">
        <div className="info-window-content">
        <button aria-label="Close" ref={(close) => { this.closeBtn = close; }} className="close-infowindow focusable" onClick={() => toggleInfoOpen('',{lat: 51.801881, lng: -4.971565})}>&times;</button>
          <h1 className="focusable" tabIndex="0">{ name }</h1>
          <div className="location-img" style={{ backgroundImage: `url("${this.props.img?this.props.img : `http://via.placeholder.com/128x193?text=No%20Image`}")`}}></div>
          <p className="focusable" tabIndex="0"><strong>Address:</strong> { address === 'United Kingdom' ? 'No Address Available' :  address }</p>
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
