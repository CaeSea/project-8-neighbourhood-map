import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

class App extends Component {

  state = {
    locations: []
  }

  getSites() {
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: 'MWSJXGIA1V1ULP2K3XHO5FS5IMAFEKEJO0KDNCXDYTZ2EA4R', //Client ID obtained by getting developer access
      client_secret:'CXMGMBT4QEZAWFAJOPA5S4VUKJIZG0GBY3KE5DH3M2HHQBSF', //Client Secret obtained by getting developer access
      limit: 10, //The max number of venues to load
      query: 'caravan sites', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: '51.801881,-4.971565' //The latitude and longitude of St. Davids Cathedral, West Wales
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      this.setState({locations: response.response.groups[0].items}); //Set the components state
      console.log(this.state.locations);
    }).catch(error => {
      console.log('There was an error fetching the location information', error)
      //Let the user know there was an error fetching results and to try again.
    });
  }

  componentDidMount() {
    this.getSites();
  }

  render() {
    const { locations } = this.state;
    return (
      <div className="App">
        <section className="map-container">
          <Map
            locations = { locations }
          />
        </section>
      </div>
    );
  }
}

export default App;
