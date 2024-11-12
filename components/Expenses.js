import { View, Text,StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Dropdown } from 'react-native-element-dropdown';
import {Ionicons } from '@expo/vector-icons';
import AddExpenses from '../components/AddExpenses';
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
      
      <AddExpenses/>
    
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
  }

  
})

export default Expenses