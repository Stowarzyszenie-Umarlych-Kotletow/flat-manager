import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {TaskDetailsModal} from "./TaskDetailsModal";
import { useAppDispatch, useFlatContext, useAppSelector } from "../store";

import taskService from "../services/task.service";


export function ViewCalendarScreen() {
           

    const tasks = useAppSelector(state => state.flat.tasks);
    const selectedFlatId = useAppSelector(state => state.flat.selectedFlatId);

  

   async function convertTasks () {
        var date = await taskService.getFlatSchedule(selectedFlatId, {from: new Date('December 17, 1995 03:24:00'), until: new Date('December 17, 2095 03:24:00')});
     
        var events = [];
        var tast_vars = date.data.taskInstances;
        Object.values(tast_vars).map(task_var => { 
            Object.values(task_var).map(task => {

            var name = "";
            Object.values(tasks).map(tasker => {
                if(tasker.id == task.id){ name = tasker.name}
            })
            events.push({
                title: name,
                _id: task.id,
                _assignee: task.userId,
                _deadline: task.date,
                start: task.date,
                end: task.date,
            }) 
            }); 
            
        });
        return events;
    };

    console.log(convertTasks().then(eventer => {return eventer}));
    function eventClicked(event) {
        setTaskState(event)
        setShowTaskDetailsModal(true)
    }

    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [taskState, setTaskState] = useState({});

    return (
        <View style={{
            overflow: "scroll",
            height: "calc(100vh - 75px)",
        }}>
            <Calendar
                events={[]}
                height={510}
                mode={'month'}
                showTime={true}
                swipeEnabled={true}
                showAllDayEventCell={false}
                onPressEvent={
                    event => eventClicked(event)
                }
            />
            <TaskDetailsModal
                show={showTaskDetailsModal}
                setShow={setShowTaskDetailsModal}
                taskData={taskState}
            />
        </View>
    );
}