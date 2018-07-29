import React, { Component } from 'react';
import './App.css';
import Main from './components/Main.js'
import locations from './locations.json'

class App extends Component {

  state = {
    locations: [],
    locationId:'',
    center: {lat: 51.801881, lng: -4.971565},
    zoom: 8
  }

  //Opens info window for the clicked marker or list view button by comparing the state id to the id of the clicked location.
  toggleInfoOpen = (locationId, latLng) => {
    let currentLocationId = locationId;
    let list = document.querySelector(".listview");
    if(this.state.locationId === '' || this.state.locationId !== currentLocationId) {
      this.setState({
        locationId: currentLocationId,
        center: latLng,
        zoom: 11
      })
      if(list.classList.contains('openMobMenu')) {
        list.classList.remove('openMobMenu')
        list.style.visibility = "";
      }
    } else {
      this.setState({
        locationId: '',
        zoom: 8,
        center: {lat: 51.801881, lng: -4.971565}
      })
    }

  }

  //For keyboard users to be abel to toggle info window open/close
  handleKeyPressInfoWindow = (locationId, latLng,  event) => {
    if (event.key !== 'Enter') return;
    this.toggleInfoOpen(locationId, latLng);
  }

  //Retrieves data from json file and sets the states location property
  getSites = () => {
    //parse locations from local json file and set into state.locations array.
    this.setState({
      locations: locations.sites
    })
  }

  // Makes a call to FourSquare API for photos of each location, then updates the state adding the photo as a property to each location in the locations array.
  getPhotos = (venueId, location, index) => {
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
        const locationsCopy = this.state.locations.slice();
        locationsCopy[index].photo = response.response.photos.items[0].prefix + '300x500' + response.response.photos.items[0].suffix;
        this.setState({
          locations: locationsCopy
        })
        //location.photo = response.response.photos.items[0].prefix + '300x500' + response.response.photos.items[0].suffix;
      }
    }).catch(error => {
      console.log('There was an error fetching the location photos', error)
      //Let the user know there was an error fetching results and to try again.
    });
  }

  //Calls the getPhotos function for each location in the locations array.
  assignPhotos = () => {
    this.state.locations.forEach((location, index) => {
      let id = location.id;
      this.getPhotos(id, location, index);
    });
  }

  //Sets the tabindex to -1 for iFrame that is included in the google-map-react package. Makes the app easier to nav by keyboard.
  noFocusElements = () => {
    const iFrames = document.getElementsByTagName('iframe');
    iFrames.tabIndex = -1;
  }

  //Calls the getSites() function just before the component is mounted.
  componentWillMount() {
    this.getSites();
  }

  //Assigns each locations photos and calls the noFocusElements() function after component has mounted.
  componentDidMount() {
    //this.assignPhotos();
    this.noFocusElements();
  }

  render() {
    const { locations, locationId, zoom, center} = this.state;
    const { toggleInfoOpen, handleKeyPressInfoWindow } = this;
    return (
      <div className="App">
        <Main
          locations = { locations }
          toggleInfoOpen = { toggleInfoOpen }
          locationId = { locationId }
          handleKeyPressInfoWindow = { handleKeyPressInfoWindow }
          zoom = { zoom }
          center = { center }
        />
      </div>
    );
  }
}

export default App;
