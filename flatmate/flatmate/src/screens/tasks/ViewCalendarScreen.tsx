import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Calendar} from 'react-native-big-calendar';
import {TaskDetailsModal} from "../../components/tasks/TaskDetailsModal";
import {useAppDispatch} from "../../store";
import {flatApi, useGetFlatScheduleQuery} from '../../features/api/flat-api';
import {useFlat} from '../../features/hooks';
import TaskEvent from '../../models/event.model';
import {scheduleToEvents, taskInstanceToFrontendState} from '../../helpers/task-helper';
import styles from "../../static/styles";
import {TaskFrontendState} from "../../models/task.model";
import format from 'date-fns/format';


export function ViewCalendarScreen() {
    const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };

    const { flatId, flatTasks } = useFlat();
    const dispatch = useAppDispatch();
    const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
    const [currentDateStr, setCurrentDateStr] = useState("");

    useEffect(() => {
        dispatch(flatApi.util.invalidateTags(['flatTasks']));
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
        let taskFrontendState:TaskFrontendState = taskInstanceToFrontendState(event.instance)

        switch(taskFrontendState){
            case TaskFrontendState.COMPLETED:
                style = styles.eventCompleted;
                break;
            case TaskFrontendState.FAILED:
                style = styles.eventFail;
                break;
            case TaskFrontendState.FUTURE:
                style = styles.eventFuture;
                break;
            case TaskFrontendState.PENDING:
                style = styles.eventPending
                break;
        }

        return <Button
            buttonStyle={style}
            title={event.title}
            titleStyle={{ fontWeight: '700', fontSize: 11}}
            onPress={() => eventClicked(event)}
        />
    }

    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [activeTaskInstance, setActiveTaskInstance] = useState({instance: null, taskId: null});

    return (
        <View style={{
            overflow: "scroll",
            height: "calc(100vh - 75px)",
        }}>
            <Text style={styles.bigTextCenter}>{currentDateStr}</Text>
            <Calendar
                events={getCalendar()}
                onChangeDate={(date) => setCurrentDateStr(format(date[0], "MMMM yyyy"))}
                height={510}
                mode={'month'}
                showTime={false}
                swipeEnabled={true}
                showAllDayEventCell={true}
                onPressEvent={
                    event => eventClicked(event)
                }
                renderEvent={doRenderEvent}
            />
            {showTaskDetailsModal ? (<TaskDetailsModal
                setShow={setShowTaskDetailsModal}
                taskId={activeTaskInstance.taskId}
                taskInstance={activeTaskInstance.instance}
            />) : null}
        </View>
    );
}