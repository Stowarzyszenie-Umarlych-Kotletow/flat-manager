import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import styles from "../../static/styles";

const calendarIcon = require("../../static/calendar.svg") as string;
const usersIcon = require("../../static/users.svg") as string;
const gearIcon = require("../../static/gear.svg") as string;
const billIcon = require("../../static/bill.svg") as string;
const dashboardIcon = require("../../static/dashboard.svg") as string;
const tasksIcon = require("../../static/tasks.svg") as string;
const dollarIcon = require("../../static/dollar.svg") as string;


export function BottomNavigationBar({navigation}) {
    return (
        <footer style={{
            position: "fixed",
            backgroundColor: '#ffa31a',
            display: "flex",
            bottom: '0',
            left: '0',
            width: '100%',
            justifyContent: "space-evenly",
            paddingInline: "5px",
            alignItems: "center",
            height: '75px',
            zIndex: 100
        }}>
            <TouchableOpacity
                onPress={() => { navigation.popToTop(); navigation.navigate('ViewCalendarScreen'); }}
                style={styles.columnView}
            >
                <img src={calendarIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Calendar </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.popToTop(); navigation.navigate('ManageTasksScreen'); }}
                style={styles.columnView}
            >
                <img src={tasksIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Tasks </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.popToTop();}}
                style={styles.columnView}
            >
                <img src={dashboardIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.popToTop(); navigation.navigate('ManageUsersScreen'); }}
                style={styles.columnView}
            >
                <img src={usersIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Mates </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.popToTop(); navigation.navigate('TransactionManagementScreen'); }}
                style={styles.columnView}
            >
                <img src={billIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Bills </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.popToTop(); navigation.navigate('DebtScreen'); }}
                style={styles.columnView}
            >
                <img src={dollarIcon} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Debts </Text>
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