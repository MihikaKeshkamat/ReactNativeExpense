import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import index from '../ExpenseManager/app/index';
import AccountSetup from '../ExpenseManager/components/AccountSetup';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={index} />
        {/* <Stack.Screen name="Bottom" component={BottomScreen} /> */}
        <Stack.Screen name="AccountSetup" component={AccountSetup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;











// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './HomeScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home">
//                 <Stack.Screen 
//                     name="Home" 
//                     component={HomeScreen} 
//                     options={{ title: 'Welcome' }}  // Customize title as desired
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }
