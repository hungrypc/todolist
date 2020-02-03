import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

// styling
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "antd/dist/antd.css";


const Auth = () => {

    // auth configuration
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};

export default connect(null)(Auth);
