import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDtENcr1Lp98OqJGUZkn9ju2itE5N31_Ls',
  authDomain: 'firegram-b4390.firebaseapp.com',
  databaseURL: 'https://firegram-b4390.firebaseio.com',
  projectId: 'firegram-b4390',
  storageBucket: 'firegram-b4390.appspot.com',
  messagingSenderId: '189728073044',
  appId: '1:189728073044:web:d226278df6271b0c6294c1',
  measurementId: 'G-QHKTEPHR9E',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
