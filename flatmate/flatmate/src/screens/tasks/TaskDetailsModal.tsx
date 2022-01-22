import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import { ScrollView, Text } from "react-native";
import styles from "../../static/styles";
import { Button } from "react-native-elements";
import * as React from "react";
import { useFlat } from "../../features/hooks";
import { useGetFlatTaskQuery, useSetFlatTaskCompletedMutation } from "../../features/api/flat-api";
import { asDate } from "../../helpers/date-helper";
import { TaskInstanceInfo, TaskState } from "../../models/task.model";
import {TaskFrontendState, taskInstanceToFrontendState} from "../../helpers/task-helper";

export function TaskDetailsModal({ setShow, taskId, taskInstance, deletable = false }:
                                     { setShow: any, taskInstance: TaskInstanceInfo, taskId: string, deletable: boolean }) {

    const { flatId, flatUsers } = useFlat();

    const { isLoading, currentData: task = null } = useGetFlatTaskQuery({ flatId, taskId });
    const [setTaskCompleted] = useSetFlatTaskCompletedMutation();


    function getUsername(userId: string): string {
        for (const user of flatUsers) {
            if(userId == user.id) 
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
        timeStr = timeStr.slice(0, -10);  // with hour - -3
        return timeStr;
    }

    if (isLoading || !task) return null;

    return (
        <Modal
            width={0.9}
            height={0.95}
            rounded
            actionsBordered
            style={{ zIndex: 1000 }}
            visible={true}
            modalTitle={<ModalTitle title={task?.name} align="left" />}
            onTouchOutside={() => { setShow(false); }}
        >
            <ScrollView>
            <ModalContent>
                <Text style={styles.tinyTextCenter}>{task.name}</Text>
                <Text style={styles.smallText}>{sliceDate(taskInstance.date)}</Text>
                <Text style={styles.tinyTextCenter}>Scheduled to: {getUsername(taskInstance.userId)} </Text>
                {taskInstance.completedByUserId ? (
                <Text style={styles.tinyTextCenter}>Completed by: {getUsername(taskInstance.completedByUserId)}</Text>
                ): null}
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
                        buttonStyle={styles.redButton}
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
		</ScrollView>
    </Modal>

    )
}


