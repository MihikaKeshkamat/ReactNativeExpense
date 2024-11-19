import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDqNQ5sibElcZ987SF1axN8I-eULPGQB2U',
  authDomain: 'com-anonymous-expensemanager.argyleenigma.com',
  projectId: 'expensemanager-8c173',
  storageBucket: 'expensemanager-8c173.firebasestorage.app', 
  messagingSenderId: '145440125563',
  appId: '1:145440125563:android:356561a4d5dc5dcdc2e8de', 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
