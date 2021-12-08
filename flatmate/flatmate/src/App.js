import * as React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './Accounts/LoginScreen';
import {RegisterScreen} from './Accounts/RegisterScreen';
import {HomeScreen} from './Accounts/HomeScreen';
import {ManageScreen} from './Accounts/ManageScreen';
import {ChangePasswordScreen} from './Accounts/ChangePasswordScreen';
import {FlatListScreen} from './Flatmate/FlatList';
import {createStackNavigator} from '@react-navigation/stack';
import styles from "./native_elements_styles";
import 'react-native-gesture-handler';


const Stack = createStackNavigator(); // NativeStackNavigator is maybe better

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen"
                             screenOptions={{
                                 headerMode: 'screen',
                                 headerTintColor: 'white',
                                 headerStyle: {backgroundColor: 'gray'},
                                 // headerLeft: () =>(<MyIcon/>)
                                 animationEnabled: true,

                             }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                    title: 'Flatmate'
                }}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                    title: 'Register'
                }}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    title: 'Login'
                }}/>
                <Stack.Screen name="ManageScreen" component={ManageScreen} options={{
                    title: 'Manage account'
                }}/>
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
                    title: 'Change Password'
                }}/>
                <Stack.Screen name="FlatList" component={FlatListScreen} options={{
                    title: 'Flat List',
                    headerRight: () => (
                        <Button
                            title="<username>"
                            buttonStyle={styles.barButton}
                        />
                    )
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;