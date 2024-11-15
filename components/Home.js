import { View, Text, StyleSheet } from 'react-native'
import React,  {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useExpenses} from '../components/ExpenseData'
const Home = () => {
  const [name,setName] = useState('');
  const [balance,setBalance] = useState('');
  const {expenses} = useExpenses();
  const getDate = () => {
    const today = new Date();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return capitalizedMonth;
  };
  useEffect(() => {
    const getName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedBalance = await AsyncStorage.getItem('balance');
        if(storedName) {
          setName(storedName);
        } 
        if(storedBalance) {
          setBalance(storedBalance)
        }
      }catch(error) {
        console.log('Error retrieving name: ', error);
      }
    };
    getName();
  },[]);

  const totalAmount = expenses.reduce((sum,expense) => sum + parseFloat(expense.amount),0);

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
    <View style={styles.accountBalance}>
      <Text style={styles.accountText}>Account Balance</Text>
      <Text style={styles.accountAmount}>$ {balance}</Text>
    </View>
    <View style={styles.incomeExp}>
    <View style={styles.incomeContainer}>
      
        <Ionicons 
        style={styles.incomeIcon}
        name="arrow-down-circle"
        size={30}
        color="black"/>
        <View style={styles.incomeTextContainer}>
          <View>
             <Text style={styles.incomeLabel}>Income</Text>
          </View>
          <View>
            <Text style={styles.incomeAmount}>$ 00.0 </Text>
          </View>
        </View>
    </View>
    <View style={styles.expenseContainer}>
      
        <Ionicons 
        style={styles.incomeIcon}
        name="arrow-up-circle"
        size={30}
        color="black"/>
        <View style={styles.incomeTextContainer}>
          <View>
             <Text style={styles.incomeLabel}>Expense </Text>
          </View>
          <View>
            <Text style={styles.incomeAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
    </View>
    </View>
    </>

  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 0,
  },
  leftContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
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
  accountBalance:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
   backgroundColor: 'ccc',
   left:120, 
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
      flexDirection: "row",
      gap:32,
  },
  incomeContainer: {
    padding:10,
    display:"flex",
    top:10,
    flexDirection:"row",
    alignItems:"center",
    left:30,
    backgroundColor:'#00A65A',
    borderRadius:20,
    width:155,
    height:90,
  },
  expenseContainer: {
    padding:10,
    display:"flex",
    top:10,
    flexDirection:"row",
    alignItems:"center",
    left:30,
    backgroundColor:'#FD3C4A',
    borderRadius:20,
    width:155,
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
});

export default Home

