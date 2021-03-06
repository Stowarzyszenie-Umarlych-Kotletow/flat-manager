import * as React from "react";
import { useState } from "react";
import styles from "../../static/styles";
import { ScrollView, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { Controller, useForm } from "react-hook-form";
import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import DatePicker from 'react-native-neat-date-picker';
import CustomMultiPicker from "../../../lib/multiple-select";
import { useFlat } from "../../features/hooks";
import { useCreateFlatTaskMutation } from "../../features/api/flat-api";
import {showMessage} from "react-native-flash-message";

export function validateForm(data) {
	if (data.taskName=="") {
		showMessage({
			message: "Task name must not be empty",
			type: "danger"
		})
		return false;
	}
	if (!data.start || !data.end){
		showMessage({
			message: "Task range was not selected",
			type: "danger"
		})
		return false;
	}
	if (data.taskDeadline > data.taskPeriod){
		showMessage({
			message: "Task deadline cannot be bigger than period",
			type: "danger"
		})
		return false;
	}
	return true;
}


export function AddTaskModal({ setShowTaskCreationModal }) {
  // datepicker for task starting and ending day
  const [showTaskDatePicker, setShowTaskDatePicker] = useState(false);

  const { flatId, flat, flatUsers } = useFlat();
  const [createTask] = useCreateFlatTaskMutation();

  const openTaskDatePicker = () => {
    setShowTaskDatePicker(true)
  }
  const onTaskDatePickerCancel = () => {
    setShowTaskDatePicker(false)
  }
  const onTaskDatePickerConfirm = (start, end) => {
    setShowTaskDatePicker(false)
    setValue('start', start);
    setValue('end', end);
  }
  const { control, handleSubmit, setValue, formState: { errors, } } = useForm({
    defaultValues: {
      taskName: '',
      taskPeriod: 1,
      taskDeadline: 1,
      start: new Date(),
      end: null
    }
  });

  const submitTask = async (data: any) => {
    if (!validateForm(data)){

			return;
		}
		if (selectedUsers.length == 0) {
			showMessage({
				message: "No users were assigned to the task",
				type: "danger"
			})
			return;
		}
    const request: CreateTaskRequest = {
      name: data.taskName,
      startDate: data.start,
      endDate: data.end,
      userIds: selectedUsers,
      timeToComplete: data.taskDeadline * 86400 - 1 /* timeToComplete < repeatAfter */,
      repeatAfter: data.taskPeriod * 86400
    };

    await createTask({ flatId, data: request }).unwrap();
    hideTaskCreationModal();
		showMessage({
			message: "Successfully created task",
			type: "success",
			position: "top"
		})
  }

  const hideTaskCreationModal = () => {
    setShowTaskCreationModal(false);
  }

  const [selectedUsers, setSelectedUsers] = useState([]);

  const getUserSelectList = () => {
    let obj = {};
    flatUsers.forEach(u => {
      obj[u.id] = u.username;
    })
    return obj;
  }

  return (
    <Modal
      width={0.9}
      height={0.95}
      rounded
      actionsBordered
      style={{ zIndex: 1000, overflow: "scroll" }}
      visible={true}
      propagateSwipe={true}
      modalTitle={<ModalTitle title="Add task" align="left" />}
      onTouchOutside={() => {
        hideTaskCreationModal()
      }}
    >
		<ScrollView>
		<ModalContent>
			<Text style={styles.tinyTextCenter}>Task Name </Text>
			<Controller
				control={control}
				rules={{
					maxLength: 100,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.textInput}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholder="Task Name"
					/>
				)}
				name="taskName"
			/>

			<Button
				buttonStyle={styles.blueButton}
				title='Choose Task Range'
				onPress={openTaskDatePicker}
			/>
			<DatePicker
				isVisible={showTaskDatePicker}
				mode='range'
				onCancel={onTaskDatePickerCancel}
				onConfirm={onTaskDatePickerConfirm}
			/>

			<Text style={styles.tinyTextCenter}>Task Period (in Days) </Text>
			<Controller
				control={control}
				rules={{
					maxLength: 100,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.textInput}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value.toString()}
						placeholder="Task Period"
						keyboardType="numeric"
					/>
				)}
				name="taskPeriod"
			/>
			<Text style={styles.tinyTextCenter}> Task Deadline (in Days) </Text>
			<Controller
				control={control}
				rules={{
					maxLength: 100,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.textInput}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value.toString()}
						placeholder="Task Deadline"
						keyboardType="numeric"
					/>
				)}
				name="taskDeadline"
			/>
			<Text style={styles.tinyTextCenter}> Assign Users to Task </Text>
			<CustomMultiPicker
				options={getUserSelectList()}
				search={true}
				multiple={true}
				placeholder={"Search"}
				placeholderTextColor={'#757575'}
				returnValue={"value"}
				callback={(res: any[]) => { setSelectedUsers(res.filter(val => !!val)); }}
				rowBackgroundColor={"#eee"}
				rowHeight={40}
				rowRadius={5}
        searchIconColor={"transparent"}
				iconColor={"#00a2dd"}
				iconSize={30}
				selectedIconName={"ios-checkmark-circle-outline"}
				unselectedIconName={"ios-radio-button-off-outline"}
				scrollViewHeight={130}
			/>
			<Button
				buttonStyle={styles.greenButton}
				title="Create Task"
				onPress={handleSubmit(submitTask)}
			/>
			<Button
				buttonStyle={styles.orangeButton}
				title="Close"
				onPress={hideTaskCreationModal}
			/>
		</ModalContent>
		</ScrollView>
    </Modal>
  );
}
