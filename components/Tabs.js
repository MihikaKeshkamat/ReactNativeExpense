import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from '@react-navigation/stack';
import HomePage from '../components/HomePage';
import Transaction from '../components/Transaction';
import Analysis from '../components/Analysis';
import Budget from '../components/Budget';
import Expenses from '../components/Expenses';
import AddExpenses from '../components/AddExpenses';
import AddExp from '../components/AddExp';
import React from 'react';
import { StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
// const ExpenseStack = createStackNavigator(); //to handle nested screens

// const ExpenseStackNavigator = () => {
//     return (
//         <ExpenseStack.Navigator>
            
//             <ExpenseStack.Screen
//                name="AddExp"
//                component={AddExp}
//             //    options = {{headerShown:false}}
//             />
//             <ExpenseStack.Screen
//                name= "Expenses"
//                component={Expenses}
//             //    options={{headerShown:false}}
//             />
//         </ExpenseStack.Navigator>
//     )
// }
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
            ...styles.shadow,
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
        // tabBarHideOnKeyboard:true,
    };
    
    return (
       <Tab.Navigator {...{screenOptions}}>
        <Tab.Screen name="HomePage"  component={HomePage}  
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
        <Tab.Screen name="Expenses" component={Expenses}
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
        <Tab.Screen name="AddExp" component={AddExp}
        options={{
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
        <Tab.Screen name="Budget" component={Budget}
        options={{
            
            tabBarIcon: ({focused}) => {
                return(
                    <Ionicons 
                    name="wallet" 
                    size={32}
                    color={focused? "#793FCA" : "#8e8e93"}/>
                )
            }
        }}
        ></Tab.Screen>
       </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius: 3.5,
        elevation:5,
    }
})
export default Tabs;


