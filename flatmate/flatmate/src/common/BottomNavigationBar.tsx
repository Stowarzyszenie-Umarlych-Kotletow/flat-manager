import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import styles from "../static/styles";

const calendar = require("../static/calendar.svg") as string;
const users = require("../static/users.svg") as string;
const gear = require("../static/gear.svg") as string;
const bill = require("../static/bill.svg") as string;
const dashboard = require("../static/dashboard.svg") as string;
const tasks = require("../static/tasks.svg") as string;


export function BottomNavigationBar({openUsers, openTasks, openCalendar, openTransactionManager, openDashboard}) {
    return (
        <footer style={{
            backgroundColor: '#3333ff',
            display: "flex",
            paddingBlock: '5px',
            bottom: '0',
            left: '0',
            width: '100%',
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: '75px',
        }}>
            <TouchableOpacity
                onPress={() => openTasks()}
                style={styles.columnView}
            >
                <img src={tasks} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Tasks </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {openTransactionManager()}}
                style={styles.columnView}
            >
                <img src={bill} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Transactions </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openDashboard()}
                style={styles.columnView}
            >
                <img src={dashboard} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openUsers()}
                style={styles.columnView}
            >
                <img src={users} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Flatmates </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openCalendar()}
                style={styles.columnView}
            >
                <img src={calendar} alt=" " style={{width: '35px', height: '35px'}}/>
                <Text> Calendar </Text>
            </TouchableOpacity>
            


            {/* <TouchableOpacity
                onPress={() => {console.log("flat settings")}}
                style={styles.columnView}
            >
                <img src={gear} alt="open settings" style={{width: '35px', height: '35px'}}/>
                <Text> Flat Settings</Text>
            </TouchableOpacity> */}

            
        </footer>
    )
}