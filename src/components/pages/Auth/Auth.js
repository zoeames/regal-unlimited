import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleBtn from './googlebutton.png';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-secondary col-md-6 col-sm-12" onClick={this.loginClickEvent}>
          <img className="col-12" src={googleBtn} alt="google login button"/>
        </button>
      </div>
    );
  }
}

export default Auth;
