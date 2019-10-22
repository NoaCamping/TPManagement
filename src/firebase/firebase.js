import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA6w3cT7MA8GHCYRTSsDhywdNj1Dax9UfM",
    authDomain: "final-97042.firebaseapp.com",
    databaseURL: "https://final-97042.firebaseio.com",
    projectId: "final-97042",
    storageBucket: "",
    messagingSenderId: "192984055877",
    appId: "1:192984055877:web:26852b663f5cc8bb41632c",
    measurementId: "G-87MX0RKK5M"
  };

  firebase.initializeApp(firebaseConfig);

  const database=firebase.database();

  export {firebase, database as default};


  