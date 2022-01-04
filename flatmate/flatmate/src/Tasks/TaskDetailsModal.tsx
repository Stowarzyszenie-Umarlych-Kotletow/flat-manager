import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {Text} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";

export function TaskDetailsModal({show, setShow, taskData, deletable= true}) {
    function completeTask(task_id) {
        // backend connection
        // set task as complete in backend
    }

    function deleteTask(task_id) {
        // backend connection
        // delete task from backend
    }

    function sliceData(time) {
        if (time==undefined) {return " ";}
        time = time.toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })
        time = time.slice(0, -3);
        return time.toString();
    }

    return (
        <Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000}}
            visible={show}
            modalTitle={ <ModalTitle title={taskData.title} align="left" /> }
            onTouchOutside={() => { setShow(false);}}
        >
            <ModalContent>
                <Text style={styles.tinyText}>User assigned to task at {sliceData(taskData.start)} by {taskData._assignee}</Text>
                <Text style={styles.tinyText}>Task </Text>
                <Text style={styles.smallText}>Users in periodic task {taskData.title}:</Text>
                
                <Button
                    buttonStyle={styles.greenButton}
                    title="Set as Completed"
                    onPress={() => {
                        completeTask(taskData._id);
                        setShow(false);
                    }}
                />
                {
                    deletable==true
                    &&
                    <Button
                    buttonStyle={styles.warnButton}
                    title="Delete task"
                    onPress={() => {
                        deleteTask(taskData._id);
                        setShow(false);
                    }}
                    />
                }

                <Button
                    buttonStyle={styles.blueButton}
                    title="Back"
                    onPress={() => { setShow(false); }}
                />
            </ModalContent>
        </Modal>

    )
}


