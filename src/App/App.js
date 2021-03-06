import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import NewMovie from '../components/pages/NewMovie/NewMovie';
import ListMovies from '../components/pages/ListMovies/ListMovies';
import MovieDetail from '../components/pages/MovieDetail/MovieDetail';
import ListTheaters from '../components/pages/ListTheaters/ListTheaters';
import ListVisits from '../components/pages/ListVisits/ListVisits';
import SingleVisit from '../components/pages/SingleVisit/SingleVisit';

import './App.scss';

import fbConnection from '../helpers/data/connection';
import apiKeys from '../helpers/apiKeys.json';

const googleApiKey = apiKeys.firebaseKeys.apiKey;

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    const googlePlacesScript = document.createElement('script');
    googlePlacesScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    window.document.body.appendChild(googlePlacesScript);

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className='container'>
              <div className="row">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed}/>
                  <PrivateRoute path='/home' component={Home} authed={authed}/>
                  <PrivateRoute path='/movie/:id' component={MovieDetail} authed={authed}/>
                  <PrivateRoute path='/movies/new' component={NewMovie} authed={authed}/>
                  <PrivateRoute path='/movies/list' component={ListMovies} authed={authed}/>
                  <PrivateRoute path='/theaters/list' component={ListTheaters} authed={authed}/>
                  <PrivateRoute path='/visit/:id' component={SingleVisit} authed={authed}/>
                  <PrivateRoute path='/visits/list' component={ListVisits} authed={authed}/>
                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
