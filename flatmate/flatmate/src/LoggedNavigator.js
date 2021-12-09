import * as React from "react";
import {TouchableOpacity} from "react-native";
import logo from './logo.svg'
import {createStackNavigator} from "@react-navigation/stack";
import {FlatListScreen} from './Flatmate/FlatList'
import {ManageScreen} from "./Accounts/ManageScreen";
import {ChangePasswordScreen} from "./Accounts/ChangePasswordScreen";
const LoggedStack = createStackNavigator();

export function LoggedNavigator({navigation, setUser}) {
    return (
        <LoggedStack.Navigator
            initialRouteName="FlatListScreen"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'gray'},
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('ManageScreen')}>
                        <img src={logo} alt="logo" align="center"
                        />
                    </TouchableOpacity>
                ),
                animationEnabled: true,
            }}>

            <LoggedStack.Screen name="FlatListScreen" component={FlatListScreen}/>

            <LoggedStack.Screen name="ManageScreen" options={{
                title: 'Manage account'
            }}>
                {
                    props => <ManageScreen {...props} {...{setUser}}/>
                }
            </LoggedStack.Screen>

            <LoggedStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
                title: 'Change Password'
            }}/>
        </LoggedStack.Navigator>
    )
}