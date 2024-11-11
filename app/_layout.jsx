import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../components/SplashScreen';
import AccountSetup from '../components/AccountSetup';
import HomeScreen from '../components/HomeScreen';

const Stack = createStackNavigator();

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomeScreen' : 'SplashScreen'}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountSetup"
              component={AccountSetup}
              
            />
          </>
        ) : (
          <>
          <Stack.Screen
           name="HomeScreen" 
           component={HomeScreen} /> 
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
