import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';

import './GooglePlacesInput.scss';

class GooglePlacesInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => this.setState({ address });

  handleSelect = address => geocodeByAddress(address)
    .then((results) => {
      console.error('address', results[0]);
      const googlePlaceLocation = results[0];
      const newTheater = {
        name: address.split(',')[0],
        streetAddress: `${googlePlaceLocation.address_components[0].long_name} ${googlePlaceLocation.address_components[1].long_name}`,
        cityAddress: googlePlaceLocation.address_components[3].long_name,
        stateAddress: googlePlaceLocation.address_components[5].short_name,
        zipAddress: googlePlaceLocation.address_components[7].short_name,
        googlePlaceId: googlePlaceLocation.place_id,
        lat: googlePlaceLocation.geometry.location.lat(),
        lng: googlePlaceLocation.geometry.location.lng(),
      };
      console.error('newTheater', newTheater);
    });

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div className="GooglePlacesInput">
            <div className="search-bar-container">
              <div className="search-input-container">
                <input
                  {...getInputProps({
                    placeholder: 'Search For Theaters...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GooglePlacesInput;
