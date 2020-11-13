import firebase from 'firebase'; 
import 'firebase/storage';

const config = {
  
  apiKey: "AIzaSyD84Jv-_GFwIvQKCX7MMmWE8-6bM2S7YJE",
  authDomain: "proyectotiendavirtual-3bd5d.firebaseapp.com",
  databaseURL: "https://proyectotiendavirtual-3bd5d.firebaseio.com",
  projectId: "proyectotiendavirtual-3bd5d",
  storageBucket: "proyectotiendavirtual-3bd5d.appspot.com",
  messagingSenderId: "175807946049",
  appId: "1:175807946049:web:b94fa7c33c4e1f298695c0"
  
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

