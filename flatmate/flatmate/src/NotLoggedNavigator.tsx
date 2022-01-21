import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen} from "./Accounts/HomeScreen";
import {RegisterScreen} from "./Accounts/RegisterScreen";
import {LoginScreen} from "./Accounts/LoginScreen";

const NotLoggedStack = createStackNavigator();

export function NotLoggedNavigator() {
    return (<NotLoggedStack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'black', height: 75},
                animationEnabled: true,

            }}>
            <NotLoggedStack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Flatmate'
            }}/>

            <NotLoggedStack.Screen name="RegisterScreen" options={{
                title: 'Register'
            }}>{(props) => <RegisterScreen {...props} />}
            </NotLoggedStack.Screen>

            <NotLoggedStack.Screen name="LoginScreen" options={{
                title: 'Login',
            }}>{() => <LoginScreen />}
            </NotLoggedStack.Screen>

        </NotLoggedStack.Navigator>)
}