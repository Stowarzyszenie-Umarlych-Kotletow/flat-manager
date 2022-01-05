import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {AddTaskModal} from '../Tasks/AddTaskModal';
import {AddUserToFlatModal} from './AddUserToFlatModal';
import {BottomNavigationBar} from './BottomNavigationBar';
import {TaskDetailsModal} from "../Tasks/TaskDetailsModal";
import { useAppDispatch, useFlatContext, useAppSelector } from "../store";
import { getFlatTasks } from "../features/flat";

export function DashboardScreen({navigation}) {
    // adding user
    const [showAddUserToFlatModal, setShowAddUserToFlatModal] = useState(false);
    const [showTaskCreationModal, setShowTaskCreationModal] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [taskState, setTaskState] = useState({});

    
    const flatContext = useFlatContext();
    const tasks = useAppSelector(state => state.flat.tasks);
    const dispatch = useAppDispatch();

    // todays tasks that are assigned to you
    // all tasks that are not marked as completed or failed
    // (failed means nobody marked them as completed before the deadline)

    React.useEffect(() => {
        dispatch(getFlatTasks(flatContext?.id));
    }, []);

    return (<View style={{maxHeight: 'calc(100vh - 75px)'}}>
        <div style={{overflow: "scroll", height: 'calc(100vh - 150px)', display: "flex", flexDirection: "column"}}>
            <Text style={styles.logoText}>{flatContext?.name}</Text>
            <Text style={styles.smallText}>Your debts: 10 zł</Text>
            <Text style={styles.smallText}>Your tasks for today:</Text>

            {tasks ? Object.values(tasks).map((dailyTask) => {
                return (
                <Button
                    buttonStyle={styles.blueButton}
                    title={dailyTask.name}
                    key={dailyTask.id}
                    onPress={()=>{
                        setTaskState(dailyTask);
                        setShowTaskDetailsModal(true);
                    }}
                />
                );
            }): null }
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