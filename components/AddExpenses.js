import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useMemo, useRef, useCallback,useState } from 'react';
import {BottomSheetModalProvider,BottomSheetView,BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const Expenses = [
  {label:"Food", value:"1"},
  {label:"Transportation", value:"2"},
  {label:"Rent/Mortgage", value:"3"},
  {label:"Utilities", value:"4"},
  {label:"Entertainment", value:"5"},
  {label:"Travel", value:"6"},
  {label:"Other", value:"7"},
];

const AddExpenses = () => {
  const [expense,setExpense] = useState('');
  const [amount,setAmount] = useState('');
  const[isFocus,setIsFocus] = useState(false);
  const [selected,setSelected] = useState([]);

    const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(()=>['90%' ],[])

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);
      const handleSheetChanges = useCallback((snapPoints) => {
        console.log('handleSheetChanges', snapPoints);
      }, []);
      const renderBackdrop = useCallback(
        (props) => (<BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehaviour={null}/>
      ),[]);
  return (
    <GestureHandlerRootView style={styles.container}>
    
    <TouchableOpacity onPress={handlePresentModalPress} >
      <View style={styles.largeButton}>
        <Text style={styles.buttonText}>Add Expense</Text>
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
                <TextInput placeholder='Add Expense' value={expense} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}}  onChangeText={(text)=> setExpense(text)}/>
              </View> 
              <View style={styles.bankDetails}>
              <TextInput placeholder='Amount: $' value={amount} style={{backgroundColor:'#d1d1d1', flex:1,paddingVertical:5, width:'200',borderRadius:5,paddingLeft:10}}  onChangeText={(numeric)=> setAmount(numeric)}/>
              </View> 

              <View style={styles.containerDropdown}>
              <Dropdown
              style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={Expenses}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus? 'Category' : '...'}
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
               <TouchableOpacity
             
              accessibilityRole="button"
              accessibilityLabel="Continue"
              >
             <View style={styles.continueButton}>
             <Text style={styles.buttonText}> Add Expense </Text>
             </View>
             </TouchableOpacity>
              
            </BottomSheetView>
        </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height:590,
        
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
        paddingHorizontal: 3,
        paddingVertical: 5,
        width:220,
        // marginTop:400,
        marginBottom:100,
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
})

export default AddExpenses