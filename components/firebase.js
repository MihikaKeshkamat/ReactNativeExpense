import firebase from '@react-native-firebase/app';

// Optionally import the services that you want to use
import '@react-native-firebase/auth';
// import '@react-native-firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqNQ5sibElcZ987SF1axN8I-eULPGQB2U",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "expensemanager-8c173",
  // ... other config
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;