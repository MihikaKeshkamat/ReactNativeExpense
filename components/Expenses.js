import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {Dropdown } from 'react-native-element-dropdown';
import {Ionicons } from '@expo/vector-icons';
// import AddExpenses from '../components/AddExpenses';
// import {useNavigation} from '@react-navigation/native';

const Months = [
  {label: "January", value: "1"},
  {label: "February", value: "2"},
  {label: "March", value: "3"},
  {label: " April", value: "4"},
  {label: "May", value: "5"},
  {label: "June", value: "6"},
  {label: "July", value: "7"},
  {label: "August", value: "8"},
  {label: "September", value: "9"},
  {label: "October", value: "10"},
  {label: "November", value: "11"},
  {label: "December", value: "12"},
];

const Expenses = () => {
  const[isFocus,setIsFocus] = useState(false);
  const [selected,setSelected] = useState([]);
  //Add Expense Button redirect 
  // const navigation = useNavigation();
  // const handleAddExpense = () => {
  //   navigation.navigate('AddExpenses');
  // }
  return (
<>    
    <View style={styles.containerDropdown}>
    <Dropdown
              style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={Months}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus? 'Month' : '...'}
              searchPlaceholder="Search..."
              value={selected}
              onFocus={() => setIsFocus(true)}
              onBlur={()=> setIsFocus(false)}
              onChange={item => {
                setSelected(item);
                setIsFocus(false);
              }}
              renderRightIcon={()=>(
                <Ionicons
                   style={styles.icon}
                   color="black"
                   name="chevron-down-circle-outline"
                   size={20}
                />
              )}
              selectedStyle={styles.selectedStyle}
              >
              </Dropdown>
    </View>
    <View style={{height:200,backgroundColor: '#ccc', marginHorizontal:20, marginTop:20}}>
      <Text>A Pie chart demonstrating expenses via categories</Text>
      </View>
      <View style={styles.showExpenses}>
        <View style={styles.expenseHeader}>
           <Text style={{fontSize:25, fontWeight:'800'}}> Expenses </Text> 
           <Text>Filter</Text>
        </View>
      </View>
       
       {/* <TouchableOpacity onPress={handleAddExpense} >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </View>
    </TouchableOpacity> */}
       

      {/* <AddExpenses/> */}
    
</>

    
    
  )
}

const styles = StyleSheet.create({
  containerDropdown:{
    marginTop:0,
    padding:10,
    width:390,
  },
  dropdown: {
    height: 40,
    backgroundColor: '#d1d1d1',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius:5,
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
    marginRight: 10,
  },
  selectedStyle: {
    borderRadius: 12,
    fontWeight:'500',
  },
  showExpenses: {
    flexDirection: 'row',
    gap:50,
    paddingHorizontal:5,
    paddingVertical: 10,
  },
  expenseHeader: {
    flexDirection: 'row',
    gap:200,
    paddingHorizontal:10,
  },
  largeButton: {
    alignSelf: 'stretch',
    borderRadius: 16,
    backgroundColor: '#7F3DFF',
    paddingHorizontal: 3,
    paddingVertical: 5,
    width:220,
    // marginTop:400,
    marginBottom:100,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },

  
})

export default Expenses