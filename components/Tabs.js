import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen'
import Transaction from '../components/Transaction';
import Analysis from '../components/Analysis';
import User from '../components/User';
import Expenses from '../components/Expenses';
import AddExpenses from '../components/AddExpenses';
import AddExp from '../components/AddExp';
import React from 'react';
import { StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const ExpenseStack = createStackNavigator(); 
const ExpenseStackNavigator = () => {
    return (
        <ExpenseStack.Navigator>
            
            <ExpenseStack.Screen
               name="AddExp"
               component={AddExp}
            //    options = {{headerShown:false}}
            />
            <ExpenseStack.Screen
               name= "Expenses"
               component={Expenses}
            //    options={{headerShown:false}}
            />
        </ExpenseStack.Navigator>
    )
}
const Tabs = () => {
    const screenOptions = {
        tabBarStyle:{
            position:'absolute',
            backgroundColor: "#ffffff",
            height:60,
            right:20,
            left:20,
            borderRaidus:100,
            bottom:20,
            elevation:0,
        },
        // tabBarItemStyle:{
        //     backgroundColor:'#ccc'
        // },
        tabBarLabelStyle:{
            fontWeight:'900',
            color:'black',
            top:5,
        },
        tabBarShowLabel: true,
        tabBarHideOnKeyboard:true,
    };
    
    return (
       <Tab.Navigator screenOptions = {screenOptions}>
        <Tab.Screen name="Home"  component={HomeScreen}  
        // initialParams={{
        //     name: route.params?.name || '',
        //     balance: route.params?.balance || '0',
        //   }}
        options={{
            // headerShown: false,
            tabBarIcon: ({focused}) => {
                return(
                    <Ionicons 
                    name="home" 
                    size={32}
                    color={focused? "#793FCA" : "#8e8e93"}
                    
                    />
                )
            }
        }}
        ></Tab.Screen>
        <Tab.Screen name="Expense" component={Expenses}
        options={{
            tabBarIcon: ({focused}) => {
                return(
                    <Ionicons 
                    name="swap-horizontal" 
                    size={32}
                    color={focused? "#793FCA" : "#8e8e93"}/>
                )
            }
        }}
        ></Tab.Screen>
        <Tab.Screen name="Add" component={ExpenseStackNavigator}
        tabBarShowLabel='false'
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
                return(
                    <Ionicons 
                    name="add-circle" 
                    size={32}
                    color={focused? "#793FCA" : "#8e8e93"}/>
                )
            }
            
        }}
        ></Tab.Screen>
        <Tab.Screen name="Analysis" component={Analysis}
        options={{
            tabBarIcon: ({focused}) => {
                return(
                    <Ionicons 
                    name="stats-chart" 
                    size={32}
                    color={focused? "#793FCA" : "#8e8e93"}/>
                )
            }
        }}
        ></Tab.Screen>
        <Tab.Screen name="User" component={User}
        options={{
            
            tabBarIcon: ({focused}) => {
                return(
                    <Ionicons 
                    name="person-circle-outline" 
                    size={32}
                    color={focused? "#793FCA" : "#8e8e93"}/>
                )
            }
        }}
        ></Tab.Screen>
       </Tab.Navigator>
    );
}


export default Tabs;


