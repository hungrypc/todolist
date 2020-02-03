import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Spin from 'antd/lib/spin';

import Auth from './components/Auth';
import Main from './components/Main';

import { signIn, signOut } from './actions';

import './styles/css/App.css';

const App = (props) => {

  const [authenticating, isAutheticating] = useState(true);

  const authUser = () => {
    return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
          props.signIn(user);
        } else {
          reject('user not logged in');
          // props.signOut();
        }
      });
    });
  }

  useEffect(() => {
    authUser().then((user) => {
      isAutheticating(false);
      // props.signIn(user);
    }, (error) => {
      isAutheticating(false);
    })
  }, [])

  if (authenticating) {
    return <div className="auth-loading"><Spin size="large" /></div>
  } else if (!props.isSignedIn && !props.user) {
    return <Auth />
  } else if (props.isSignedIn && props.user) {
    return <Main signOut={props.signOut}/>
  } else {
    return <div>something went wrong</div>
  }

}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {
  signIn,
  signOut
})(App);
