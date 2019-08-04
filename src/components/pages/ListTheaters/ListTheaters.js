import React from 'react';

import GooglePlacesInput from '../../shared/GooglePlacesInput/GooglePlacesInput';
import './ListTheaters.scss';
// import StaticGoogleMap from '../../shared/StaticGoogleMap/StaticGoogleMap';
// const coords = { lat: 43.642567, lng: -79.387054 };
// <StaticGoogleMap coords={coords}/>

class ListTheaters extends React.Component {
  render() {
    return (
      <div className="ListTheaters col">
        <h1>Theaters</h1>
        <GooglePlacesInput />
      </div>
    );
  }
}

export default ListTheaters;
