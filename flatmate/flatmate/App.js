import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen, HomeScreen, ManageScreen, ChangePasswordScreen} from './Accounts/AccountScreens';


const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                    title: 'Flatmate'
                }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                    title: 'Register'
                }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    title: 'Login'
                }} />
                <Stack.Screen name="ManageScreen" component={ManageScreen} options={{
                    title: 'Manage account'
                }} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
                    title: 'Change Password'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;