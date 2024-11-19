import { initializeApp, FirebaseApp } from '@react-native-firebase/app';


const firebaseConfig = {
  apiKey: 'AIzaSyDXPsvEjMHTblWXn2Yf3vitWqE-zv9j6AA',
  authDomain: '',
  projectId: 'com-anonymous-expensemanager',
  storageBucket: 'com-anonymous-expensemanager.firebasestorage.app', 
  messagingSenderId: '621463656329',
  appId: '1:621463656329:android:13437ccb80d8efddba7358', 
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export { app };
