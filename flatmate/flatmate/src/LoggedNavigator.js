import * as React from "react";
import {TouchableOpacity} from "react-native";
import logo from './static/logo.svg'
import {createStackNavigator} from "@react-navigation/stack";
import {ManageFlatsScreen} from './Flatmate/ManageFlats'
import {ManageScreen} from "./Accounts/ManageScreen";
import {DashboardScreen} from "./Flatmate/Dashboard";

import {ChangePasswordScreen} from "./Accounts/ChangePasswordScreen";
import {NotLoggedNavigator} from "./NotLoggedNavigator";

const LoggedStack = createStackNavigator();

export function LoggedNavigator({navigation, setUser}) {
    const [currentFlat, setCurrentFlat] = React.useState(null)
    return (
        <LoggedStack.Navigator
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
            {currentFlat == null ? (
                <LoggedStack.Screen name="FirstManageFlatsScreen" options={{
                    title: 'Manage flats'
                }}>
                    {
                        props => <ManageFlatsScreen {...props} {...{setCurrentFlat}}/>
                    }
                </LoggedStack.Screen>
            ) : (
                <>
                    <LoggedStack.Screen name="DashboardScreen" options={{
                        title: 'Dashboard'
                    }}>
                        {
                            props => <DashboardScreen {...props}/>
                        }
                    </LoggedStack.Screen>

                    <LoggedStack.Screen name="ManageFlatsScreen" options={{
                        title: 'Manage flats'
                    }}>
                    {
                        props => <ManageFlatsScreen {...props} {...{currentFlat}} {...{setCurrentFlat}}/>
                    }
                    </LoggedStack.Screen>
                </>
                )
            }


            <LoggedStack.Screen name="ManageScreen" options={{
                title: 'Manage account'
            }}>
                {
                    props => <ManageScreen {...props} {...{setUser}} {...{currentFlat}}/>
                }
            </LoggedStack.Screen>

            <LoggedStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
                title: 'Change Password'
            }}/>
        </LoggedStack.Navigator>
    )
}