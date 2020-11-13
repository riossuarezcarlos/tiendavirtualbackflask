import firebase from 'firebase'; 
import 'firebase/storage';

const config = {
   
  apiKey: "AIzaSyDuKWlhpb-FaMw3_wUQXCSHmI9Df9p-fd4",
  authDomain: "proyectotiendavirtualbackup.firebaseapp.com",
  databaseURL: "https://proyectotiendavirtualbackup.firebaseio.com",
  projectId: "proyectotiendavirtualbackup",
  storageBucket: "proyectotiendavirtualbackup.appspot.com",
  messagingSenderId: "1043180861769",
  appId: "1:1043180861769:web:c3092b4faa826079358298"
  
/*
  apiKey: "AIzaSyDuKWlhpb-FaMw3_wUQXCSHmI9Df9p-fd4",
  authDomain: "proyectotiendavirtualbackup.firebaseapp.com",
  databaseURL: "https://proyectotiendavirtualbackup.firebaseio.com",
  projectId: "proyectotiendavirtualbackup",
  storageBucket: "proyectotiendavirtualbackup.appspot.com",
  messagingSenderId: "1043180861769",
  appId: "1:1043180861769:web:c3092b4faa826079358298"
  */
}

const fire = firebase.initializeApp(config);  
const storage = firebase.storage();
 
export {fire as default, firebase, storage};

