import React from 'react';

import StaticGoogleMap from '../../shared/StaticGoogleMap/StaticGoogleMap';

import './Home.scss';

class Home extends React.Component {
  render() {
    const coords = { lat: 43.642567, lng: -79.387054 };
    return (
      <div className="Home">
        <h1>Home</h1>
        <StaticGoogleMap coords={coords}/>
      </div>
    );
  }
}

export default Home;
