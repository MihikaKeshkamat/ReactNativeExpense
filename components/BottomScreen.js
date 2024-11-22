import { View, TextInput, StyleSheet, Button, Text, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useMemo, useRef, useCallback,useState,useEffect } from 'react';
import {BottomSheetModalProvider,BottomSheetView,BottomSheetModal, BottomSheetBackdrop, TouchableOpacity} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import auth from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {app} from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const BottomScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name,setName] = useState('');
  const [token,setToken] = useState('')
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(()=>['90%' ],[])
  const [loading,setLoading] = useState(false);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((snapPoints) => {
    console.log('handleSheetChanges', snapPoints);
  }, []);
  const renderBackdrop = useCallback(
    (props) => (<BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} opacity={0.5} pressBehaviour="close"/>
  ),[]);
  

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  

  const handleAuth = async () => {
    const auth = getAuth();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth,email, password);
        // await AsyncStorage.setItem('isFirstLogin', 'false');
        Alert.alert('Sign-Up Successful', 'You can now log in.');
        navigation.replace('AccountSetup'); 

      } else {
        
        await signInWithEmailAndPassword(auth,email, password);
        Alert.alert('Login Successful');
        navigation.replace('Tabs'); 
      }
    } catch (error) {
      console.error('Authentication Error', error.message);
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <Button
            onPress={handlePresentModalPress}
            title="Login"
            color="black"
            style={{width:400, borderRadius:'5',fontSize:28,paddingVertical:10}}
            index={-1}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges} 
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.loginDetails}>
                
                <MaterialIcons name="alternate-email" size={20} color="#666" style={{marginRight:5}}></MaterialIcons>
                <TextInput placeholder='Email ID' value={email} style={{backgroundColor:'#ccc',flex:1,paddingVertical:0, width:'200'}} keyboardType='email-address' onChangeText={setEmail}/>
                </View>
               
                <View style={styles.loginDetails}>
               
                <Ionicons name="eye-off" size={20} color="#666" style={{marginRight:5}}/>
                <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={{backgroundColor:'#ccc',flex:1,paddingVertical:0,width:'100'}} secureTextEntry={true}/>
                
              <TouchableOpacity onPress={()=> {}}>
                <Text style={{color:'#7E8287',fontWeight:'700'}}>Forgot?</Text>
              </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', gap:20}}>
               

<Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} />
      <Text
        style={styles.toggleText}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </Text>
              </View>
            </BottomSheetView>
        </BottomSheetModal>
        </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height:200,
  },
  contentContainer: {
    height:150,
    flex:1,
    alignItems:'center'
  },
  sheetText: {
    fontSize:24,
    fontWeight:'600',
    padding:20,
  },
  loginDetails:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 20, // Add space between input fields
    width: '50',
  }
});
export default BottomScreen;