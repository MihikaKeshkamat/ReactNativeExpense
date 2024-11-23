import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";


const Paginator = ({ scrollX }) => {
   //fix the code to pass list as props 
  const list = [
    {
        id: "1",
        title: "Your Money, Your Rules",
        description: "Take control of your finances with our intuitive expense tracker",
        image: require('../assets/images/Slider1.png')
    },
    {
        id: "2",
        title: "Track, Analyze, Prosper",
        description: "Empower your financial journey",
        image: require('../assets/images/Slider2.png')
    },
    {
        id: "3",
        title: "Simplify your Spending",
        description: "Effortlessly manage your expenses and Save More!",
        image: require('../assets/images/Slider3.png')
    }
  ];

  const {width} = useWindowDimensions();
   
  return (
  <> 
     <View style={[styles.dotContainer]}>
      {list.map((_,i)=>{
        const inputRange = [(i-1)*width, i*width,(i+1)*width] //to obtain the previous,current and next dot

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange:[10,30,10],
          extrapolate:'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3,1,0.3],
          extrapolate: 'clamp',
        })
        return <Animated.View style={[styles.dot, {width:dotWidth}]} key={i.toString()}/>
      })}
     </View> 
     
  </>
  )
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginBottom:-20,
    
    
},
    dot: { 
      marginTop: -10,
      marginBottom:-10,
      height:10,
      borderRadius: 5,
      backgroundColor: "#493d8a",
      marginHorizontal:8,
      textAlign: 'center',
      justifyContent: 'center',
    },
    
})
export default Paginator;
