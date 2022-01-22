import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import styles from "../static/styles";

const calendarIcon = require("../static/calendar.svg") as string;
const usersIcon = require("../static/users.svg") as string;
const gearIcon = require("../static/gear.svg") as string;
const billIcon = require("../static/bill.svg") as string;
const dashboardIcon = require("../static/dashboard.svg") as string;
const tasksIcon = require("../static/tasks.svg") as string;


export function BottomNavigationBar({navigation}) {
    return (
        <footer style={{
            position: "fixed",
            backgroundColor: '#3333ff',
            display: "flex",
            bottom: '0',
            left: '0',
            width: '100%',
            justifyContent: "space-around",
            alignItems: "center",
            height: '75px',
            zIndex: 100
        }}>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Tasks'); }}
                style={styles.columnView}
            >
                <img src={tasksIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Tasks </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('TransactionManagementView'); }}
                style={styles.columnView}
            >
                <img src={billIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Transactions </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('DashboardScreen'); }}
                style={styles.columnView}
            >
                <img src={dashboardIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Users'); }}
                style={styles.columnView}
            >
                <img src={usersIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Flatmates </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('ViewCalendarScreen'); }}
                style={styles.columnView}
            >
                <img src={calendarIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Calendar </Text>
            </TouchableOpacity>
            


            {/* <TouchableOpacity
                onPress={() => {console.log("flat settings")}}
                style={styles.columnView}
            >
                <img src={gearIcon} alt="open settings" style={{width: '35px', height: '35px'}}/>
                <Text> Flat Settings</Text>
            </TouchableOpacity> */}

            
        </footer>
    )
}