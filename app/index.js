
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Layout from './_layout';
import {app, auth, database} from '../firebaseConfig';




const index = () => {
  return (
        <NavigationContainer>
          <Layout />
        </NavigationContainer>
      
  );
}

export default index













