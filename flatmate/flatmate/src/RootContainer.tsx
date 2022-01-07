import { NavigationContainer } from '@react-navigation/native';
import { LoggedNavigator } from './LoggedNavigator';
import { NotLoggedNavigator } from './NotLoggedNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from './store';
import auth from "./features/auth";
import { useAuth } from './features/hooks';
import React from 'react';

export default function RootContainer() {
    const Stack = createStackNavigator();

    const { isLoggedIn } = useAuth();

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(auth.actions.checkToken());
    }, [isLoggedIn]);

    return (<NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {!isLoggedIn ? (<Stack.Screen name="NotLoggedNavigator" options={{
                title: 'NotLoggedNavigator',
            }}>
                {() => <NotLoggedNavigator />}
            </Stack.Screen>) : (<Stack.Screen name="LoggedNavigator" options={{
                title: 'LoggedNavigator'
            }}>
                {props => <LoggedNavigator {...props} />}
            </Stack.Screen>)}
        </Stack.Navigator>
    </NavigationContainer>);
}