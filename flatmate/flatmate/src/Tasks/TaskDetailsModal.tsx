import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import { Text } from "react-native";
import styles from "../static/styles";
import { Button } from "react-native-elements";
import * as React from "react";
import { useFlat } from "../features/hooks";
import { useGetFlatTaskQuery, useSetFlatTaskCompletedMutation } from "../features/api/flat-api";
import { asDate } from "../helpers/date-helper";
import { TaskInstanceInfo, TaskState } from "../models/task.model";
import {TaskFrontendState, taskInstanceToFrontendState} from "./helpers";

export function TaskDetailsModal({ setShow, taskId, taskInstance, deletable = false }:
                                     { setShow: any, taskInstance: TaskInstanceInfo, taskId: string, deletable: boolean }) {

    const { flatId, flatUsers } = useFlat();

    const { isLoading, currentData: task = null } = useGetFlatTaskQuery({ flatId, taskId });
    const [setTaskCompleted] = useSetFlatTaskCompletedMutation();


    function getUsername(userId: string): string {
        for (let user of flatUsers) {
            return user.username;
        }
        return "Unknown user";
    }

    async function completeTask() {
        // backend connection
        // set task as complete in backend
        await setTaskCompleted({ flatId, taskId, taskInstanceId: taskInstance.id });
    }

    function deleteTask() {
        // TODO
    }

    function sliceDate(time: string) {
        if (time == undefined) { return " "; }
        let timeStr = asDate(time).toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })
        timeStr = timeStr.slice(0, -8);  // with hour - -3
        return timeStr;
    }

    if (isLoading || !task) return null;
    console.log(taskInstance);
    return (
        <Modal
            width={0.9}
            rounded
            actionsBordered
            style={{ zIndex: 1000 }}
            visible={true}
            modalTitle={<ModalTitle title={task?.name} align="left" />}
            onTouchOutside={() => { setShow(false); }}
        >
            <ModalContent>
                <Text style={styles.tinyText}>User assigned to task at {sliceDate(taskInstance.date)} by {getUsername(taskInstance.userId)}</Text>
                <Text style={styles.tinyText}>Task </Text>
                <Text style={styles.smallText}>Users in periodic task {task.name}:</Text>
                <ul>
                    {Object.keys(task.userDoneCounter).map(userId => {
                        return <li>{getUsername(userId)}</li>
                    })}
                </ul>
                {
                    (taskInstance.state == TaskState.SCHEDULED && !taskInstance.completedByUserId) ?
                        <Button
                            buttonStyle={styles.greenButton}
                            title="Set as Completed"
                            onPress={() => {
                                completeTask().then(() => setShow(false));
                            }}
                        /> : null
                }
                {
                    deletable == true
                    &&
                    <Button
                        buttonStyle={styles.warnButton}
                        title="Delete task"
                        onPress={() => {
                            deleteTask();
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


