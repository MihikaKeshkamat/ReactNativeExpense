import React, {createContext, useState,useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import database from '@react-native-firebase/database';
import { getDatabase, ref, serverTimestamp, push, set, onValue, off } from '@react-native-firebase/database';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);


export const ExpenseProvider = ({children}) => {
    const [expenses,setExpenses] = useState([]);
    // const expensesRef = database().ref('/expenses');
    const loadExpenses = async () => {
        try{
            const storedExpenses = await AsyncStorage.getItem('expenses');
            const expensesData = storedExpenses ? JSON.parse(storedExpenses) : [];
            setExpenses(expensesData);
        }catch(error){
            console.error("Failed to load expenses",error);
        }
    };
    useEffect(() => {
        loadExpenses();
    },[]);
    const saveExpenses = async (newExpenses) => {
        try{
            await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
        }catch (error) {
            console.error("Failed to save Expenses", error);
        }
    };

    // const loadExpenses = () => {
    //     expensesRef.on('value', (snapshot) => {
    //       const data = snapshot.val();
    //       const fetchedExpenses = data
    //         ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
    //         : [];
    //       setExpenses(fetchedExpenses);
    //     });
    //   };
    
    //   useEffect(() => {
    //     loadExpenses();
    //     return () => expensesRef.off(); 
    //   }, []);

    const addExpenses = (newExpense) => {
        setExpenses([...expenses, {
            id:Date.now().toString(),
            ...newExpense
        }]);
        Alert.alert('Info', 'Expense Added');
    };

    // const addExpenses = (newExpense) => {
    //     const newExpenseRef = expensesRef.push(); 
    //     newExpenseRef
    //       .set({
    //         ...newExpense,
    //         createdAt: Date.now(), 
    //       })
    //       .then(() => {
    //         Alert.alert('Info', 'Expense Added');
    //       })
    //       .catch((error) => {
    //         console.error('Failed to add expense', error);
    //       });
    //   };
    // const addExpenses = async (expenseData) => {
    //     try {
    //       const db = getDatabase();
    //       const expensesRef = ref(db, 'expenses');
    //       const newExpenseRef = push(expensesRef);
      
    //       await set(newExpenseRef, {
    //         amount: expenseData.amount,
    //         itemName: expenseData.itemName,
    //         category: expenseData.category,
    //         type: expenseData.type,
    //         timestamp: serverTimestamp(),
    //       });
      
    //       return { id: newExpenseRef.key, ...expenseData };
    //     } catch (error) {
    //       console.error('Error adding expense:', error);
    //       throw error;
    //     }
    //   };
      
    
    
    

    const updateExpense = (id, updatedAmount, updatedItemName, selectedCategory, credDebt) => {
        const updatedExpenses = expenses.map((expense) => 
        expense.id === id ? {...expense, amount:updatedAmount, itemName: updatedItemName, category: selectedCategory, type:credDebt} : expense);
        setExpenses(updatedExpenses);
        saveExpenses(updatedExpenses);
        Alert.alert('Info','Expense Updated');
    }
    
    

    const deleteExpense = (id) => {
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);
        saveExpenses(updatedExpenses);
    }

    return(
        <ExpenseContext.Provider value={{expenses,addExpenses, updateExpense, deleteExpense}}>
            {children}
        </ExpenseContext.Provider>
    );
};