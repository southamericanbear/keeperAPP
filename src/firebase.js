import firebase from "firebase/app";
import "firebase/firestore";
require("dotenv").config();

var firebaseConfig = {
  apiKey: process.env.DB_HOST,
  authDomain: "keeperapp-70f03.firebaseapp.com",
  databaseURL: "https://keeperapp-70f03.firebaseio.com",
  projectId: "keeperapp-70f03",
  storageBucket: "keeperapp-70f03.appspot.com",
  messagingSenderId: "801993134305",
  appId: "1:801993134305:web:74d32e94f83e7628efe7a0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
