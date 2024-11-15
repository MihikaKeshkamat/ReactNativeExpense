import React, {createContext, useState,useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);


export const ExpenseProvider = ({children}) => {
    const [expenses,setExpenses] = useState([]);

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

    const addExpenses = (newExpense) => {
        setExpenses([...expenses, {
            id:Date.now().toString(),
            ...newExpense
        }]);
    };
    
    
    
    

    const updateExpense = (id, updatedAmount, updatedItemName, selectedCategory) => {
        const updatedExpenses = expenses.map((expense) => 
        expense.id === id ? {...expense, amount:updatedAmount, itemName: updatedItemName, category: selectedCategory} : expense);
        setExpenses(updatedExpenses);
        saveExpenses(updatedExpenses);
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