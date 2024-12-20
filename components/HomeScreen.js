import { View, Text, StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native'
import React,  {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useExpenses} from './ExpenseData'
import { useNavigation } from '@react-navigation/native'
import {app, auth, database} from '../firebaseConfig';

const HomeScreen = ({route}) => {
  const [name,setName] = useState('');
  const [balance,setBalance] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome,setTotalIncome] = useState(0);
  const {expenses} = useExpenses();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const getDate = () => {
    const today = new Date();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return capitalizedMonth;
  };
  

  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        const isAccountSetup = await AsyncStorage.getItem('isAccountSetup');
        if (isAccountSetup === 'true') {
          const storedName = await AsyncStorage.getItem('name');
          const storedBalance = await AsyncStorage.getItem('balance');

          if (storedName && storedBalance) {
            setName(storedName);
            setBalance(storedBalance);
          } else {
            // If name or balance is missing, go back to setup screen
            navigation.replace('AccountSetup');
          }
        } else {
          // If account is not set up, navigate to account setup
          navigation.replace('AccountSetup');
        }
      } catch (error) {
        console.error('Error retrieving account info:', error);
      } 
    };

    getAccountInfo();
  }, []);
  useEffect(() => {
    if(route.params?.updatedName){
      setName(route.params.updatedName);
    }
  },[route.params?.updatedName]);

  useEffect(() => {
    if(route.params?.updatedBalance){
      setBalance(route.params.updatedBalance);
    }
  },[route.params?.updatedBalance]);
  
  useEffect(()=>{
    console.log('Current Expenses', expenses);
  },[expenses]);
  useEffect(() => {
    if(expenses && expenses.length > 0){
      calculateTotals();
      }
  },[expenses]);


  const calculateTotals = () => {
    try {
      let incomeTotal = 0.00;
      let expensesTotal = 0.00;

      expenses.forEach((expense) => {
        const amount = parseFloat(expense.amount) || 0;
        if (expense.type === "Credit") {
          incomeTotal += amount;
        } else if (expense.type === "Debit") {
          expensesTotal += amount;
        }
      });

      console.log('Calculated totals:', { incomeTotal, expensesTotal }); // Debug log
     
      setTotalIncome(incomeTotal);
      setTotalExpenses(expensesTotal);
      
      
    } catch (error) {
      console.error('Error calculating totals:', error);
    }
  };
  
  
  const handleIncomePress = () => {
    console.log('Income tile pressed');
    navigation.navigate('Expenses', { filter: 'Credit' });
  };

  
  const handleExpensePress = () => {
    console.log('Expense tile pressed');
    navigation.navigate('Expenses', { filter: 'Debit' });
  };
  
  return (
    <>
     <View style={styles.header}>
  <View style={styles.leftContainer}>
    <Ionicons 
      style={styles.profile} 
      name="person-circle" 
      size={48} 
      color="#793FCA" 
    />
    <Text style={styles.name}>Hi, {name}</Text>
  </View>
  
  <Text style={styles.date}>{getDate()}</Text>
  </View>
  <View style={styles.accountContainer}>
    <View style={styles.accountBalance}>
      <Text style={styles.accountText}>Account Balance</Text>
      <Text style={styles.accountAmount}>$ {balance}</Text>
    </View>
    </View>
    <View style={styles.incomeExp}>
    <View style={styles.incomeContainer}>
        <Ionicons 
        style={styles.incomeIcon}
        name="arrow-down-circle"
        size={30}
        color="black"/>
        <View style={styles.incomeTextContainer}>
       <TouchableOpacity onPress={handleIncomePress}>
          <View>
             <Text style={styles.incomeLabel}>Income</Text>
          </View>
          <View>
            <Text style={styles.incomeAmount}>${totalIncome.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
        </View>
    </View>
    <View style={styles.expenseContainer}>

        <Ionicons 
        style={styles.incomeIcon}
        name="arrow-up-circle"
        size={30}
        color="black"/>
        <View style={styles.incomeTextContainer}>
      <TouchableOpacity onPress={handleExpensePress}>
          <View>
             <Text style={styles.incomeLabel}>Expense </Text>
          </View>
          <View>
            <Text style={styles.incomeAmount}>${totalExpenses.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>

        </View>
    </View>
    </View>

    </>

  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
  },
  leftContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft:-30,
    
  },
  profile: {
    marginRight: 8, 
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#666',
    fontWeight: '800',
  },
  accountContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  accountBalance:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
   backgroundColor: 'ccc',
  //  left:100, 
   width:180,
   height:80, 
   borderRadius: 25,
   top:-6,
  },
  accountText: { 
    fontSize: 18,
    marginBottom:5,
    color:'#ABB8A3',
  },
  accountAmount: {
    fontSize:25,
    fontWeight:'600',
  },
  incomeExp: {
      flexDirection: "column",
      gap:32,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-10,
  },
  incomeContainer: {
    padding:10,
    display:"flex",
    top:10,
    flexDirection:"row",
    alignItems:"center",
    // left:30,
    backgroundColor:'#00A65A',
    borderRadius:20,
    width:250,
    height:90,
  },
  expenseContainer: {
    padding:10,
    display:"flex",
    top:10,
    flexDirection:"row",
    alignItems:"center",
    // left:30,
    backgroundColor:'#FD3C4A',
    borderRadius:20,
    width:250,
    height:90,
  },
 
 
  incomeIcon:{
    position:'relative',
    width:49,
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight:10,
    padding:8,
    borderRadius:20,
    
  },
  incomeTextContainer :{
    display:"flex",
    flexDirection:"column",
    marginLeft:40,
   
  },
  incomeLabel: {
    fontSize: 18,
    fontWeight:"600",
  },
  incomeAmount:{
    fontSize: 18,
    fontWeight:"400",
    marginTop:2,
  },
  accountDiv: { 
    borderWidth:1,
    borderRadius: 40,
    width:'90%',
    height:'90',
    marginHorizontal:20,
    merginVertical:20,
  }
});

export default HomeScreen

