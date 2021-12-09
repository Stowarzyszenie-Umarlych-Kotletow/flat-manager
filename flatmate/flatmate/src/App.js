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
import {FlatApp} from './Flatmate/Flatapp';
import {createStackNavigator} from '@react-navigation/stack';
import styles from "./native_elements_styles";
import 'react-native-gesture-handler';
import {AccApp} from './Accounts/Accapp'

const Stack = createStackNavigator(); // NativeStackNavigator is maybe better

function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="AccApp"
                             screenOptions={{
                                 headerShown: false,
                             }}>
                <Stack.Screen name="AccApp" component={AccApp} options={{
                    title: 'AccApp'
                }}/>
                <Stack.Screen name="FlatApp" component={FlatApp} options={{
                    title: 'FlatApp'
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;