import React from 'react';

import './StaticGoogleMap.scss';

class StaticGoogleMap extends React.Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const { coords, zoomLevel } = this.props;
    this.googleMap = this.createGoogleMap(coords[0], zoomLevel);

    coords.forEach(coord => this.createMarker(coord));
  }

  createGoogleMap = (coords, zoomLevel) => new window.google.maps.Map(this.googleMapRef.current, {
    zoom: zoomLevel,
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
