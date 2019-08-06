import React from 'react';

import theatersData from '../../../helpers/data/theatersData';
import StaticGoogleMap from '../../shared/StaticGoogleMap/StaticGoogleMap';
import GooglePlacesInput from '../../shared/GooglePlacesInput/GooglePlacesInput';
import './ListTheaters.scss';


class ListTheaters extends React.Component {
  state = {
    selectedTheater: {},
    theaters: [],
  }

  getTheaters = () => {
    theatersData.getAllTheaters()
      .then(theaters => this.setState({ theaters }))
      .catch(err => console.error('unable to get theaters', err));
  }

  componentDidMount() {
    this.getTheaters();
  }

  selectATheater = (newTheater) => {
    this.setState({ selectedTheater: newTheater });
  }

  addTheater = () => {
    theatersData.addTheater(this.state.selectedTheater)
      .then(() => {
        this.setState({ selectedTheater: {} });
        this.getTheaters();
      })
      .catch(err => console.error('unable to save theater', err));
  }

  render() {
    const { selectedTheater, theaters } = this.state;

    const createTheaterPreview = () => (
      <div className="col-6 offset-3 add-theater-container">
        <h2>Selected Theater:</h2>
        <h3>{selectedTheater.name}</h3>
        <h4>{selectedTheater.streetAddress}</h4>
        <h5>{selectedTheater.cityAddress}, {selectedTheater.stateAddress} {selectedTheater.zipAddress}</h5>
        <button className="btn btn-primary" onClick={this.addTheater}>Add Theater</button>
        <button className="btn btn-danger" onClick={ () => this.setState({ selectedTheater: {} }) }>Cancel</button>
      </div>
    );
    return (
      <div className="ListTheaters col">
        <h1>Theaters</h1>
        {Object.keys(selectedTheater).length > 0 ? (createTheaterPreview()) : (<GooglePlacesInput selectATheater={this.selectATheater}/>)}
        {theaters.length > 0 ? (
          <div>
            <h2>{theaters.length} Theaters Saved</h2>
            <StaticGoogleMap coords={theaters} zoomLevel={11}/>
          </div>
        ) : ''}
      </div>
    );
  }
}

export default ListTheaters;
