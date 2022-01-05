import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {TaskDetailsModal} from "./TaskDetailsModal";
import { useAppDispatch, useFlatContext, useAppSelector } from "../store";

import taskService from "../services/task.service";


export function ViewCalendarScreen() {


    const tasks = useAppSelector(state => state.flat.tasks);
    const selectedFlatId = useAppSelector(state => state.flat.selectedFlatId);
    console.log(tasks);

    const convertTasks = () => {
        var events = [];
        Object.values(tasks).map(task => {
            var date = taskService.getFlatSchedule(selectedFlatId, {from: new Date('December 17, 1995 03:24:00'), until: new Date('December 17, 2095 03:24:00')});
            events.push({
                title: task.name,
                _id: task.id,
                _assignee: "-",
                _deadline: new Date(2022, 0, 1),
                start: new Date(2022, 0, 2),
                end: new Date(2022, 0, 3),
            }) 
        });
        return events;
    };


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
                events={convertTasks()}
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