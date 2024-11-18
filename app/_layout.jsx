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
import Budget from '@/components/Budget';
import Tabs from '../components/Tabs';
import Analysis from '@/components/Analysis';
import AccountSetBottom from '../components/AccountSetBottom';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { View, ActivityIndicator } from 'react-native';
const Stack = createStackNavigator();

const Layout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // Unsubscribe on unmount
    return subscriber;
  }, []);
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       setIsLoggedIn(!!token);
  //     } catch (error) {
  //       console.log('Error checking login status:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  // if (isLoading) {
  //   return null; 
  // }

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen 
            name="AccountSetup" 
            component={AccountSetup}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="AccountSetBottom" 
            component={AccountSetBottom}
            options={{ headerShown: true }}
          />
    </Stack.Navigator>
  );

  const AppStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
            name="Tabs" 
            component={Tabs} 
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
    </Stack.Navigator>
  );
  return (
    <ExpenseProvider>
    <NavigationContainer>
    {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
    </ExpenseProvider>
  );
};

export default Layout;