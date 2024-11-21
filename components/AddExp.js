import { View, Text, StyleSheet,TextInput,Image,useWindowDimensions,TouchableOpacity,ScrollView,FlatList, Alert} from 'react-native'
import React,{useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native';
import {useExpenses} from '../components/ExpenseData';
import {Ionicons} from '@expo/vector-icons';
import {Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import {serverTimestamp} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import {RadioButton} from 'react-native-paper';

const AddExp = ({route, navigation}) => {
  const currentUserId = auth().currentUser?.uid;

  const [checked,setChecked] = useState('Debit');
    const [amount,setAmount] = useState('');
  const [itemName,setItemName] = useState('');
  
  const [editingId,setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const[isFocus,setIsFocus] = useState(false);
  
  const [selected,setSelected] = useState([]);
  const [amountError, setamountError] = useState('');
  const [itemError, setItemError] = useState('');
  const [categoryError, setcategoryError] = useState('');
  const [selectedCategory,setSelectedCategory] = useState(null);
 const [zeroError,setZeroError] = useState('');
 const [credDebt, setCredDebt] = useState('');
 const [optionsError,setOptionsError] = useState('');
  const  categories = [
    {label:"Food", value:"Food"},
    {label:"Transport", value:"Transport"},
    {label:"Rent", value:"Rent"},
    {label:"Utilities", value:"Utilities"},
    {label:"Entertainment", value:"Entertainment"},
    {label:"Health", value:"Health"},
    {label:"Others", value:"Others"},
  ];
  

  useEffect(() => {
    if(route.params?.expense) {
      const {id,itemName,amount,checked,category} = route.params.expense;
      setEditingExpense(id);
      setAmount(String(amount));
      setItemName(itemName);
      setChecked(checked);
      setSelectedCategory(category);
    } 
  }, [route.params?.expense]);

  const handleSaveExpense = async () => {
    if(!amount || String(amount).trim().length === 0) {
      setamountError("Amount is Required");
      return;
    } 
    if(Number(amount) === 0){
      setZeroError("Amount cannot be zero");
      return
    }
    if(!itemName || String(itemName).length === 0){
      setItemError("Item Name is Required");
      return;
    }
    if(!selectedCategory) {
      setcategoryError("Category is required");
      return;
    }
    if(!checked) {
      setOptionsError("Choose Credit or Debit");
    }
    const expense = {
    
      itemName,
      amount: parseFloat(amount),
      type: checked,
      category: selectedCategory,
      userId: currentUserId,
      createdAt : Date.now(),
    };

    try{
      if(editingExpense && typeof editingExpense === 'string') {
        await firebase
        .app()
        .database('https://com-anonymous-expensemanager-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`/${currentUserId}/expenses/${editingExpense}`)
        .update(expense);
        Alert.alert('Info','Expense updated successfully!');
      }else { 
        firebase.app().database('https://com-anonymous-expensemanager-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`/${currentUserId}/expenses`).push(expense);
        Alert.alert('Success','Expenses added successfully!');
        
      }
      setAmount('');
      setItemName('');
      setEditingId(null);
      setSelectedCategory(null);
      setChecked(null);
      navigation.goBack();
    }catch(error){
      console.error('Error saving expense: ',error);
      Alert.alert('Error', 'Failed to save Expense');
    }
  }

  
  
  const cancelButton = () => {
    setAmount('');
      setItemName('');
      setEditingId(null);
      setamountError('');
      setItemError('');
      setZeroError('');
      setcategoryError('');
      setSelectedCategory(null);
      setChecked(null);
      setOptionsError('');
  }
  
  

  
  
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = `${day}-${month}-${year}`;
    const time = `${hours}:${minutes}`;
    const dateTime = `${date} ${time}`;
    return dateTime;
  };
  const dimensions = useWindowDimensions().width;

  return (
    <> 
    
    <ScrollView>

    <View style={{flex:1,height:100}}></View>
    <View style={styles.amount}>
       <Text style={{fontSize:20, fontWeight:'400'}} >Record Transaction</Text>
       <TextInput  placeholder='$               ' value={amount}   onChangeText={(numeric)=> setAmount(numeric)} style={styles.amountPlaceholder}/>
        {amountError ? <Text style={{color:'red'}}>{amountError}</Text>: null}
        {zeroError ? <Text style={{color:'red'}}>{zeroError}</Text>: null}

        
        <View style={styles.amountBottom}>
            <Text style={{fontSize:18}}>Date and Time</Text>
            <Text style={{fontSize:18}}>{getCurrentDateTime()}</Text>
        </View>
        <View style={styles.amountPaidTo}>
            <Text style={{fontSize:18}}>Paid To</Text>
            <TextInput style={{fontSize:18, color:'#DAE7DC'}} placeholder='Enter the name or place' value={itemName} onChangeText={(text)=> setItemName(text)}/>
        </View>
    </View> 
        {itemError ? <Text style={{color:'red', textAlign:'center'}}>{itemError}</Text>: null}

    

      <View style={styles.category}>
         
        <Dropdown
              style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={categories}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus? 'Category' : '...'}
              searchPlaceholder="Search..."
              value={selectedCategory}
              onFocus={() => setIsFocus(true)}
              onBlur={()=> setIsFocus(false)}
              onChange={item => {
                setSelectedCategory(item.value);
                setIsFocus(false);
              }}
              
              renderLeftIcon={() => (
                <Ionicons
          name="grid"
          color="black" 
          size={20}
        />
              )}
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
              </Dropdown>
        {categoryError ? <Text style={{color:'red', textAlign:'center'}}>{categoryError}</Text>: null}

              <View style={styles.RadioButton}>  
                <View style={styles.radioButton}>
              <RadioButton value="Debit" 
              status={checked === "Debit" ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Debit')}/>
              <Text style={styles.radioButtonLabel}>Debit</Text>
              </View>
              <View style={styles.radioButton}>
              <RadioButton value="Credit" 
              status={checked === "Credit" ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Credit')}/>
              <Text style={styles.radioButtonLabel}>Credit</Text>
        {optionsError ? <Text style={{color:'red', textAlign:'center'}}>{optionsError}</Text>: null}
        </View>
              </View>              
             </View>


             <View style={styles.buttons}>

<TouchableOpacity onPress={handleSaveExpense} >
<View style={styles.largeButton}>
<Text style={styles.buttonText}>{editingExpense ? 'Update' : 'Save'}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={cancelButton}>
<View style={styles.largeButton}>
<Text style={styles.buttonText}>Cancel</Text>
</View>
</TouchableOpacity>
</View>          
             <View style={styles.expenseDataContainer}>
              <View style={styles.expenseItem}>
            <View style={styles.expenseDetails}>
              <Text style={styles.categoryText}>{selectedCategory}</Text>
              <Text style={styles.itemText}>{itemName}</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>${amount}</Text>
            </View>
            
              <View style={styles.dateContainer}>
              <Text style={[styles.debit,{color: credDebt === 'Credit'? '#00A65A' : '#FD3C4A'}]}>{credDebt}</Text>

              <Text style={styles.dateText}>
                {getCurrentDateTime()}
              </Text>
              </View>
            </View>
          
          
      
        
    
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
      flex:1,
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
    marginTop:20,
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
  dateText:{
    marginTop:10,
    marginRight:20,
  },
  debit:{
    textAlign:'center',
    fontSize:18,
    marginTop:20,
  },
  category: {
      marginHorizontal:30,
      marginTop:20,
      flexDirection:'column',
      
  },
  dropdown: {
    height: 50,
    backgroundColor:'#B2C9AB',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius:10,
    paddingHorizontal:10,
    marginTop:10,
    
  },
  placeholderStyle: {
    fontSize: 18,
    marginLeft:10, 
  },
  selectedTextStyle: {
    fontSize: 14,
    backfaceVisibility: 'visible',
    
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginHorizontal:20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight:'500',

  },
  icon: {
    marginRight: 5,
    marginHorizontal:20,

  },
  selectedStyle: {
    borderRadius: 12,
    fontWeight:'500',
  },
  RadioButton:{
    flexDirection:'column',
    borderWidth: 1,
    borderRadius:20,
    marginTop:10,
  },
  radioButton:{
     flexDirection: 'row',
     gap:10,
  },
  radioButtonLabel:{
    fontSize:16,
    marginTop:5
  }
})

export default AddExp