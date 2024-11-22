import { initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyDXPsvEjMHTblWXn2Yf3vitWqE-zv9j6AA',
  authDomain: 'com-anonymous-expensemanager.firebaseapp.com',
  databaseURL: 'https://com-anonymous-expensemanager-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'com-anonymous-expensemanager',
  storageBucket: 'com-anonymous-expensemanager.firebasestorage.app', 
  messagingSenderId: '621463656329',
  appId: '1:621463656329:android:13437ccb80d8efddba7358',
  measurementId: 'G-measurement-id',

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
