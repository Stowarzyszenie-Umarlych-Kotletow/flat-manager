import * as React from "react";
import {Text, TouchableOpacity} from "react-native";

const addTask = require("../static/addTask.svg") as string;
const addUser = require("../static/addUser.svg") as string;
const gear = require("../static/gear.svg") as string;


export function BottomNavigationBar({openUserAdd, openTaskAdd, openCalendar}) {
    return (
        <footer style={{
            backgroundColor: '#3333ff',
            display: "flex",
            paddingInline: '10px',
            paddingBlock: '5px',
            bottom: '0',
            left: '0',
            width: '100%',
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: '75px',
        }}>
            <TouchableOpacity
                onPress={() => openTaskAdd()}
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <img src={addTask} alt="add task" style={{width: '35px', height: '35px'}}/>
                <Text>Add task</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openUserAdd()}
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <img src={addUser} alt="add user" style={{width: '35px', height: '35px'}}/>
                <Text>Add user</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openCalendar()}
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <img src={addTask} alt="open calendar" style={{width: '35px', height: '35px'}}/>
                <Text>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {console.log("flat settings")}}
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <img src={gear} alt="open settings" style={{width: '35px', height: '35px'}}/>
                <Text> Settings</Text>
            </TouchableOpacity>

            
        </footer>
    )
}