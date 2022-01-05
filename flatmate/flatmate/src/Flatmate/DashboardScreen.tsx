import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {AddTaskModal} from '../Tasks/AddTaskModal';
import {AddUserToFlatModal} from './AddUserToFlatModal';
import {BottomNavigationBar} from './BottomNavigationBar';
import {TaskDetailsModal} from "../Tasks/TaskDetailsModal";
import { useAppDispatch, useFlatContext } from "../store";

export function DashboardScreen({navigation}) {
    // adding user
    const [showAddUserToFlatModal, setShowAddUserToFlatModal] = useState(false);

    // adding task
    const [showTaskCreationModal, setShowTaskCreationModal] = useState(false);

    // task details
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);

    // event state
    const [taskState, setTaskState] = useState({});

    const flatContext = useFlatContext();
    const dispatch = useAppDispatch();

    // todays tasks that are assigned to you
    // all tasks that are not marked as completed or failed
    // (failed means nobody marked them as completed before the deadline)

    function getTasks() {
        const dailyTasks = [{
            _id: "task1ID",
            _assignee: "Kuba",
            title: "Wyrzucanie smieci",
            start: new Date(2022, 0, 14),
            _deadline: new Date(2022, 0, 14)
        }, {
            _id: "task2ID",
            _assignee: "Kuba",
            title: "Jedzenie grzybow",
            start: new Date(2022, 0, 14),
            _deadline: new Date(2022, 0, 12)
        }, {
            _id: "task3ID",
            _assignee: "Kuba",
            title: "Robienie ciasta",
            start: new Date(2022, 0, 14),
            _deadline: new Date(2022, 0, 14)
        },];
        // backend connection
        // get tasks for flat from backend
        return dailyTasks;
    }

    return (<View style={{maxHeight: 'calc(100vh - 75px)'}}>
        <div style={{overflow: "scroll", height: 'calc(100vh - 150px)', display: "flex", flexDirection: "column"}}>
            <Text style={styles.logoText}>{flatContext?.name}</Text>
            <Text style={styles.smallText}>Your debts: 10 zł</Text>
            <Text style={styles.smallText}>Your tasks for today:</Text>

            {getTasks().map((dailyTask) => {
                return (
                <Button
                    buttonStyle={styles.blueButton}
                    title={dailyTask.title}
                    key={dailyTask._id}
                    onPress={()=>{
                        setTaskState(dailyTask);
                        setShowTaskDetailsModal(true);
                    }}
                />
                );
            })}
            <AddTaskModal
                showTaskCreationModal={showTaskCreationModal}
                setShowTaskCreationModal={setShowTaskCreationModal}
            />
            {showAddUserToFlatModal ? (<AddUserToFlatModal
                setShowAddUserToFlatModal={setShowAddUserToFlatModal}
            />) : null}
            <TaskDetailsModal
                show={showTaskDetailsModal}
                setShow={setShowTaskDetailsModal}
                taskData={taskState}
                deletable={false}
            />
        </div>
        <BottomNavigationBar
            openUserAdd={() => { setShowAddUserToFlatModal(true); }}
            openTaskAdd={() => { setShowTaskCreationModal(true); }}
            openCalendar={() => { navigation.navigate('ViewCalendarScreen'); }}
        />
    </View>)
}