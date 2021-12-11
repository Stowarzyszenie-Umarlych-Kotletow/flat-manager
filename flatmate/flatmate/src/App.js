import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoggedNavigator} from './LoggedNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {NotLoggedNavigator} from './NotLoggedNavigator'
import 'react-native-gesture-handler';
import './static/bootstrap_style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const Stack = createStackNavigator(); // NativeStackNavigator is maybe better



function App() {
    const [loggedUser, setUser] = React.useState(null)
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {loggedUser == null ? (
                    <Stack.Screen name="NotLoggedNavigator" options={{
                        title: 'NotLoggedNavigator',
                    }}>
                        {
                            props => <NotLoggedNavigator {...props} {...{setUser}}/>
                        }
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="LoggedNavigator" options={{
                        title: 'LoggedNavigator'
                    }}>
                        {
                            props=><LoggedNavigator {...props} {...{setUser}} {...{loggedUser}}/>
                        }
                    </Stack.Screen>
                ) }
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;