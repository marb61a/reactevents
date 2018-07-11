import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "reactevents-32fee.firebaseapp.com",
  databaseURL: "https://reactevents-32fee.firebaseio.com",
  projectId: "reactevents-32fee",
  storageBucket: "",
  messagingSenderId: "854813512614"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;