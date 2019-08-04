import React from 'react';
import apiKeys from '../../../helpers/apiKeys.json';

import './StaticGoogleMap.scss';

const googleApiKey = apiKeys.firebaseKeys.apiKey;

class StaticGoogleMap extends React.Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap(this.props.coords);
      this.marker = this.createMarker(this.props.coords);
    });
  }

  createGoogleMap = coords => new window.google.maps.Map(this.googleMapRef.current, {
    zoom: 16,
    center: {
      lat: coords.lat,
      lng: coords.lng,
    },
    disableDefaultUI: true,
  })

  createMarker = coords => new window.google.maps.Marker({
    position: coords,
    map: this.googleMap,
  })

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
      />
    );
  }
}

export default StaticGoogleMap;
