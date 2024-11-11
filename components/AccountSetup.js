import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountSetBottom from '../components/AccountSetBottom';
const AccountSetup = () => {
    
  return (
    <>
    {/* <View style={{backgroundColor: 'red'}}> */}
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Let's setup your account!</Text>
      <Text style={styles.accountDescriptionText}>
        Account can be your bank, credit card or your wallet.
      </Text>  
    </View>
    <AccountSetBottom/>
    {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: '#7F3DFF',
    
  },
  headerText: {
    fontSize: 36,
    color: '#212325',
    fontWeight: '500',
    marginLeft: 15,
    marginTop:10,
  },
  accountDescriptionText: {
    color: "#292B2D",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 18,
    maxWidth: 276,
    paddingTop:30,
    marginLeft: 15,
  },
});

export default AccountSetup;