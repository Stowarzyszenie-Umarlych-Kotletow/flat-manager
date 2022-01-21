import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { Text, View, Switch, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { AddTaskModal } from './AddTaskModal';
import { BottomNavigationBar } from '../common/BottomNavigationBar';
import { useGetFlatScheduleQuery } from "../features/api/flat-api";
import { scheduleToEvents } from "./helpers";
import { useFlat } from "../features/hooks";
import { TaskState } from "../models/task.model";


export function ManageTasks({navigation}) {

  const [showTaskCreationModal, setShowTaskCreationModal] = useState(false);
  const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };
  const { flat, flatId, flatTasks } = useFlat();
  const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
  const getTaskName = (taskId: string) => {
    for (let task of flatTasks) { if (taskId === task.id) { return task.name; } }
    return "Unknown task";
  }

  // TODO: backend get tasks, currently getting task instances
  const events = scheduleToEvents(taskSchedule?.taskInstances, getTaskName).filter(
    event => event.state == TaskState.SCHEDULED
  );

  function deleteTask(id) {
    // TODO: backend connection delete Task
  }

  function toggleTask(id) {
    // TODO: backend connection toggle task state
    setR(!r)

  }

  // TODO: remove this switch mock 1
  const [r, setR] = useState(false);


  return(
    <View style={{ maxHeight: 'calc(100vh - 75px)' }}>
      <div style={{ overflowY: "scroll", height: 'calc(100vh - 150px)', display: "flex", flexDirection: "column" }}>
        <Text style={styles.logoText}> Tasks </Text>
        <Button
            buttonStyle={styles.greenButton}
            title="Create task"
            onPress={() => setShowTaskCreationModal(true)}
        />
        {events.map((dailyTask) => {
          return (
            <View
              style={styles.taskCard}
              key={dailyTask.instance.id}
            >
              <View style={styles.viewRow}>
                <Text style={styles.taskCardTitle}>{dailyTask.title}</Text>
                <View style={styles.viewRow}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={r ? "#f5dd4b" : "#f4f3f4"} // TODO: remove this switch mock 2
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {toggleTask(dailyTask.instance.id)}}
                    value={r} // TODO: remove this switch mock 3
                  />
                  <TouchableOpacity 
                    onPress={() => {deleteTask(dailyTask.instance.id);}}
                  >
                    <Text style={styles.taskCardTitle}>❌</Text> 
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </div>

      {showTaskCreationModal ? (<AddTaskModal
        setShowTaskCreationModal={setShowTaskCreationModal}
      />): null}

      <BottomNavigationBar
        openUsers={() => { navigation.navigate('Users'); }}
        openTasks={() => { navigation.navigate('Tasks'); }}
        openCalendar={() => { navigation.navigate('ViewCalendarScreen'); }}
        openTransactionManager={() => {navigation.navigate('TransactionManagementView')}}
        openDashboard={()=>{navigation.navigate('DashboardScreen')}}
      />
    </View>
  );
}

