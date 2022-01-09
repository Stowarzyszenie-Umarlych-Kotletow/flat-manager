import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { AddTaskModal } from '../Tasks/AddTaskModal';
import { AddUserToFlatModal } from './AddUserToFlatModal';
import { BottomNavigationBar } from './BottomNavigationBar';
import { TaskDetailsModal } from "../Tasks/TaskDetailsModal";
import { useAppDispatch, useAppSelector } from "../store";
import { useFlat } from "../features/hooks";
import { useGetFlatScheduleQuery } from "../features/api/flat-api";
import { scheduleToEvents } from "../Tasks/helpers";
import TaskEvent from "../Tasks/event.model";
import { TaskState } from "../models/task.model";

export function DashboardScreen({ navigation }) {
    //TODO: choose query range
    const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };

    // adding user
    const [showAddUserToFlatModal, setShowAddUserToFlatModal] = useState(false);
    const [showTaskCreationModal, setShowTaskCreationModal] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [taskState, setTaskState] = useState<TaskEvent>(null);


    const { flat, flatId, flatTasks } = useFlat();
    const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
    
    const getTaskName = (taskId: string) => {
        for (let task of flatTasks) {
            if (taskId === task.id) {
                return task.name;
            }
        }
        return "Unknown task";
    }

    // todays tasks that are assigned to you
    // all tasks that are not marked as completed or failed
    // (failed means nobody marked them as completed before the deadline)

    const events = scheduleToEvents(taskSchedule?.taskInstances, getTaskName).filter(
        event => event.state == TaskState.SCHEDULED
    );

    return (<View style={{ maxHeight: 'calc(100vh - 75px)' }}>
        <div style={{ overflow: "scroll", height: 'calc(100vh - 150px)', display: "flex", flexDirection: "column" }}>
            <Text style={styles.logoText}>{flat?.name}</Text>
            <Text style={styles.smallText}>Your debts: 10 zł</Text>
            <Text style={styles.smallText}>Your tasks for today:</Text>

            {events.map((dailyTask) => {
                return (
                    <Button
                        buttonStyle={styles.blueButton}
                        title={dailyTask.title}
                        key={dailyTask.instance.id}
                        onPress={() => {
                            setTaskState(dailyTask);
                            setShowTaskDetailsModal(true);
                        }}
                    />
                );
            })}
            {showTaskCreationModal ? (<AddTaskModal
                setShowTaskCreationModal={setShowTaskCreationModal}
            />): null}
            {showAddUserToFlatModal ? (<AddUserToFlatModal
                setShowAddUserToFlatModal={setShowAddUserToFlatModal}
            />) : null}
            {showTaskDetailsModal ? (<TaskDetailsModal
                setShow={setShowTaskDetailsModal}
                taskId={taskState.taskId}
                taskInstance={taskState.instance}
                deletable={false}
            />) : null}
        </div>
        <BottomNavigationBar
            openUserAdd={() => { setShowAddUserToFlatModal(true); }}
            openTaskAdd={() => { setShowTaskCreationModal(true); }}
            openCalendar={() => { navigation.navigate('ViewCalendarScreen'); }}
        />
    </View>)
}