import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiLmo5at2DBO_37oWns_8owHJDqyLVOKc",
  authDomain: "",
  databaseURL: "https://reactevents-32fee.firebaseio.com",
  projectId: "reactevents-32fee",
  storageBucket: "",
  messagingSenderId: "854813512614"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;