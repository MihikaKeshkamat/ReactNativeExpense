import { View, Text,StyleSheet,FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Dropdown } from 'react-native-element-dropdown';
import {Ionicons } from '@expo/vector-icons';
import {useExpenses} from '../components/ExpenseData';

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



const Expenses = ({navigation, route}) => {
  const[isFocus,setIsFocus] = useState(false);
  const [selected,setSelected] = useState(null);
  const {expenses,  deleteExpense} = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const filter = route.params?.filter || null;
  const [filteredExpenses,setFilteredExpenses] = useState([]);
 useEffect(() => {
  filterExpenses();
 },[expenses,filter]);

 const filterExpenses = () => {
  if(!filter) {
    setFilteredExpenses(expenses);
  }else {
    const filtered = expenses.filter(expense => expense.type === filter);
    setFilteredExpenses(filtered);
  }
 };

  const  categories = [
    {label:"Food", value:"Food"},
    {label:"Transport", value:"Transport"},
    {label:"Rent", value:"Rent"},
    {label:"Utilities", value:"Mortgage"},
    {label:"Entertainment", value:"Entertainment"},
    {label:"Health", value:"Health"},
    {label:"Others", value:"Others"},
  ];
  const deleteAlert = (item) => {
    Alert.alert('Warning', 'Are you sure you want to delete this Expense?', [
      {
        text: 'OK',
        onPress : () => handleDelete(item),
      },
      {
        text:'Cancel',
        onPress : console.log('Cancel Pressed'),
      }
    ]);
    
  }
  const handleDelete = (expense) => {
    deleteExpense(expense.id);
    Alert.alert('Info', 'Expense Deleted');
  };
 
  const handleEdit = (expense) => {
    navigation.navigate('AddExp', {expense});
  }
  const getCurrentDateTime = () => {
    const now = new Date();
  
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
  
    const date = `${day}-${month}-${year}`;
  
    return date;
  };
  
          
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
    {/* <View style={{height:200,backgroundColor: '#ccc', marginHorizontal:20, marginTop:20}}>
      <Text>A Pie chart demonstrating expenses via categories</Text>
      </View> */}
      <View style={styles.showExpenses}>
        <View style={styles.expenseHeader}>
           <Text style={{fontSize:25, fontWeight:'800', marginTop:12}}> {filter ? `${filter} Transactions` : 'All Transactions'} </Text> 
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
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        inverted={true}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View style={styles.expenseDetails}>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.itemText}>{item.itemName}</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>${item.amount}</Text>
            </View>
            <View style={styles.iconDateContainer}>
              <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons
                  name="pencil"
                  color="black"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAlert(item)}>
                <Ionicons
                  name="trash-bin"
                  color="red"
                  size={20}
                />
              </TouchableOpacity>
              </View>
              <View style={styles.dateContainer}>
                <Text style={[styles.debit,{color: item.type === 'Credit'? '#00A65A' : '#FD3C4A'}]}>{item.type}</Text>
              <Text style={styles.dateText}>
                {getCurrentDateTime()}
              </Text>
              </View>
            </View>
            {/* <Text>
            ListEmptyComponent= {() => {
               <View style = {styles.emptyContainer}> 
                  <Ionicons name="receipt-outline" size={48} color="#666"/>
                  <Text style={styles.emptyText}>No Transactions found</Text>
                  {filter && (
                    <Text styles={styles.subText}>No {filter.toLowerCase()} Transactions Available</Text>
                  )}
               </View>
            }}
            </Text> */}
          </View>
        )}

        
      ></FlatList>
      

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
    flex:1,
  },
  expenseItem:{
    width:'90%',
    height:80,
    display:'flex',
    flexDirection: 'row',
    borderWidth:1,
    borderRadius:20,
    marginHorizontal:20,
    justifyContent:'space-between',
    marginVertical:10,
  },
  expenseDetails :{
    flexDirection:'column',
    justifyContent:'space-between',
    width:'36%'
  },
  categoryText:{
    marginLeft:10,
    marginTop:8,
    fontSize:18,
    fontWeight:'600'
  },
  itemText:{
    marginBottom:10,
    marginLeft:10,
    fontSize:17,
    fontWeight:'400',
  },
  amountContainer:{
    justifyContent:'center',
  },
  amountText:{
    fontSize:24,
    fontWeight:'500',
    color:'red',
  },
  iconDateContainer:{
    flexDirection:'column',
    justifyContent:'space-between',
  },
  iconContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:8,
  },
  dateContainer:{
    marginRight:7,
    marginBottom:8,
  },
  debit: {
    marginRight:0,
    marginLeft:30,
  }
  
  
})

export default Expenses