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
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
const Stack = createStackNavigator();

const Layout = () => {
  const [initializing,setInitializing]= useState(true);
  const [user,setUser] = useState<FirebaseAuthTypes.User | null> (null);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', user);
      setUser(user);
      if (initializing) setInitializing(false);
    });

    // Unsubscribe on cleanup
    return () => subscriber();
  }, [initializing]);

  if (initializing) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return <Text>No user is signed in</Text>;
  }
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

    <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? 'Tabs' : 'SplashScreen'}
        >
          {/* Auth Stack */}
          <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen} 
          />
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
          
          {/* Main App Stack */}
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
      {/* <Stack.Navigator initialRouteName={isLoggedIn ? 'Tabs' : 'SplashScreen'}>
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
            <Stack.Screen
              name="AccountSetBottom"
              component={AccountSetBottom}

            />
            
          </>
        ) : (
          <>
          <Stack.Screen
          name='Tabs'
          component={Tabs}  
          options = {{headerShown: false}}/> 
        
         <Stack.Screen
          name="HomeScreen" 
          component={HomeScreen}  
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
      </Stack.Navigator> */}
    </NavigationContainer>
    </ExpenseProvider>
  );
};

export default Layout;