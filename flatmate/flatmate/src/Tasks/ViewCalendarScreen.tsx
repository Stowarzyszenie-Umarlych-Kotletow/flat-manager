import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {Calendar} from 'react-native-big-calendar';
import {TaskDetailsModal} from "./TaskDetailsModal";
import {useAppDispatch} from "../store";
import {flatApi, useGetFlatScheduleQuery} from '../features/api/flat-api';
import {useFlat} from '../features/hooks';
import TaskEvent from './event.model';
import {scheduleToEvents} from './helpers';
import {TaskState} from '../models/task.model'
import styles from "../static/styles";


export function ViewCalendarScreen() {
    //TODO: choose query range
    const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };
    
    const { flatId, flatTasks } = useFlat();
    const dispatch = useAppDispatch();
    const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
    

    useEffect(() => {
        dispatch(flatApi.util.invalidateTags([{type: 'flatTasks', id: flatId}]));
    }, []);

    const getTaskName = (taskId: string) => {
        for (let task of flatTasks) {
            if (taskId === task.id) {
                return task.name;
            }
        }
        return "Unknown task";
    }

    function getCalendar() {
        return scheduleToEvents(taskSchedule?.taskInstances, getTaskName);
    }

    function eventClicked(event) {
        setActiveTaskInstance({instance: event.instance, taskId: event.taskId});
        setShowTaskDetailsModal(true)
    }

    function doRenderEvent(event: TaskEvent, props) {
        let style = {}
        if (event.isCompleted) {
            if (event.instance.state == TaskState.PAST){
                style = styles.eventCompleted;
            }
            else {
                style = styles.eventFail;
            }
        }
        else { // not completed
            if(event.instance.state == TaskState.SCHEDULED) {
                style = styles.eventPending
            }
            else if (event.instance.state == TaskState.FUTURE) {
                style = styles.eventFuture
            }
            else if (event.instance.state == TaskState.PAST) {
                style = styles.eventCompleted
            }
        }

        return <Button
            buttonStyle={style}
            title={event.title}
            onPress={() => eventClicked(event)}
            // props={props}
        />
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