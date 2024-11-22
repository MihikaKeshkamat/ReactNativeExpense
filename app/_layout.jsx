import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddExp from '../components/AddExp';
import Expenses from '../components/Expenses';
import SplashScreen from '../components/SplashScreen';
import AccountSetup from '../components/AccountSetup';
import HomeScreen from '../components/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ExpenseProvider} from '../components/ExpenseData';
// import Budget from '@/components/Budget';
import Tabs from '../components/Tabs';
// import Analysis from '@/components/Analysis';
import AccountSetBottom from '../components/AccountSetBottom';
import auth from 'firebase/auth'; // Adjust the path if necessary
import firestore from 'firebase/firestore';
import {app} from '../firebaseConfig'
import { View, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Stack = createStackNavigator();
const Layout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [isAccountSetup, setIsAccountSetup] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        
        try {
          const accountSetup = await AsyncStorage.getItem('isAccountSetup');
          setIsAccountSetup(accountSetup === 'true');
        } catch (error) {
          console.error('Error checking account setup status:', error);
          setIsAccountSetup(false);
        }
      }
      
      
        setInitializing(false);
      
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState(null);
  // const [isFirstLogin, setIsFirstLogin] = useState(false);
  // const [isAccountSetup, setIsAccountSetup] = useState(false);

  // useEffect(() => {
    // console.log('Firebase Auth: ', !!auth);
    // console.log('Firestore:', !!firestore);
    // const unsubscribe = auth().onAuthStateChanged(async (currentUser) => {
    //   setUser(currentUser);

    //   if (currentUser) {
    //     try {
          // const [userName, userBalance, accountSetup] = await Promise.all([
          //   AsyncStorage.getItem('userName'),
          //   AsyncStorage.getItem('userBalance'),
          //   AsyncStorage.getItem('isAccountSetup')
          // ]);
          // const isSetupComplete = 
          // userName && 
          // userBalance && 
          // parseFloat(userBalance) > 0 && 
          // accountSetup === 'true';

        // setIsAccountSetup(isSetupComplete);
        // const isFirstLogin = await AsyncStorage.getItem('isFirstLogin');
        // if (isFirstLogin === null){
        //   setIsNewUser(true);
        // }else {
        //   setIsNewUser(false);
        // }
  //       const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
  //       setIsNewUser(!userDoc.exists);
  //       if(!userDoc.exists)  {
  //         await AsyncStorage.setItem('isFirstLogin', 'false');
  //       }
  //       } catch (error) {
  //         console.error('Error checking account setup status:', error);
  //         setIsNewUser(false);
  //       }finally {
  //         setInitializing(false);
  //       }
  //     }
  //     else {
  //       setInitializing(false);
  //     } 
  //   });

  //   return unsubscribe;
  // }, []);

//  useEffect(() => {
//   const checkFirstLogin = async(currentUser) => {
//     if(currentUser){
//       try{
//         const firstLoginStatus = await AsyncStorage.getItem(`isFirstLogin_${currentUser.uid}`);
//         setIsFirstLogin(firstLoginStatus === null);
//       }catch(error) {
//         console.error('Error checking login: ',error);
//         setIsFirstLogin(false);
//       }
//     }
//   };
//   const unsubscribe = auth().onAuthStateChanged((currentUser) => {
//     setUser(currentUser); 
//     if(currentUser){
//       checkFirstLogin(currentUser);
//     }
//   });
//   return unsubscribe
//  }, []);

  // if (initializing) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <ExpenseProvider>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            // Auth Stack
            <>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              
            </>
          ) : !isAccountSetup? (
            // Account Setup Stack
            <>
              <Stack.Screen
                name="AccountSetup"
                component={AccountSetup}
                options={{ 
                  headerShown: true,
                  headerTitle: 'Setup Account',
                  headerLeft: null, // Prevent going back
                }}
              />
               <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="AddExp"
                component={AddExp}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Expenses"
                component={Expenses}
                options={{ headerShown: true }}
              />
            </>
          ) : (
            // Main App Stack
            <>
              <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="AddExp"
                component={AddExp}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Expenses"
                component={Expenses}
                options={{ headerShown: true }}
              />
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
    </ExpenseProvider>
  );
};

export default Layout;