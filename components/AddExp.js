import { View, Text, StyleSheet,TextInput,Image,useWindowDimensions,TouchableOpacity,ScrollView,FlatList } from 'react-native'
import React,{useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native';
import {useExpenses} from '../components/ExpenseData';
import {Ionicons} from '@expo/vector-icons';
import {Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';



const AddExp = ({route, navigation}) => {
    const [amount,setAmount] = useState('');
  const [itemName,setItemName] = useState('');
  const {addExpenses, updateExpense} = useExpenses();
  const [editingId,setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const[isFocus,setIsFocus] = useState(false);
  const [selected,setSelected] = useState([]);

  const [selectedCategory,setSelectedCategory] = useState(null);

  const  categories = [
    {label:"Food", value:"Food"},
    {label:"Transport", value:"Transport"},
    {label:"Rent", value:"Rent"},
    {label:"Utilities", value:"Utilities"},
    {label:"Entertainment", value:"Entertainment"},
    {label:"Health", value:"Health"},
    {label:"Others", value:"Others"},
  ];
  const {expense} = route.params || {}; 

  useEffect(() => {
    if(expense) {
      setEditingExpense([expense]);
      setEditingId(expense.id)
      setAmount(expense.amount);
      setItemName(expense.itemName);
    } 
  }, [expense]);

  
  const handleSave = () => {
    // event.persist();
    if(amount && selected && itemName) {
      if(expense) {
        updateExpense(expense.id,amount,itemName,selectedCategory);
      }
      else {
      addExpenses({
        amount: amount,
        category: selectedCategory,
        itemName: itemName,
      date: new Date().toISOString(),
      });
      }
      setAmount('');
      setItemName('');
      setEditingId(null);
      navigation.goBack();
      
    }
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
    

      <View style={styles.category}>
         
        <Dropdown
              style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={categories}
              maxHeight={200}
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
              
             </View>

             <View style={styles.buttons}>

<TouchableOpacity onPress={handleSave} >
<View style={styles.largeButton}>
<Text style={styles.buttonText}>{editingExpense ? 'Update' : 'Save'}</Text>
</View>
</TouchableOpacity>

<TouchableOpacity>
<View style={styles.largeButton}>
<Text style={styles.buttonText}>Cancel</Text>
</View>
</TouchableOpacity>
</View>
    
             <View style={styles.expenseDataContainer}>
        <FlatList
            data={editingExpense}
           keyExtractor = {(item) => item.id}
            
            renderItem={({item}) => (
              <View style={styles.expenseItem}>
                <View style={styles.expenseDetails}>
                <Text style={styles.itemText}>{item.itemName}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>

                <Text style={styles.dateText}>{item.dateTime}</Text>
                </View>
              
                
                <Text style={styles.amountText}>${item.amount}</Text>
                
                     
                 </View> 
                 
               

            )}
        >
        </FlatList>
    
      </View> 
      
      {/* <View style={{height:100}}></View>  */}
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
    marginLeft:80,
    marginTop:20,
  },
  category: {
      marginHorizontal:30,
      marginTop:20,
  },
  dropdown: {
    height: 50,
    backgroundColor:'#B2C9AB',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius:10,
    paddingHorizontal:10,
    
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
  
})

export default AddExp