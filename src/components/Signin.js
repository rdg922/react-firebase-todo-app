import * as firebase from "firebase";
import firebaseConfig from '../firebase.config';

firebase.initializeApp(firebaseConfig);
// Firebase login
const provider = new firebase.auth.GoogleAuthProvider();

const Signin = () => firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log("Signed in user " + user.email);
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log("Could not sign in user " + email)
});

export default Signin;