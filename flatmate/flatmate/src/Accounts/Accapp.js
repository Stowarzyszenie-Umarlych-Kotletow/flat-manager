import * as React from "react";
import styles from "../native_elements_styles";
import {Text, View} from "react-native";
import logo from '../logo.svg'
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen} from "./HomeScreen";
import {RegisterScreen} from "./RegisterScreen";
import {LoginScreen} from "./LoginScreen";
import {ManageScreen} from "./ManageScreen";
import {ChangePasswordScreen} from "./ChangePasswordScreen";
const AccStack = createStackNavigator();

export function AccApp({navigation}) {
    return (
        <AccStack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'black'},
                // headerLeft: () =>(<MyIcon/>)
                animationEnabled: true,

            }}>
            <AccStack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Flatmate'
            }}/>
            <AccStack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                title: 'Register'
            }}/>
            <AccStack.Screen name="LoginScreen" component={LoginScreen} options={{
                title: 'Login'
            }}/>
            <AccStack.Screen name="ManageScreen" component={ManageScreen} options={{
                title: 'Manage account'
            }}/>
            <AccStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
                title: 'Change Password'
            }}/>
        </AccStack.Navigator>
    )
}