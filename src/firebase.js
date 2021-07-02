import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCATvJ1N6T3WFyWkH637WixJyZAfUVS16Y",
    authDomain: "netflix-build-d1e5a.firebaseapp.com",
    projectId: "netflix-build-d1e5a",
    storageBucket: "netflix-build-d1e5a.appspot.com",
    messagingSenderId: "466096205204",
    appId: "1:466096205204:web:0086627df53d7da1863381"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export { auth }
export default db;