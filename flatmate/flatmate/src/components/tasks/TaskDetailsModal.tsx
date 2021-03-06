import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import { ScrollView, Text } from "react-native";
import styles from "../../static/styles";
import { Button } from "react-native-elements";
import * as React from "react";
import { useAuth, useFlat } from "../../features/hooks";
import { useGetFlatTaskQuery, useSetFlatTaskCompletedMutation } from "../../features/api/flat-api";
import { formatDate } from "../../helpers/date-helper";
import { TaskInstanceInfo, TaskState } from "../../models/task.model";
import { showMessage } from "react-native-flash-message";


export function TaskDetailsModal({ setShow, taskId, taskInstance }:
  { setShow: any, taskInstance: TaskInstanceInfo, taskId: string }) {

  const { flatId, flatUsers } = useFlat();
  const { user } = useAuth();

  const { isLoading, currentData: task = null } = useGetFlatTaskQuery({ flatId, taskId });

  const [setTaskCompleted] = useSetFlatTaskCompletedMutation();


  function getUsername(userId: string): string {
    for (let user of flatUsers) {
      if (userId == user.id)
        return user.username;
    }
    return "Unknown user";
  }

  function canCompleteTask(): boolean {
    return taskInstance.state == TaskState.SCHEDULED && !taskInstance.completedByUserId
      && Object.keys(task?.userDoneCounter ?? {}).indexOf(user.id) > -1;
  }

  async function completeTask() {
    setTaskCompleted({ flatId, taskId, taskInstanceId: taskInstance.id }).unwrap()
      .then(
        () => {
          setShow(false)
          showMessage({
            message: "Task completed",
            type: "success"
          })
        },
        () => {
          showMessage({
            message: "Could not complete task",
            type: "danger"
          })
        }
      );
  }

  if (isLoading || !task) return null;

  return (
    <Modal
      width={0.9}
      rounded
      actionsBordered
      style={{ zIndex: 1000 }}
      visible={true}
      modalTitle={<ModalTitle title={task?.name} align="left" />}
      onTouchOutside={() => {
        setShow(false);
      }}
    >
      <ScrollView>
        <ModalContent>
          <Text style={styles.bigTextCenter}>{task.name}</Text>
          <Text style={styles.smallTextCenter}>{formatDate(taskInstance.date)}</Text>
          <Text style={styles.tinyTextCenter}>Scheduled to: {getUsername(taskInstance.userId)} </Text>
          {taskInstance.completedByUserId ? (
            <Text style={styles.tinyTextCenter}>Completed by: {getUsername(taskInstance.completedByUserId)}</Text>
          ) : null}
          <Text style={styles.smallText}>Users in periodic task {task.name}:</Text>
          <ul>
            {Object.keys(task.userDoneCounter).map(userId => {
              return <li key={userId}>{getUsername(userId)}</li>
            })}
          </ul>

          {
            canCompleteTask() ? (<Button
              buttonStyle={styles.greenButton}
              title="Set as Completed"
              onPress={() => {
                completeTask();
              }}
            />) : null
          }

          <Button
            buttonStyle={styles.orangeButton}
            title="Back"
            onPress={() => {
              setShow(false);
            }}
          />
        </ModalContent>
      </ScrollView>
    </Modal>

  )
}


