import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddExp from '../components/AddExp';
import Expenses from '../components/Expenses';
import SplashScreen from '../components/SplashScreen';
import AccountSetup from '../components/AccountSetup';
import Home from '../components/Home'
import {ExpenseProvider} from '../components/ExpenseData';
import Tabs from '../components/Tabs';
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
    <ExpenseProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Tabs' : 'SplashScreen'}>
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
          name="Tabs" 
          component={Tabs}  
          options = {{headerShown: false}}/> 
          <Stack.Screen
          name="Home" 
          component={Home}  
          // options = {{headerShown: false}}
          /> 
           <Stack.Screen
          name="AddExp" 
          component={AddExp}  
          // options = {{headerShown: false}}
          /> 
          <Stack.Screen
          name="Expenses" 
          component={Expenses}  
          // options = {{headerShown: false}}
          /> 
         </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </ExpenseProvider>
  );
};

export default Layout;
