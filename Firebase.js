import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDyeTkztuZ4-lj66dnRc98RWcPPAAb-fpA",
    authDomain: "fastfoodduff.firebaseapp.com",
    databaseURL: "https://fastfoodduff.firebaseio.com",
    projectId: "fastfoodduff",
    storageBucket: "fastfoodduff.appspot.com",
    messagingSenderId: "409041514843",
    appId: "1:409041514843:web:bec08ab6c4d52434f0ea7e",
    measurementId: "G-G9QNB6E7FW"
};
firebase.initializeApp(config);
firebase.analytics();

export default firebase;