import { View, Text, StyleSheet, TouchableOpacity, TextInput,Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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
    />
    <Text>Logout</Text>

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
  }
}
)

export default User