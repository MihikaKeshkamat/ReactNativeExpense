import { View, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {useNavigation} from '@react-navigation/native';
// import Expenses from '../components/Expenses';
import {Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons';

const Categories = [
    {label:"Food", value:"1"},
    {label:"Transportation", value:"2"},
    {label:"Rent/Mortgage", value:"3"},
    {label:"Utilities", value:"4"},
    {label:"Entertainment", value:"5"},
    {label:"Travel", value:"6"},
    {label:"Other", value:"7"},
  ];

const AddExp = () => {
    const [amount,setAmount] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const[isFocus,setIsFocus] = useState(false);
  const [selected,setSelected] = useState([]);

  // const navigation = useNavigation();
  
  // const navigateToExpenses = () => {
  //     navigation.navigate('Expenses');
  // }
  return (
    <>
        {/* <View>
      <Text>AddExp</Text>
    </View> */}

    <View>
        <Text>Add Expense</Text>
    </View>
    <View style={styles.amount}>
       <Text style={{marginBottom:10, fontSize:18, fontWeight:'400'}}>Amount Spent</Text>
       <TextInput placeholder='Amount: $' value={amount} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}}  onChangeText={(numeric)=> setAmount(numeric)}/>
        <View style={styles.amountBottom}>
            <Text>Date and Time</Text>
            <Text>11,13,24 6pm</Text>
        </View>
        <View style={styles.amountBottom}>
            <Text>Paid To</Text>
            <TextInput placeholder='Enter the name or place' value={paidTo} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}} onChangeText={(text)=> setPaidTo(text)}/>
        </View>
    </View> 
    {/* <View style={styles.category}>
        <Ionicons
          name="grid"
          color="black" 
          size={20}
        /> 
        <Text>Category</Text>  */}
        {/* <Dropdown
              style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={Categories}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus? 'Category' : '...'}
              searchPlaceholder="Search..."
              value={selected}
              onFocus={() => setIsFocus(true)}
              onBlur={()=> setIsFocus(false)}
              onChange={item => {
                setSelected(item);
                setIsFocus(false);
              }}
              renderRightIcon={()=>(
                <AntDesign
                   style={styles.icon}
                   color="black"
                   name="Safety"
                   size={20}
                />
              )}
              selectedStyle={styles.selectedStyle}
              >
              </Dropdown> */}
              
             {/* </View> */}
             {/* <View style={styles.buttons}>
             <TouchableOpacity >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>Save</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </View>
    </TouchableOpacity>
             </View> */}
 
    </>

  )
}

const styles = StyleSheet.create({
  amount: {
      width:'90%',
      height:'auto',
      borderRaidus:10,
      backgroundColor: '#ABB8A3',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:20,
      marginLeft:20,
      paddingVertical:10,
      marginTop:10,
  },
  dropdown: {
      height: 40,
      backgroundColor: '#d1d1d1',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      borderRadius:5,
      zIndex:999,

    },
    placeholderStyle: {
      fontSize: 14,
      marginLeft:5, 
    },
    selectedTextStyle: {
      fontSize: 14,
      backfaceVisibility: 'visible',
      
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      fontWeight:'500',
  
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
      fontWeight:'500',
    },
})

export default AddExp