import * as React from "react";
import styles from "../native_elements_styles";
import {Text, View} from "react-native";
import logo from '../logo.svg'
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import {FlatListScreen} from './FlatList'
const Tab = createStackNavigator();

export function FlatApp({navigation}) {
    return (
        <Tab.Navigator
            initialRouteName="FlatListScreen"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'gray'},
                // headerLeft: () =>(<MyIcon/>)
                animationEnabled: true,

            }}>
            <Tab.Screen name="FlatListScreen" component={FlatListScreen} />
        </Tab.Navigator>
    )
}