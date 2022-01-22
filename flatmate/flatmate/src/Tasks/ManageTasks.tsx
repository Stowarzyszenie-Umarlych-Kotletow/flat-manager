import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { AddTaskModal } from './AddTaskModal';
import { useGetFlatScheduleQuery } from "../features/api/flat-api";
import { scheduleToEvents } from "./helpers";
import { useFlat } from "../features/hooks";
import { TaskState } from "../models/task.model";
import { BottomNavigationBar } from "../common/BottomNavigationBar";



const taskDeleteIcon = require("../static/taskDelete.svg") as string;
const stopIcon = require("../static/stop.svg") as string;

export function ManageTasks({navigation}) {

  const [showTaskCreationModal, setShowTaskCreationModal] = useState(false);
  const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };
  const { flat, flatId, flatTasks } = useFlat();
  const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});
  const getTaskName = (taskId: string) => {
    for (let task of flatTasks) { if (taskId === task.id) { return task.name; } }
    return "Unknown task";
  }

  function deleteTask(taskId) {
    // TODO: backend connection delete Task
  }

  function toggleTask(taskId) {
    // TODO: backend connection toggle task state
  }

  return(
    <View style={styles.container1Navbar}>
      <Text style={styles.logoText}> Tasks </Text>
      <Button
          buttonStyle={styles.greenButton}
          title="Create task"
          onPress={() => setShowTaskCreationModal(true)}
      />
      <ScrollView style={styles.container2Navbars} >  
        {flatTasks.map((task) => {
        return (
          <View
            style={styles.card}
            key={task.id}
          >
            <View style={styles.viewRow}>
              <Text style={styles.cardTitle}>{task.name}</Text>
              <View style={styles.viewRow}>
                <TouchableOpacity 
                  onPress={() => {toggleTask(task.id);}}
                >
                  <img src={stopIcon} alt="taskDeleteIcon" style={{width: '20px', height: '20px'}}/> 
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {deleteTask(task.id);}}
                  style={{marginStart: 10}}
                >
                  <img src={taskDeleteIcon} alt="taskDeleteIcon" style={{width: '20px', height: '20px'}}/> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );})}
      </ScrollView>
      {showTaskCreationModal ? (<AddTaskModal
        setShowTaskCreationModal={setShowTaskCreationModal}
      />): null}
		  <BottomNavigationBar navigation={navigation} />
    </View>
  );
}

