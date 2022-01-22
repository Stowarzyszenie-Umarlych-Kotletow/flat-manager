import * as React from "react";
import {TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import {ManageFlatsScreen} from './Flatmate/ManageFlatsScreen'
import { ManageScreenModal } from "./Accounts/ManageScreenModal";
import {DashboardScreen} from "./Flatmate/DashboardScreen";
import {ViewCalendarScreen} from "./Tasks/ViewCalendarScreen";
import {ChangePasswordScreen} from "./Accounts/ChangePasswordScreen";
import { TransactionManagementView } from './Transactions/TransactionManagementView';
import {Text} from "react-native";
import {useAppDispatch, useAppSelector} from "./store";
import { useFlat } from "./features/hooks";
import { ManageTasks } from "./Tasks/ManageTasks";
import { ManageUsers } from "./Flatmate/ManageUsers";
import styles from "./static/styles";

const userSettings = require("./static/userGear.svg") as string;

const LoggedStack = createStackNavigator();

export function LoggedNavigator({navigation}) {
  const username = useAppSelector((state) => state.auth.user?.username);
  
  const {flatId, flat} = useFlat();
  const dispatch = useAppDispatch();


  return (
  <LoggedStack.Navigator
    screenOptions={{
      headerMode: 'screen',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: 'black', height: 75},
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ManageScreen')}
          style={styles.columnView}
        >
        <Text style={{color: "white"}}> {username} </Text>
        <img src={userSettings} alt="open settings" style={{width: '35px', height: '35px'}}/>
      </TouchableOpacity>

      ),
      animationEnabled: true,
  }}
	>
    {flat == null ? (<LoggedStack.Screen name="FirstManageFlatsScreen" options={{
      title: 'Manage flats'
    }}>
      {props => <ManageFlatsScreen {...props}/>}
    </LoggedStack.Screen>) : (<>
      <LoggedStack.Screen name="DashboardScreen" options={{
        title: 'Dashboard'
      }}>
        {props => <DashboardScreen {...props}/>}
      </LoggedStack.Screen>

      <LoggedStack.Screen name="ManageFlatsScreen" options={{
        title: 'Manage flats'
      }}>
        {props => <ManageFlatsScreen {...props}/>}
      </LoggedStack.Screen>

      <LoggedStack.Screen name="ViewCalendarScreen" options={{
        title: 'Calendar'
      }}>
        {() => <ViewCalendarScreen />}
      </LoggedStack.Screen>
      <LoggedStack.Screen name="TransactionManagementView" options={{
        title: 'Transaction Management'
      }}>
        {(props) => <TransactionManagementView {...props} />}
      </LoggedStack.Screen>
      <LoggedStack.Screen name="Tasks" options={{
        title: 'Tasks'
      }}>
        {props => <ManageTasks {...props} />}
      </LoggedStack.Screen>
      <LoggedStack.Screen name="Users" options={{
        title: 'Users'
      }}>
        {props => <ManageUsers {...props} />}
      </LoggedStack.Screen>
    </>)}


    <LoggedStack.Screen name="ManageScreen" options={{
      title: 'Manage account'
    }}>
      {props => <ManageScreenModal {...props}/>}
    </LoggedStack.Screen>

    <LoggedStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
      title: 'Change Password'
    }}/>
  </LoggedStack.Navigator>)
}