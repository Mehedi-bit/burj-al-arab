import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    firebase.initializeApp(firebaseConfig);
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email}
            setLoggedInUser(signedInUser);
            console.log(signedInUser);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }
    return (
        <div>
            <h2>This is login</h2>
            <button onClick={handleGoogleSignIn}> Goolge Sign In</button>
        </div>
    );
};

export default Login;