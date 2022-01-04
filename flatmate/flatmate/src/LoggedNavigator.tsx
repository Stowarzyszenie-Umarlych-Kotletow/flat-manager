import * as React from "react";
import {TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import {ManageFlatsScreen} from './Flatmate/ManageFlatsScreen'
import {ManageScreen} from "./Accounts/ManageScreen";
import {DashboardScreen} from "./Flatmate/DashboardScreen";
import {ViewCalendarScreen} from "./Tasks/ViewCalendarScreen";
import {ChangePasswordScreen} from "./Accounts/ChangePasswordScreen";
import {Text} from "react-native";
import {useAppSelector} from "./store";

const userSettings = require("./static/userGear.svg") as string;

const LoggedStack = createStackNavigator();

export function LoggedNavigator({navigation}) {
    const [currentFlat, setCurrentFlat] = React.useState(null);

    const username = useAppSelector((state) => state.auth.user?.username);

    return (<LoggedStack.Navigator
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'black', height: 75},
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('ManageScreen')}
                    style={{display: "flex", flexDirection: "column", alignItems: "center", }}
                >
                <Text style={{color: "white"}}> {username} </Text>
                <img src={userSettings} alt="open settings" style={{width: '35px', height: '35px'}}/>
            </TouchableOpacity>

            ),
            animationEnabled: true,
        }}>
        {currentFlat == null ? (<LoggedStack.Screen name="FirstManageFlatsScreen" options={{
            title: 'Manage flats'
        }}>
            {props => <ManageFlatsScreen {...props} {...{setCurrentFlat}}/>}
        </LoggedStack.Screen>) : (<>
            <LoggedStack.Screen name="DashboardScreen" options={{
                title: 'Dashboard'
            }}>
                {props => <DashboardScreen {...props}/>}
            </LoggedStack.Screen>

            <LoggedStack.Screen name="ManageFlatsScreen" options={{
                title: 'Manage flats'
            }}>
                {props => <ManageFlatsScreen {...props} {...{currentFlat}} {...{setCurrentFlat}}/>}
            </LoggedStack.Screen>

            <LoggedStack.Screen name="ViewCalendarScreen" options={{
                title: 'Calendar'
            }}>
                {() => <ViewCalendarScreen />}
            </LoggedStack.Screen>
        </>)}


        <LoggedStack.Screen name="ManageScreen" options={{
            title: 'Manage account'
        }}>
            {props => <ManageScreen {...props} {...{currentFlat}}/>}
        </LoggedStack.Screen>

        <LoggedStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
            title: 'Change Password'
        }}/>
    </LoggedStack.Navigator>)
}