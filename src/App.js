import React, { Component } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react'

class App extends Component {

  state = {
    locations: [],
    markers: []
  }

  getSites() {
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: 'MWSJXGIA1V1ULP2K3XHO5FS5IMAFEKEJO0KDNCXDYTZ2EA4R', //Client ID obtained by getting developer access
      client_secret:'CXMGMBT4QEZAWFAJOPA5S4VUKJIZG0GBY3KE5DH3M2HHQBSF', //Client Secret obtained by getting developer access
      limit: 10, //The max number of venues to load
      query: 'pubs', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: '51.882246,-5.268297' //The latitude and longitude of St. Davids Cathedral, West Wales
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      this.setState({locations: response.response.groups[0].items}); //Set the components state
      console.log(this.state.locations);
    }).catch(response => {
      console.log('error')
      //Let the user know there was an error fetching results and to try again.
    });
  }

  renderMarkers(map, maps) {
    for (let location of this.state.locations) {
      let latLng = {lat: location.venue.location.lat, lng: location.venue.location.lng}
      let title = location.venue.name
      let id = location.venue.id
      let marker = new maps.Marker({
        position: latLng,
        map: map,
        title: title,
        animation: maps.Animation.DROP,
        id: id
      });
      this.state.markers.push(marker);
    }
  }

  componentDidMount() {
    this.getSites();
  }

  static defaultProps = {
   center: {
     lat: 51.882246,
     lng: -5.268297
   },
   zoom: 11
 }

  render() {
    return (
      <div className="App">
        <div style={{ height: '100vh', width: '90%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB75r35CSSKNhFtuJnU-W0DV7X1hee6AIU' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
            yesIWantToUseGoogleMapApiInternals
          />
        </div>
      </div>
    );
  }
}

export default App;
