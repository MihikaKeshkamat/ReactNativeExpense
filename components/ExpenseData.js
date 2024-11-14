import React, {createContext, useState,useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);


export const ExpenseProvider = ({children}) => {
    const [expenses,setExpenses] = useState([]);

    useEffect(() => {
        loadExpenses();
    },[]);

    const loadExpenses = async () => {
        try{
            const storedExpenses = await AsyncStorage.getItem('expenses');
            if(storedExpenses) {
                setExpenses(JSON.parse(storedExpenses));
            }
        }catch(error){
            console.error("Failed to load expenses",error);
        }
    };

    const saveExpenses = async (newExpenses) => {
        try{
            await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
        }catch (error) {
            console.error("Failed to save Expenses", error);
        }
    };

    const addExpenses = (amount, itemName) => {
        const dateTime = new Date().toLocaleString();
        const newExpense = {id: Date.now().toString(), amount, itemName, dateTime};
        const updatedExpenses = [...expenses,newExpense];
        setExpenses(updatedExpenses);
        saveExpenses(updatedExpenses);
    };
    
    const updateExpense = (id,amount,itemName) => {
        const updatedExpenses = expenses.map((expenses) => 
        expenses.id === id ? {...expenses, amount, itemName} : expenses
    );
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    };

    return(
        <ExpenseContext.Provider value={{expenses,addExpenses, updateExpense}}>
            {children}
        </ExpenseContext.Provider>
    );
};