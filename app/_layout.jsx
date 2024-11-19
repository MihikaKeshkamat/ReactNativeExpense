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
import auth from '@react-native-firebase/auth'; // Adjust the path if necessary
import { onAuthStateChanged } from '@react-native-firebase/auth';

import { View, ActivityIndicator } from 'react-native';
const Stack = createStackNavigator();
const Layout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [isAccountSetup, setIsAccountSetup] = useState(false);

  
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        
        try {
          // Check if account is setup from AsyncStorage
          // const accountSetup = await AsyncStorage.getItem('isAccountSetup');
          // setIsAccountSetup(accountSetup === 'true');
          const [userName, userBalance, accountSetup] = await Promise.all([
            AsyncStorage.getItem('userName'),
            AsyncStorage.getItem('userBalance'),
            AsyncStorage.getItem('isAccountSetup')
          ]);
          const isSetupComplete = 
          userName && 
          userBalance && 
          parseFloat(userBalance) > 0 && 
          accountSetup === 'true';

        setIsAccountSetup(isSetupComplete);
        } catch (error) {
          console.error('Error checking account setup status:', error);
          setIsAccountSetup(false);
        }finally {
          setInitializing(false);
        }
      }
      
      else {
        setInitializing(false);
      } 
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [initializing]);

  if (initializing) {
    // Show a loading indicator while determining authentication state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
          ) : !isAccountSetup ? (
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