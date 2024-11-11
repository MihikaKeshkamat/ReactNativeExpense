import { registerRootComponent } from 'expo';
import Layout from '../app/_layout';

registerRootComponent(Layout);











// index.tsx
// import React, {useState,useRef} from 'react';
// import { FlatList, View, Text, Image, useWindowDimensions, StyleSheet, Animated} from 'react-native';
// import Paginator from '../components/Paginator'
// import BottomScreen from '../components/BottomScreen'

// const list = [
//     {
//         id: "1",
//         title: "Your Money, Your Rules",
//         description: "Take control of your finances with our intuitive expense tracker",
//         image: require('../assets/images/Slider1.png')
//     },
//     {
//         id: "2",
//         title: "Track, Analyze, Prosper",
//         description: "Empower your financial journey",
//         image: require('../assets/images/Slider2.png')
//     },
//     {
//         id: "3",
//         title: "Simplify your Spending",
//         description: "Effortlessly manage your expenses and Save More!",
//         image: require('../assets/images/Slider3.png')
//     }
// ];

// const Index = () => {
//     const slidesRef = useRef(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const scrollX = useRef(new Animated.Value(0)).current;
//     const dimensions = useWindowDimensions().width;
//     const renderItem = ({item}) => {
//         console.log(item);
//         return(
//             <View style={[styles.container, {width:dimensions}]} >
//             {item.image && (
//                 <Image source={item.image} style={[styles.image,{width:dimensions*0.8, height:200, resizeMode: 'cover'}]} />
//             )}
//             <View>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.description}>{item.description}</Text>
//             </View>
//         </View>
//     );
//     };

//     const viewItemsChanged = useRef(({ viewItems }) => {
//         if (viewItems && viewItems.length > 0) {
//             setCurrentIndex(viewItems[0].index);
//         }
//     }).current;
    
//     const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    
//     return (
//         <>
//         <View style={{flex:1}}>   
       
//         <FlatList
//             data={list}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled={true}
//             bounces={false}
//             onScroll = {Animated.event(
//                 [{
//                     nativeEvent: {
//                         contentOffset: {
//                             x: scrollX
//                         }
//                     }
//                 }],
//                 {
//                     useNativeDriver: false,
//                 }
//             )}
//             onViewableItemsChanged={viewItemsChanged}
//             viewabilityConfig={viewConfig}
//             ref={slidesRef} //ref to flatlist
//         />
//         <Paginator data={list} scrollX = {scrollX} />  
//         <BottomScreen/>
//         </View>        
      
//         </> 
//     );
// };

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent: 'center',
//         alignItems: 'center',
        
//     },
    
//     image:{
//         flex:0.5,
//         justifyContent:'center',
//         resizeMode:'contain'
//     },
//     title:{
//         fontWeight: "900",
//         fontSize:28,
//         paddingTop:15,
//         marginBottom: 10,
//         color:'#5e4eb5',
//         textAlign:'center',
//     },
//     description: {
//         fontWeight: "300",
//         fontSize: 20,
//         color: '#62656b',
//         textAlign:'center',
//         paddingHorizontal:64,
//         marginBottom:0,
//     },
    
// })

// export default Index;

