import { View, Text,StyleSheet,FlatList, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState,useRef} from 'react'
import {Dropdown } from 'react-native-element-dropdown';
import {Ionicons } from '@expo/vector-icons';
import {useExpenses} from '../components/ExpenseData';
import {useNavigation} from '@react-navigation/native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import AddExp from '../components/AddExp';
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



const Expenses = ({navigation}) => {
  const[isFocus,setIsFocus] = useState(false);
  const [selected,setSelected] = useState(null);
  const {expenses,  deleteExpense} = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory,setSelectedCategory] = useState(null);

  const  categories = [
    {label:"Food", value:"Food"},
    {label:"Transport", value:"Transport"},
    {label:"Rent", value:"Rent"},
    {label:"Utilities", value:"Mortgage"},
    {label:"Entertainment", value:"Entertainment"},
    {label:"Health", value:"Health"},
    {label:"Others", value:"Others"},
  ];
  
  const handleDelete = (expense) => {
    deleteExpense(expense.id);
  };
 
  const handleEdit = (expense) => {
    navigation.navigate('AddExp', {expense});
  }
  
  const filteredExpenses = selectedCategory
            ? expenses.filter((expense) => expense.category === selectedCategory)
            : expenses;

             
  return (
  <ScrollView>
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
           <Text style={{fontSize:25, fontWeight:'800', marginTop:12}}> Expenses </Text> 
    <View style={styles.filterContainerDropdown}>

           <Dropdown
              style={[styles.filterDropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={categories}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus? 'Categories' : '...'}
              searchPlaceholder="Search..."
              value={selectedCategory}
              onFocus={() => setIsFocus(true)}
              onBlur={()=> setIsFocus(false)}
              onChange={item => {
                setSelectedCategory(item.value);
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
        </View>
      </View>
       
      <View style={styles.expenseDataContainer}>
           <FlatList
           data={expenses}
           keyExtractor = {(item) => item.id}
           inverted={true}
           renderItem={({item}) => (
             <View style={styles.expenseItem}>
               <View style={styles.expenseDetails}>
               <Text style={styles.itemCategory}>{item.category}</Text>
               {/* item.category */}
               <Text style={styles.itemText}>{item.itemName}</Text>
               </View>
             
               <View style={{display:'flex', flexDirection:'row'}}>
               <Text style={styles.amountText}>${item.amount}</Text> 
               <TouchableOpacity onPress={() => handleEdit(item)}>
                 <Ionicons
                 name="pencil"
                 color="black"
                 size={20}
                 style={{marginTop:'30',marginLeft:30,paddingTop:5}}
                 />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}> 

               <Ionicons
               name="trash-bin"
               color="red"
               size={20}
               style={{marginLeft:10,marginTop:5}}
                />

</TouchableOpacity> 
                </View>
                
                <View> 
                
                <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</Text>
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
  filterContainerDropdown: {
    marginTop:0,
    padding:10,
    width:170,
    marginLeft:-50,
  },
  filterDropdown:{
    height: 40,
    backgroundColor: '#d1d1d1',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius:5,
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
    marginLeft:10, 
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
    gap:126,
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
  itemCategory: {
    color:'#292B2D',
    fontSize: 18,
    fontWeight:'500',
  },
  dateText: {
    color:'#91919F',
    fontSize:13,
    fontWeight:'500',
    marginTop:40,
    marginLeft:-100,
    // marginRight:10,
  },
  amountText:{
    color: '#FD3C4A',
    fontSize:20,
    fontWeight:'600',
    alignSelf:'flex-start',
    marginRight:0,
    marginLeft:115,
    marginTop:7,
  },
  categoryText:{
    color:'black'
  }
  
})

export default Expenses