import { View} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Text,PlatformPressable} from '@react-navigation/elements'
import {useLinkBuilder, useTheme} from '@react-navigation/native'
// import HomeScreen from '../components/HomeScreen'
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

function MyTabBar({state,descriptors,navigation}) {
    const {colors} = useTheme();
    const {buildHref} = useLinkBuilder();
    // const navigation = useNavigation();/
  return (
    <View style={{flexDirection:'row', backgroundColor: colors.background }}>
        {state.routes.map((route,index) => {
            const {options} = descriptors[route.key];
            const label = 
            options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
            const isFocused = state.index === index;

            const onPress = () => {
                const event = navigation.emit({
                    type:'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });
                if(!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name,route.params);
                }
            };

            const onLongPress = () => {
                navigation.emit({
                    type:'tabLongPress',
                    target:route.key
                });
            };

           return (
            <PlatformPressable 
            key={route.key}
            href={buildHref(route.name,route.params)}
            accessibilityState={isFocused ? {selected:true} : {}}
            accessibilityLabel = {options.tabBarAccessibilityLabel}
            testID={options.tabBarButtontestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex:1}}
            >
            <Text style={{color:isFocused? colors.primary : colors.text}}>{label}</Text>
            </PlatformPressable>
           );
        })}
    </View>
  );
}



const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabNavigation {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      
    </Tab.Navigator>
  );
};
return <MyTabs/>
};
// const MyTabs= createBottomTabNavigator({
//     screens: {
//         HomeScreen :HomeScreen,
//     }, 
//     tabBar:(props) => <MyTabBar {...props}/>,

// });

export default BottomTabNavigation