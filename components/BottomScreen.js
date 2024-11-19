import { View, TextInput, StyleSheet, Button, Text, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useMemo, useRef, useCallback,useState,useEffect } from 'react';
import {BottomSheetModalProvider,BottomSheetView,BottomSheetModal, BottomSheetBackdrop, TouchableOpacity} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FirebaseError} from '@react-native-firebase/app'
// import auth from '@react-native-firebase/auth';
// import { auth } from '../components/firebase'; // Adjust the path if necessary
import auth from '@react-native-firebase/auth';

const BottomScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name,setName] = useState('');
  const [token,setToken] = useState('')
  // const navigation = useNavigation();
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
  
  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const savedToken = await AsyncStorage.getItem('token');
  //       if (savedToken) {
  //         setToken(savedToken);
  //         navigation.navigate('AccountSetup');
  //       }
  //     } catch (e) {
  //       console.error('Failed to fetch the token', e);
  //     }
  //   };
  //   checkToken();
  // }, [navigation]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  // const handleAuth = () => {
  //   if (isSignUp) {
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         setUser(userCredential.user);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } else {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         setUser(userCredential.user);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  // const handleSignOut = () => {
  //   signOut(auth).then(() => setUser(null));
  // };

  //firebase auth signUp
  // const signUp = () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please fill in all fields');
  //     return;
  //   }
  //    setLoading(true);
  //    try{
  //     auth().
  //     createUserWithEmailAndPassword(email,password)
  //     .then(() => console.log("User signed up"));
      
  //    }catch(e){
  //     console.log(FirebaseError); 
  //     alert('Registration failed: ' + FirebaseError)
  //    }finally{
  //     setLoading(false);
  //    }
  // }
  // //firebase auth signIn
  // const signIn = () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please fill in all fields');
  //     return;
  //   }
  //   setLoading(true);
  //   try{
  //     auth()
  //     .signInWithEmailAndPassword(email,password)
  //     .then(() => {
  //       console.log('User Signed In');
  //     })
  //   }catch(FirebaseError){
  //     console.log(FirebaseError);
  //     alert('Sign In Error: ' +FirebaseError);
  //   }
  //   finally{
  //     setLoading(false);
  //   }
  // }

  // const handleLogin = async () => {
  //   if (!isValidEmail(email)) {
  //     // Alert.alert('Invalid email', 'Please enter a valid email address.');
  //     // return;
  //     Alert.alert('Invalid Email', 'Please enter a valid email address');
  //     return;
  //   }
  //   console.log('Email:', email);
  //   console.log('Password:', password);

  //   try {
  //     setToken('abc123');
  //     await AsyncStorage.setItem('username', email);
  //     await AsyncStorage.setItem('token', 'abc123');
  //     await AsyncStorage.setItem('name',name);
  //   } catch (err) {
  //     console.error('Error saving data:', err);
  //   }

  //   bottomSheetModalRef.current?.close();
  //   navigation.navigate('AccountSetup');
  // };
  // getData = async() => {
  //   try{
  //     const value = await AsyncStorage.getItem('token')
  //     const username = await AsyncStorage.getItem('username')
  //     if(value!==null){
  //        setToken({token: value})
  //     }
  //     if(value!==null){
  //       setToken({username})
  //    }
  //   } catch(e){
  //     console.log(e)
  //   }
  // }
  

  const handleAuth = async ({navigation}) => {
    try {
      if (isSignUp) {
        // Sign-Up Logic
        await auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('Sign-Up Successful', 'You can now log in.');
      } else {
        // Sign-In Logic
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert('Login Successful');
        navigation.replace('AccountSetup'); // Navigate to Layout
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
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