import { View, Text, StyleSheet,TextInput,Image,useWindowDimensions,TouchableOpacity,ScrollView,FlatList } from 'react-native'
import React,{useState} from 'react'
import {useNavigation} from '@react-navigation/native';
import {useExpenses} from '../components/ExpenseData';
import {Ionicons} from '@expo/vector-icons';

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
  const [itemName,setItemName] = useState('');
  const {addExpenses, expenses, updateExpense} = useExpenses();
  const [editingId,setEditingId] = useState(null);

  const navigation = useNavigation();

  const handleSave = () => {
    if(amount && itemName) {
      if(editingId) {
        updateExpense(editingId, amount, itemName);
      }else {
      addExpenses(amount,itemName);
      }
      setAmount('');
      setItemName('');
      setEditingId(null);
      navigation.navigate('Expenses');
    }
  };
  const startEditing = (expenses) => {
    setEditingId(expenses.id);
    setAmount(expenses.amount);
    setItemName(expenses.itemName);
  };
  const getCurrentDateTime = () => {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    
    const date = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}`;
    const dateTime = `${date} ${time}`;
  
    return dateTime;
  };
  
  const dimensions = useWindowDimensions().width;

  return (
    <> 
    
    <ScrollView>

       {/* <View style={styles.addExpImage}>
       <Image source={require('../assets/images/AddExpense.png')} style={[styles.image,{width:dimensions*0.8, height:200, resizeMode: 'cover'}]}/>
       </View> */}
    {/* <View>
        <Text>Add Expense</Text>
    </View> */}
    <View style={styles.amount}>
       <Text style={{fontSize:24, fontWeight:'400'}} >Amount Spent</Text>
       <TextInput  placeholder='$               ' value={amount}   onChangeText={(numeric)=> setAmount(numeric)} style={styles.amountPlaceholder}/>
        <View style={styles.amountBottom}>
            <Text style={{fontSize:18}}>Date and Time</Text>
            <Text style={{fontSize:18}}>{getCurrentDateTime()}</Text>
        </View>
        <View style={styles.amountPaidTo}>
            <Text style={{fontSize:18}}>Paid To</Text>
            <TextInput style={{fontSize:18, color:'#DAE7DC'}} placeholder='Enter the name or place' value={itemName} onChangeText={(text)=> setItemName(text)}/>
        </View>
    </View> 
    <View style={styles.buttons}>

             <TouchableOpacity onPress={handleSave} >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>{editingId ? 'Update' : 'Save'}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </View>
    </TouchableOpacity>
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
              
                {/* <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}> */}
                <Text style={styles.amountText}>${item.amount}</Text>
                <TouchableOpacity onPress={() => startEditing(item)}>
                  <Ionicons
                  name="pencil"
                  color="black"
                  size={20}
                  style={{marginTop:'30',marginLeft:15,paddingTop:18}}
                  />

                 </TouchableOpacity>
                 </View> 
                 
                // </View>

            )}
        >
        </FlatList>
    
      </View> 
      
      <View style={{height:100}}></View> 
    </ScrollView>
    
    </>

  )
}

const styles = StyleSheet.create({
  amount: {
      width:'20',
      height:'90',
      borderRadius:40,
      backgroundColor: '#B2C9AB',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center',
      // paddingHorizontal:20,
      marginLeft:20,
      marginRight:20,
      paddingVertical:10,
      marginTop:10,

  },
  amountPlaceholder:{
    marginTop:10,
    fontSize:20,
    textDecorationLine: 'underline',
    marginBottom:10,
    paddingHorizontal:10,
    marginLeft:10,
    textDecorationLine:'underline',
    color:'#DAE7DC'
  },
  amountBottom: {
    flexDirection: 'row',
    justifyContent:'space-between',
    gap: 50,
    
  },
  amountPaidTo:{
    flexDirection: 'row',
    justifyContent:'space-between',
    gap: 55,
    marginLeft:10,
    marginTop:20,
    fontSize:'18',
  },
  addExpImage: {
    // flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
    width:'100'
    
  },
  image:{
    // justifyContent:'center',
    resizeMode:'cover',
    borderRadius:20,
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:60,
    marginTop:10,
    // position:'relative',
    paddingVertical:10,
    paddingHorizontal:80,
  },
  largeButton: {
    // alignSelf: 'stretch',
    borderRadius: 16,
    backgroundColor: '#92B6B1',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom:0,
    
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom : 100,
  },
  expenseDataContainer:{
    flex:1,
    marginTop:20,
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
    marginLeft:80,
    marginTop:20,
  }
  
})

export default AddExp