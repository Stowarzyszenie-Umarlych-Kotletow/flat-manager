import * as React from "react";
import { useState } from "react";
import styles from "../../static/styles";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { AddTaskModal } from '../../components/tasks/AddTaskModal';
import { useGetFlatScheduleQuery, useDeleteFlatTaskMutation } from "../../features/api/flat-api";
import { useFlat } from "../../features/hooks";
import { BottomNavigationBar } from "../../components/main/BottomNavigationBar";
import {showMessage} from "react-native-flash-message";




const taskDeleteIcon = require("../../static/taskDelete.svg") as string;
const stopIcon = require("../../static/stop.svg") as string;

export function ManageTasksScreen({navigation}) {

  const [showTaskCreationModal, setShowTaskCreationModal] = useState(false);
  const query = { from: new Date('December 17, 1995 03:24:00').toISOString(), until: new Date('December 17, 2095 03:24:00').toISOString() };
  const { flat, flatId, flatTasks } = useFlat();
  const { isLoading, currentData: taskSchedule} = useGetFlatScheduleQuery({ flatId, data: query }, {refetchOnMountOrArgChange: true});


  const [deleteTask, {isError, status}] = useDeleteFlatTaskMutation();
  const currentDate = new Date(Date.now());

  function handleDeleteTask(taskId:string) {

    deleteTask({flatId, taskId}).unwrap()
      .then(
        ()=>{
          showMessage({
            message: "Task deleted",
            type: "success"
          })
          return false;
        },
        ()=>{
          showMessage({
            message: "Error deleting task",
            type: "danger"
          })
          return false;
        }
      )
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
        {Object.values(flatTasks).map((task) => {
        return (
          <View
            style={styles.card}
            key={task.id}
          >
            <View style={styles.viewRow}>
              <Text style={styles.cardTitle}>{task.name}</Text>
              <View style={styles.viewRow}>
                <TouchableOpacity 
                  onPress={() => {handleDeleteTask(task.id);}}
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

