import { View, Text, StyleSheet,TextInput,useWindowDimensions,TouchableOpacity,ScrollView,Dimensions,Platform, Alert} from 'react-native'
import React,{useState, useEffect} from 'react'
import {Ionicons} from '@expo/vector-icons';
import {Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import {RadioButton} from 'react-native-paper';
import { getAuth} from "firebase/auth";
import { ref, update, push, getDatabase } from 'firebase/database';


const AddExp = ({route, navigation}) => {
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

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
      const db = getDatabase();
      if(editingExpense && typeof editingExpense === 'string') {
        // await firebase
        // .app()
        // .database('https://com-anonymous-expensemanager-default-rtdb.asia-southeast1.firebasedatabase.app/')
        // .ref(`/${currentUserId}/expenses/${editingExpense}`)
        // .update(expense);
        await update(ref(db, `/${currentUserId}/expenses/${editingExpense}`), expense);
        Alert.alert('Info','Expense updated successfully!');
      }else { 
        // firebase.app().database('https://com-anonymous-expensemanager-default-rtdb.asia-southeast1.firebasedatabase.app/')
        // .ref(`/${currentUserId}/expenses`).push(expense);
        await push(ref(db, `/${currentUserId}/expenses`), expense);
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
    // return Date.now();
    return dateTime;
  };

  // const windowWidth = useWindowDimensions().width;
  // const windowHeight = useWindowDimensions().height;

  const {height, width} = useWindowDimensions();


  // const {height } = Dimensions.get('window');
  // const windowWidth = Dimensions.get('window').width || 400;

  return (
    <> 
    
    <ScrollView contentContainerStyle={{flexGrow:1}}>

    <View style={{height : {height} * 0.1}}></View>
    
    <View style={{width: {width}*0.8, flex:1,padding:16,alignSelf:'center'}}>
    {/* <View style={styles.formCard}> */}
    <View style={styles.amount}>
       <Text style={styles.title} >Record Transaction</Text>
       {/* <View style={styles.amountContainer}> */}
       <TextInput  placeholder='$                              ' value={amount}   onChangeText={(numeric)=> setAmount(numeric)} style={styles.amountPlaceholder}
        />
        {amountError ? <Text style={{color:'red'}}>{amountError}</Text>: null}
        {zeroError ? <Text style={{color:'red'}}>{zeroError}</Text>: null}
        {/* </View> */}
        
        <View style={styles.amountBottom}>
            <Text style={styles.labelText}>Date and Time</Text>
            <Text style={styles.valueText}>{getCurrentDateTime()}</Text>
        </View>
        <View style={styles.amountPaidTo}>
            <Text style={styles.labelText}>Paid To</Text>
            <TextInput style={styles.paidToInput} placeholder='Enter the name or place' value={itemName} onChangeText={(text)=> setItemName(text)}/>
        </View>
    </View> 
        {itemError ? <Text style={{color:'red', textAlign:'center'}}>{itemError}</Text>: null}

        </View>
        {/* </View> */}
     
      <View style={{justifyContent:'center' }}>
      <View style={{marginVertical: -10, flex:1,
             width: 350,
            alignSelf: 'center'}}> 
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
        </View> 
        </View>
        <View style={{justifyContent:'center'}}>
        <View style={{alignItems:'center'}}>
              <View style={{ flexDirection: 'row',
                justifyContent: 'space-between',
              width: 350,
              marginHorizontal:30,
              paddingVertical:20,
              paddingHorizontal:20,
              // flex:1,
              marginVertical: 50,
              borderWidth: 1,
               borderRadius:20,}}>  
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
        </View>
             <View style={styles.buttons}>

<TouchableOpacity onPress={handleSaveExpense} >
<View style={styles.largeButton}>
<Text style={{color: '#fff', paddingHorizontal:10,
    fontSize: 22,
    textAlign: 'center',}}>{editingExpense ? 'Update' : 'Save'}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={cancelButton}>
<View style={styles.largeButton}>
<Text style={styles.buttonText}>Cancel</Text>
</View>
</TouchableOpacity>
</View>      
<View style={{justifyContent:'center',alignItems:'center'}}> 
             <View style={{flex:1,
    marginTop:30,
    width:300,
    marginHorizontal:10,}}>
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
      </View>   
      <View style={{height:100}}></View> 
    </ScrollView>
    
    </>

  )
}

const styles = StyleSheet.create({
  // mainContent:{
  //   flex:1,
  //   padding:16,
  //   // width:'90%',
  //   alignSelf:'center',
  // },
  amount: {
      width:'20',
      height:200,
      borderRadius:40,
      backgroundColor: '#B2C9AB',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center',
      flex:0.8,
      // marginLeft:20,
      // marginRight:20,
      // paddingVertical:10,
      // paddingHorizontal:100,
      // marginTop:50,
      // marginBottom:50,
      padding:20,
      marginVertical:16,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 22,
    fontWeight: '500',
    textAlign: 'center',
  },

  amountPlaceholder:{
    marginTop:10,
    fontSize:24,
    textDecorationLine: 'underline',
    marginBottom:10,
    paddingHorizontal:20,
    paddingVertical:8,
    // marginLeft:46,
    // minWidth: dimension*0.6,
    textDecorationLine:'underline',
    color:'gray',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
  amountBottom: {
    flexDirection: 'row',
    justifyContent:'space-between',
    // gap: 50,
    marginBottom:16,
    
  },
  amountContainer:{
    alignItems:'center',
    // marginBottom:16
  },
  amountPaidTo:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    gap: 30,
    // marginLeft:10,
    // marginTop:20,
    // fontSize:18,
  },
  labelText:{
    fontSize:16,
    fontWeight:'500'
  },
  valueText: {
    fontSize:16,
    flex:1,
    marginLeft:16,
    padding:4
  },
  paidToInput:{
    fontSize:16,
    flex:1,
    marginLeft:16,
    padding:4
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
    // flexDirection:'row',
    justifyContent:'center',
    // alignItems:'center',
    gap:70,
    // marginTop:20,
    // // position:'relative',
    // paddingVertical:30,
    // paddingHorizontal:80,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    marginVertical: 20,

  },
  largeButton: {
    // alignSelf: 'stretch',
    // borderRadius: 16,
    // backgroundColor: '#92B6B1',
    // paddingHorizontal: 40,
    // paddingVertical: 20,
    // marginBottom:0,
    backgroundColor: '#92B6B1',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    // fontSize: 30,
    // color: 'white',
    // fontWeight: '600',
    // textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',

  },
  scrollContent: {
    paddingBottom : 100,
  },
  expenseDataContainer:{
    

  },
  expenseItem:{
    width:'100%',
    height:80,
    display:'flex',
    flexDirection: 'row',
    borderWidth:1,
    borderRadius:20,
    // marginHorizontal:20,
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
    marginRight:15,
    
  },
  debit:{
    textAlign:'center',
    fontSize:18,
    marginTop:20,
  },
  category: {
      marginHorizontal:20,
      marginTop:-40,
      flexDirection:'column',
      justifyContent:'center',
      // width:'90%',
      paddingHorizontal:-40,
      height:100,
      paddingVertical:50
      // width: {width} * 0.8,

  },
  dropdown: {
    // height: 50,
    backgroundColor:'#B2C9AB',
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
    // borderRadius:10,
    // paddingHorizontal:10,
    // marginTop:10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    // backgroundColor: '#fff',
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
  // RadioButton:{
  //   flexDirection:'column',
  //   borderWidth: 1,
  //   borderRadius:20,
  //   marginTop:40,
  //   width:550,
  //   marginHorizontal:30
  // },
  // radioButton:{
  //    flexDirection: 'row',
  //    gap:10,
  // },
  // radioButtonLabel:{
  //   fontSize:20,
  //   marginTop:5
  // }
  // RadioButton: {
  //   flexDirection: 'column',
  //   justifyContent: 'space-around',
  //   marginVertical: 20,
  //   borderWidth: 1,
  //   borderRadius:20,
  // },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLabel: {
    fontSize: 18,
    fontWeight:'500'
  },

})

export default AddExp