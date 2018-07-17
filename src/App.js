import React, { Component } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react'

class App extends Component {

  static defaultProps = {
   center: {
     lat: 51.882246,
     lng: -5.268297
   },
   zoom: 11
 };

  render() {
    return (
      <div className="App">
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB75r35CSSKNhFtuJnU-W0DV7X1hee6AIU' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
