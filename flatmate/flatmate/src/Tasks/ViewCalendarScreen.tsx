import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { TaskDetailsModal } from "./TaskDetailsModal";
import { useAppDispatch, useAppSelector } from "../store";
import { flatApi, useGetFlatScheduleQuery } from '../features/api/flat-api';
import { useFlat } from '../features/hooks';
import { asDate, handleDates, withDates } from '../helpers/date-helper';
import TaskEvent from './event.model';



export function ViewCalendarScreen() {
    let query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };
    const { flatId, flatTasks } = useFlat();
    const dispatch = useAppDispatch();
    const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
    

    useEffect(() => {
        dispatch(flatApi.util.invalidateTags([{type: 'flatTasks', id: flatId}]));
    }, []);

    const getTaskName = (taskId: string) => {
        console.log(flatTasks);
        for (let task of flatTasks) {
            if (taskId === task.id) {
                return task.name;
            }
        }
        return "Unknown task";
    }

    function getCalendar() {
        if (!taskSchedule) {
            return;
        }
        const events = [];
        const schedule = taskSchedule.taskInstances;
        for (let [taskId, taskInstances] of Object.entries(schedule)) {
            Object.values(taskInstances).map(instance => {
                const name = getTaskName(taskId);
                console.log(instance);
                events.push({
                    title: name,
                    taskId: taskId,
                    instance: instance,
                    isCompleted: !!instance.completedByUserId,
                    state: instance.state,
                    start: asDate(instance.date),
                    end: asDate(instance.date),
                });
            });
        }
        return events;
    };


    function eventClicked(event) {
        setActiveTaskInstance({instance: event.instance, taskId: event.taskId});
        setShowTaskDetailsModal(true)
    }

    function doRenderEvent(event: TaskEvent, props) {
        return <div>{event.title}</div>
    }

    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [activeTaskInstance, setActiveTaskInstance] = useState({instance: null, taskId: null});

    return (
        <View style={{
            overflow: "scroll",
            height: "calc(100vh - 75px)",
        }}>
            <Calendar
                events={getCalendar()}
                height={510}
                mode={'month'}
                showTime={true}
                swipeEnabled={true}
                showAllDayEventCell={false}
                onPressEvent={
                    event => eventClicked(event)
                }
                renderEvent={doRenderEvent}
            />
            {showTaskDetailsModal ? (<TaskDetailsModal
                setShow={setShowTaskDetailsModal}
                taskId={activeTaskInstance.taskId}
                taskInstance={activeTaskInstance.instance}
                deletable={false}
            
            />) : null}
        </View>
    );
}