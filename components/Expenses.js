import { View, Text,StyleSheet,FlatList, ScrollView} from 'react-native'
import React, {useState,useRef} from 'react'
import {Dropdown } from 'react-native-element-dropdown';
import {Ionicons } from '@expo/vector-icons';
import {useExpenses} from '../components/ExpenseData';
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
  const {expenses} = useExpenses();
  // const scrollY = useRef(new Animated.Value(0)).current;

  return (
  <ScrollView>
    <View style={styles.containerDropdown}>
    {/* <ScrollView horizontal={true} style={styles.scrollView}> */}
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
       
      <View style={styles.expenseDataContainer}>
        <FlatList
            data={expenses}
            keyExtractor = {item => item.id}
            renderItem={({item}) => (
              <View style={styles.expenseItem}>
                <View style={styles.expenseDetails}>
                <Text style={styles.itemText}>{item.itemName}</Text>
                <Text style={styles.dateText}>{item.dateTime}</Text>
                </View>
              
                <View style={{display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.amountText}>${item.amount}</Text>
                 </View> 
                </View>

            )}
        >
        </FlatList>
    
      </View>  
      <View style={{height:100}}></View> 
      </ScrollView>
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
  expenseDataContainer:{
    flex:1
  },
  expenseItem: {
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    borderWidth:1,
    borderRadius:20,
    marginHorizontal:25,
    marginBottom:10,
  },
  expenseDetails:{
    display:'flex',
    marginTop:'auto',
    marginBottom:'auto',
    minHeight:60,
    paddingTop:6,
    paddingBottom:6,
    flexDirection: 'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:20,
    marginTop:5,
  },
  itemText: {
    color:'#292B2D',
    fontSize: 18,
    fontWeight:'500',
  },
  dateText: {
    color:'#91919F',
    fontSize:13,
    fontWeight:'500',
    marginTop:13,
  },
  amountText:{
    color: '#FD3C4A',
    fontSize:20,
    fontWeight:'600',
    alignSelf:'flex-start',
    marginRight:0,
    // gap:200,
    marginLeft:110,
    marginTop:20,
  }
  
})

export default Expenses