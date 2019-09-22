import React from 'react';
import moment from 'moment';

import smash from '../../../helpers/data/smash';
import './SingleVisit.scss';

class SingleVisit extends React.Component {
  state = {
    visit: {},
  }

  getSingleVisit = (id) => {
    smash.getSingleVisit(id)
      .then(visit => this.setState({ visit }))
      .catch(err => console.error('unable to get visits', err));
  }

  componentDidMount() {
    const visitId = this.props.match.params.id;
    console.log('visitId', visitId);
    this.getSingleVisit(visitId);
  }

  render() {
    const { visit } = this.state;
    const createSingle = () => {
      if (visit.movie) {
        return (
          <div>
            <h1>Movie: {visit.movie.title}</h1>
            <p>Date/Time: {moment(visit.movieDateTime).format('LLL')}</p>
            <p>Theater: {visit.theater.name}</p>
            <p>Theater #: {visit.theaterNum}</p>
            <p>Recliners: {visit.isRecliners ? 'Yes' : 'No'}</p>
            <p>Num guests: {visit.guests.length}</p>
          </div>
        );
      }

      return '';
    };

    return (
      <div className="SingleVisit col">
        {createSingle()}
      </div>
    );
  }
}

export default SingleVisit;
