import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js'
//import InfoWindow from './InfoWindow.js'

class Map extends Component {

    state = {
      openIndex:'',
    }

    toggleInfoOpen = (index) => {
      let currentIndex = index;
      if(this.state.openIndex === '' || this.state.openIndex !== currentIndex) {
        this.setState({
          openIndex: index
        })
      } else {
        this.setState({
          openIndex: ''
        })
      }
    }

    render() {

      const { locations } = this.props;
      const { toggleInfoOpen } = this;

      return (
        <div style={{ height: '100vh', width: '80%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB75r35CSSKNhFtuJnU-W0DV7X1hee6AIU' }}
            defaultCenter={{lat: 51.801881, lng: -4.971565}}
            defaultZoom={10}
          >
          {locations.map((location, i) => (
              <Marker
                key={ location.venue.id }
                lat={ location.venue.location.lat}
                lng={ location.venue.location.lng }
                name={ location.venue.name }
                img={ location.venue.photo }
                toggleInfoOpen={toggleInfoOpen}
                openIndex={ this.state.openIndex }
                index = { i }
              />
            ))}
          </GoogleMapReact>
        </div>
    )
  }
}

export default Map;
