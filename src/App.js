import React, { Component } from 'react';
import './App.css';
import Main from './components/Main.js'

class App extends Component {

  state = {
    locations: [],
    locationId:'',
    errorLoadingAPI: false
  }

  toggleInfoOpen = (locationId) => {
    let currentLocationId = locationId;
    let list = document.querySelector(".listview");
    if(this.state.locationId === '' || this.state.locationId !== currentLocationId) {
      this.setState({
        locationId: currentLocationId
      })
      if(list.classList.contains('openMobMenu')) {
        list.classList.remove('openMobMenu')
      }
    } else {
      this.setState({
        locationId: ''
      })
    }
  }

  handleKeyPressInfoWindow = (locationId, event) => {
    if (event.key !== 'Enter') return;
    this.toggleInfoOpen(locationId)
  }

  getSites = () => {
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: 'MWSJXGIA1V1ULP2K3XHO5FS5IMAFEKEJO0KDNCXDYTZ2EA4R', //Client ID obtained by getting developer access
      client_secret:'CXMGMBT4QEZAWFAJOPA5S4VUKJIZG0GBY3KE5DH3M2HHQBSF', //Client Secret obtained by getting developer access
      limit: 10, //The max number of venues to load
      query: 'camping', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: '51.801881,-4.971565' //The latitude and longitude of Haverfordwest, West Wales
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then((response) => {
      if(response.ok) { //Checks that the response was recieved correctly from the FourSquare API.
        return response.json();
      }
      throw response;
    }).then((response) => {
      this.setState({ //Set the components state with the locations.
        locations: response.response.groups[0].items
      });
      //this.assignPhotos();
    }).catch(error => {
      console.log('There was an error fetching the location information', error)
      //Let the user know there was an error fetching results and to try again.
      this.setState({errorLoadingAPI: true}) // Set the state to try and force reload. If not then set the state to show the error message to user on the page.
    });
  }

  getPhotos = (venueId, location) => {

    const client_id = 'MWSJXGIA1V1ULP2K3XHO5FS5IMAFEKEJO0KDNCXDYTZ2EA4R';
    const client_secret = 'CXMGMBT4QEZAWFAJOPA5S4VUKJIZG0GBY3KE5DH3M2HHQBSF';
    const version = '20130619'
    const venuesEndpoint = `https://api.foursquare.com/v2/venues/${venueId}/photos?limit=1&client_id=${client_id}&client_secret=${client_secret}&v=${version}`;

    fetch(venuesEndpoint, {
      method: 'GET'
    }).then((response) => {
      if(response.ok){
        return response.json();
      }
      throw response;
    }).then((response) => {
      if(response.response.photos.count > 0) { //IF THE LOCATION HAS A PHOTO!!
        location.venue.photo = response.response.photos.items[0].prefix + '300x500' + response.response.photos.items[0].suffix;
      }
    }).catch(error => {
      console.log('There was an error fetching the location photos', error)
      //Let the user know there was an error fetching results and to try again.
      this.setState({errorLoadingAPI: true}) // Set the state to try and force reload. If not then set the state to show the error message to user on the page.
    });
  }

  assignPhotos = () => {
    this.state.locations.forEach((location) => {
      let id = location.venue.id;
      this.getPhotos(id, location);
    });
  }

  noFocusElements = () => {
    const iFrames = document.getElementsByTagName('iframe');
    iFrames.tabIndex = -1;
  }

  componentDidMount() {
    this.getSites();
    this.noFocusElements();
  }

  render() {
    const { locations, locationId, errorLoadingAPI} = this.state;
    const { toggleInfoOpen, handleKeyPressInfoWindow } = this;
    return (
      <div className="App">
      {errorLoadingAPI &&
        <strong className="error">Warning! There was an error retrieving the data needed to run the app, please refresh the page.</strong>
      }
        <Main
          locations = { locations }
          toggleInfoOpen = { toggleInfoOpen }
          locationId = { locationId }
          handleKeyPressInfoWindow = { handleKeyPressInfoWindow }
        />
      </div>
    );
  }
}

export default App;
