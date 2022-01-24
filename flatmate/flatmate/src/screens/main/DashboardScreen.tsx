import * as React from "react";
import { useState } from "react";
import styles from "../../static/styles";
import { Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { TaskDetailsModal } from "../../components/tasks/TaskDetailsModal";
import { useFlat } from "../../features/hooks";
import { useGetFlatScheduleQuery } from "../../features/api/flat-api";
import {scheduleToEvents} from "../../helpers/task-helper";
import TaskEvent from "../../models/event.model";
import {TaskFrontendState, TaskState} from "../../models/task.model";
import { BottomNavigationBar } from "../../components/main/BottomNavigationBar";
import { useGetFlatDebtsQuery } from "../../features/api/flat-api";
import { CURRENCY } from "../../config";

export function DashboardScreen({ navigation }) {
  const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };

  // adding user
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [taskState, setTaskState] = useState<TaskEvent>(null);


  const { flat, flatId, flatTasks } = useFlat();
  const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
  const { currentData: myDebt = [] } = useGetFlatDebtsQuery({flatId}, { refetchOnMountOrArgChange: true });
  
  const getTaskName = (taskId: string) => {
    for (let task of flatTasks) {
      if (taskId === task.id) {
        return task.name;
      }
    }
    return "Unknown task";
  }

  function getTotalDebt() {
    let totalDebt = 0;
    for (let debt in myDebt) {
      totalDebt += +myDebt[debt].amount;
    }
    return totalDebt;
  }

  // todays tasks that are assigned to you
  // all tasks that are not marked as completed or failed
  // (failed means nobody marked them as completed before the deadline)

  const events = scheduleToEvents(taskSchedule?.taskInstances, getTaskName).filter(
    event => event.frontendState == TaskFrontendState.PENDING  );

  return (
  <View style={styles.container1Navbar} >
		<Text style={styles.logoText}>{flat?.name}</Text>
		{getTotalDebt() > 0 ? (<Text style={styles.smallTextCenter}>Your total debt: {getTotalDebt().toFixed(2)} {CURRENCY}</Text>) : <Text style={styles.smallTextCenter}>No debts!💵💵💵 </Text>}
		<Text style={styles.smallTextCenter}>Your tasks for today:</Text>
    <ScrollView style={styles.container2Navbars} >
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
    </ScrollView>
    {showTaskDetailsModal ? (<TaskDetailsModal
      setShow={setShowTaskDetailsModal}
      taskId={taskState.taskId}
      taskInstance={taskState.instance}
    />) : null}
	  <BottomNavigationBar navigation={navigation} />
  </View>)
}