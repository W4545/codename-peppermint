import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbkUYtqdCC0sPMjbPhMc2WJuO-_41nmyU",
    authDomain: "codename-peppermint.firebaseapp.com",
    databaseURL: "https://codename-peppermint.firebaseio.com",
    projectId: "codename-peppermint",
    storageBucket: "codename-peppermint.appspot.com",
    messagingSenderId: "802200761049",
    appId: "1:802200761049:web:737b51a2708c48d55c44c8",
    measurementId: "G-9Z8X04133H"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default {
    auth: firebase.auth(),
    login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                console.log(result);
            })
            .catch(function(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            })
    },
    logout() {
        firebase.auth().signOut()
            .then(function() {})
            .catch(function(error) {
                console.log(error)});
    }
}