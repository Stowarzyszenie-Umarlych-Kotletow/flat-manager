import * as React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ManageFlatsScreen } from './screens/main/ManageFlatsScreen'
import { ManageAccountScreen } from "./screens/accounts/ManageAccountScreen";
import { DashboardScreen } from "./screens/main/DashboardScreen";
import { ViewCalendarScreen } from "./screens/tasks/ViewCalendarScreen";
import { ChangePasswordScreen } from "./screens/accounts/ChangePasswordScreen";
import { TransactionManagementScreen } from './screens/transactions/TransactionManagementScreen';
import { Text } from "react-native";
import { useAppSelector } from "./store";
import { useFlat } from "./features/hooks";
import { ManageTasksScreen } from "./screens/tasks/ManageTasksScreen";
import { ManageUsersScreen } from "./screens/main/ManageUsersScreen";
import { DebtScreen } from "./screens/transactions/DebtScreen";
import styles from "./static/styles";


const userSettings = require("./static/userGear.svg") as string;

const LoggedStack = createStackNavigator();

export function LoggedNavigator({ navigation }) {
    const username = useAppSelector((state) => state.auth.user?.username);

    const { flatId, flat } = useFlat();

    React.useEffect(() => {
        if (!flatId) {
            navigation.navigate("ManageFlatsScreen");
        }
    }, []);

    return (<LoggedStack.Navigator
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'black', height: 75 },
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('ManageAccountScreen')}
                    style={styles.columnView}
                >
                    <Text style={{ color: "white" }}> {username} </Text>
                    <img src={userSettings} alt="open settings" style={{ width: '35px', height: '35px' }} />
                </TouchableOpacity>

            ),
            animationEnabled: true,
        }}>
        <LoggedStack.Screen name="DashboardScreen" options={{
            title: 'Dashboard'
        }}>
            {props => <DashboardScreen {...props} />}
        </LoggedStack.Screen>

        <LoggedStack.Screen name="ManageFlatsScreen" options={{
            title: 'Manage flats'
        }}>
            {props => <ManageFlatsScreen {...props} />}
        </LoggedStack.Screen>

        <LoggedStack.Screen name="ViewCalendarScreen" options={{
            title: 'Calendar'
        }}>
            {() => <ViewCalendarScreen />}
        </LoggedStack.Screen>
        <LoggedStack.Screen name="TransactionManagementScreen" options={{
            title: 'Transaction Management'
        }}>
            {(props) => <TransactionManagementScreen {...props} />}
        </LoggedStack.Screen>
        <LoggedStack.Screen name="ManageTasksScreen" options={{
            title: 'Tasks'
        }}>
            {props => <ManageTasksScreen {...props} />}
        </LoggedStack.Screen>
        <LoggedStack.Screen name="ManageUsersScreen" options={{
            title: 'Users'
        }}>
            {props => <ManageUsersScreen {...props} />}
        </LoggedStack.Screen>
        <LoggedStack.Screen name="ManageAccountScreen" options={{
            title: 'Manage account'
        }}>
            {props => <ManageAccountScreen {...props} />}
        </LoggedStack.Screen>

        <LoggedStack.Screen name="DebtScreen" options={{
            title: 'Debt'
        }}>
            {props => <DebtScreen {...props} />}
        </LoggedStack.Screen>

        <LoggedStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
            title: 'Change Password'
        }} />
        </LoggedStack.Navigator>

        
    
    )
}