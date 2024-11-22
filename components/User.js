import { View, Text, StyleSheet, TouchableOpacity, TextInput,Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {app} from '../firebaseConfig';
import {getAuth, signOut} from 'firebase/auth'
const User = ({navigation}) => {
  const [name,setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getName = async () => {
      const storedName = await AsyncStorage.getItem('name');
      if(storedName){
        setName(storedName);
      }
    };
    getName();
  }, []);

 const handleEdit = async () => {
    try{
      if(name.trim() === ''){
        Alert.alert('Validation', 'Name cannot be empty');
        return;
      }
      await AsyncStorage.setItem('name', name);
      Alert.alert('Success','Name updated succesffuly');
      setIsEditing(false);
      navigation.navigate('Home',{updatedName: name});
    }catch(error){
      console.error('Error updating Name',error);
      Alert.alert('Error', 'Failed to Update Name');
    }
 }

 const handleLogout = () => {
  const auth = getAuth();
  Alert.alert(
    'Confirm Logout','Are you sure you want to log out?',
    [
      {
        text : 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          auth.signOut().then(()=>{
            Alert.alert('Logged Out','You have been logged out!');
            navigation.replace('SplashScreen');
          })
          .catch((error)=>{
            console.error('Logout Error: ',error);
            Alert.alert('Error','Failed to log out. Please try again');
          })
        }
      }
    ],
    {cancelable : true}
  );
  };
 
  return (
    <>
    <View style={styles.header}>
  <View style={styles.leftContainer}>
    <Ionicons 
      style={styles.profile} 
      name="person-circle" 
      size={50} 
      color="#793FCA" 
    />
    </View>
    <View style={styles.nameContainer}>
    <Text style={styles.username}>Username </Text>
    {isEditing ? (
      <TextInput
      style={styles.nameInput}
      value={name}
      onChangeText={setName}
      editable={isEditing}/>
    ):(
      <Text style={styles.name}>{name}</Text>
    )}
    </View>
    <View style={styles.editButton}>
    <TouchableOpacity onPress={()=>setIsEditing(!isEditing)} >
                <Ionicons
                  name="pencil"
                  color="black"
                  size={20}
                />
              </TouchableOpacity>
    </View>
    {isEditing && (
      <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    )}
  </View>
  <View style={styles.logoutContainer}>
    <Ionicons 
    name="log-out-outline"
    color='purple'
    size={30}
    style={styles.logoutIcon}
    />
    <Text style={{fontSize:22,fontWeight:'500',marginTop:8,marginLeft:-120}}>Logout</Text>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Click Me</Text>
    </TouchableOpacity>

  </View>
    </>
  )
}
const styles=StyleSheet.create({
  header: {
    flexDirection: 'row', 
    // justifyContent: 'space-evenly', 
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
    borderWidth:1,
    borderRadius:10,
    marginHorizontal:20,
    marginTop:20,
  },
  leftContainer: {
    width:'20%',
    alignItems: 'center',
  },
  profile: {
    marginRight: 8, 
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username:{
    color:'#ABB8A3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    marginLeft:100
  },
  logoutContainer:{
    borderWidth:1,
    borderRadius:20,
    marginHorizontal:20,
    marginVertical:10,
    width:'90%',
    flexDirection:'row',
    height:50,
    justifyContent:'space-between',
  },
  logoutIcon:{
    marginTop:10,
    marginLeft:10
  },
  logoutButton:{
    borderWidth:1,
    backgroundColor:'#25D0BC',
    marginTop:7,
    borderRadius:20,
    height:30,
    marginRight:10
  },
  logoutButtonText:{
    paddingHorizontal:5,
    marginTop:3
  }
}
)

export default User