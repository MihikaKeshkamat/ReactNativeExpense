import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useMemo, useRef, useCallback,useState } from 'react';
import {BottomSheetModalProvider,BottomSheetView,BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Account = [
    {label: "Checking Account", value:'1'},
    {label: "Savings Account", value:'2'},
    {label: "Credit Card", value:'3'},
    {label: "Debit Card", value:'4'},
    {label: "Retirement Account", value:'5'},
    {label: "Fixed Deposit Account", value:'6'},
    {label: "Other", value:'7'},
];
const Bank = [
    {label: 'Kotak Mahindra Bank', value:'1'},
    {label: 'State Bank of India', value:'2'},
    {label: 'HDFC Bank', value:'3'},
    {label: 'ICICI Bank', value:'4'},
    {label: 'Axis Bank', value:'5'},
    {label: 'Punjab National Bank', value:'6'},
    {label: 'Induslnd Bank', value:'7'},
    {label: 'Bank of Baroda', value:'8'},
    {label: 'Yes Bank', value:'9'},
    {label: 'Canara Bank', value:'10'},
    {label: 'Union Bank of India', value:'11'},
    {label: 'Indian Bank', value:'12'},
    {label: 'Central Bank of India', value:'13'},
    {label: 'IDFC First Bank', value:'14'},
    {label: 'City Union Bank', value:'15'},
    {label: 'RBL Bank', value:'16'},
    {label: 'Other', value:'17'},
]
const AccountSetBottom = () => {
  const [balance,setBalance] = useState('');
 const [balanceError, setBalanceError] = useState('');
  const [name, setName] = useState('');
  const [selected,setSelected] = useState([]);
  const [value,setValue] = useState(null);
  const[isFocus,setIsFocus] = useState(false);
  const navigation = useNavigation();
  const [nameError,setNameError] = useState(null);
    const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(()=>['95%' ],[])
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((snapPoints) => {
    console.log('handleSheetChanges', snapPoints);
  }, []);
  const renderBackdrop = useCallback(
    (props) => (<BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehaviour={null}/>
  ),[]);
  
  const saveName = async() => {
    try {
      await AsyncStorage.setItem('name', name);
      console.log("Name saved successfully");
      console.log(name);
    }catch(e) {console.log('Error saving name: ',e)}
  };
  const handleLogin = () =>{
    bottomSheetModalRef.current?.close();
    navigation.navigate('Home');
  };
  const nameRequired = () => { 
    if (name && String(name).length > 0) {
      setNameError(null); 
      saveName();
    } else {
      setNameError("Name is required"); 
    }
  };
  

  const handleContinue = () => {
    if (name && String(name).length > 0) {
      setNameError(null); 
      setBalanceError(null);
      handleLogin();
      saveName(); 
      saveBalance();
    } else {
      nameRequired(); 
      balanceRequired();
    }
  };
  
  const saveBalance = async() => {
    try {
      await AsyncStorage.setItem('balance', balance);
      console.log("Balance saved successfully");
      console.log(balance);
    }catch(e) {console.log('Error saving balance: ',e)}
  };
  const balanceRequired = () => {
    if (balance && balance > 0) {
      setBalanceError(null);
      handleLogin();
      // saveBalance();
    } else {
      setBalanceError("Balance is required");
    }
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
        <TouchableOpacity onPress={handlePresentModalPress} >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>Let's go</Text>
      </View>
    </TouchableOpacity>
    <BottomSheetModalProvider>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges} 
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.bankDetails}>
                <TextInput placeholder='Name' value={name} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}}  onChangeText={(text)=> setName(text)}/>
                {nameError ? <Text style={{ color: 'red' }}>{nameError}</Text> : null}

                {/* <Text style= {[styles.accountDescriptionText, fontWeight='800', fontSize=20]}>Balance</Text> */}
              </View> 
              <View style={styles.bankDetails}>
              {/* <TextInput placeholder='Balance' value={balance}  onChangeText={(numeric) => setBalance(numeric)} maxLength={10} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}}/> */}
              <TextInput placeholder='Balance: $' value={balance} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}}  onChangeText={(numeric)=> setBalance(numeric)}/>

                {balanceError ? <Text style={{ color: 'red' }}>{balanceError}</Text> : null}
              </View> 

              <View style={styles.containerDropdown}>
              <Dropdown
              style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={Account}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus? 'Account Type' : '...'}
              searchPlaceholder="Search..."
              value={selected}
              onFocus={() => setIsFocus(true)}
              onBlur={()=> setIsFocus(false)}
              onChange={item => {
                setSelected(item);
                setIsFocus(false);
              }}
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
              
              <View style={styles.containerDropdown}>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={Bank}
                  search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus? 'Bank' : '...'}
                  searchPlaceholder='Search'
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={()=> setIsFocus(false)}
                  onChange={item => {
                      setValue(item.value);
                      setIsFocus(false);
                  }}
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
               
               <TouchableOpacity
              onPress={handleContinue}
              accessibilityRole="button"
              accessibilityLabel="Continue"
              >
             <View style={styles.continueButton}>
             <Text style={styles.buttonText}>Continue</Text>
             </View>
             </TouchableOpacity>
              
            </BottomSheetView>
        </BottomSheetModal>
        </BottomSheetModalProvider>
    </GestureHandlerRootView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height:520,
  },
  contentContainer: {
    height:120,
    flex:1,
    alignItems:'center'
  },
 
  bankDetails:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 10, 
    width: '50',
    marginLeft:20,
    marginRight:20,
    borderRadius:5,
    paddingVertical:10,
    fontSize:40,
  },
  largeButton: {
    alignSelf: 'stretch',
    borderRadius: 16,
    backgroundColor: '#7F3DFF',
    paddingHorizontal: 8,
    paddingVertical: 17,
    width:280,
    marginTop:400,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButton: {
    alignSelf: 'stretch',
    borderRadius: 16,
    backgroundColor: '#7F3DFF',
    minHeight: 56,
    paddingHorizontal: 8,
    paddingVertical: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 125,
    marginBottom: 0,
    marginHorizontal: 16,
    width:280,
  },
  containerDropdown:{
    marginTop:0,
    padding:10,
    width:370,
  },
  dropdown: {
    height: 40,
    backgroundColor: '#d1d1d1',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius:5,
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft:5, 
  },
  selectedTextStyle: {
    fontSize: 14,
    backfaceVisibility: 'visible',
    
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight:'500',

  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    fontWeight:'500',
  },
  
});


export default AccountSetBottom