import React from 'react';
import moment from 'moment';

import smash from '../../../helpers/data/smash';
import './ListVisits.scss';


class ListVisits extends React.Component {
  state = {
    selectedTheater: {},
    visits: [],
  }

  getVisits = () => {
    smash.getCompleteVisits()
      .then(visits => this.setState({ visits }))
      .catch(err => console.error('unable to get visits', err));
  }

  componentDidMount() {
    this.getVisits();
  }

  render() {
    const { visits } = this.state;

    const createTheaterRow = visit => (
      <tr key={visit.id}>
        <td>{visit.movie.title}</td>
        <td>{moment(visit.movieDateTime).format('LLL')}</td>
        <td>{visit.theater.name}</td>
        <td>{visit.theaterNum}</td>
        <td>{visit.isRecliners ? 'Yes' : 'No'}</td>
        <td>{visit.guests.length}</td>
      </tr>
    );

    const createVisitTable = () => (
      <table className="table table-striped movie-table">
        <thead className="thead-dark">
            <tr>
              <th>Movie</th>
              <th>Datetime</th>
              <th>Theater</th>
              <th>Theater #</th>
              <th>Recliners</th>
              <th># Guests</th>
            </tr>
        </thead>
        <tbody>
          {visits.map(visit => createTheaterRow(visit))}
        </tbody>
      </table>
    );

    return (
      <div className="ListVisits col">
        {createVisitTable()}
      </div>
    );
  }
}

export default ListVisits;
