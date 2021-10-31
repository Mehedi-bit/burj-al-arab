import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    const history = useHistory();
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

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
            history.replace(from);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
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