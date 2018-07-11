import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
};

export const firebaseApp = firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const listsRef = databaseRef.child('lists');

export default firebase;
