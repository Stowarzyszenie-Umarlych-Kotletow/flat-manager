import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, TextInput} from "react-native";
import {Button} from "react-native-elements";
import {Controller, useForm} from "react-hook-form";
import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import DatePicker from 'react-native-neat-date-picker';
import CustomMultiPicker from "react-native-multiple-select-list";
import { useFlatContext } from "../store";

export function AddTaskModal({showTaskCreationModal, setShowTaskCreationModal}) {
    // warnings
    const [showTaskNameWarning, setTaskNameWarning] = useState(false);
    const [showTaskDateWarning, setTaskDateWarning] = useState(false);
    // datepicker for task starting and ending day
    const [taskDate, setTaskDate] = useState(null);
    const [showTaskDatePicker, setShowTaskDatePicker] = useState(false);

    const flatContext = useFlatContext();

    const openTaskDatePicker = () => {
        setShowTaskDatePicker(true)
    }
    const onTaskDatePickerCancel = () => {
        setShowTaskDatePicker(false)
    }
    const onTaskDatePickerConfirm = (start, end) => {
        setShowTaskDatePicker(false)
        setTaskDate({'start': start, 'end': end});
        console.log(taskDate);
    }
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            taskName: '',
            taskPeriod: 1,
            taskDeadline: 1,
        },
    });

    async function createTask(data) {
        var submitFails = false;

        if (data.taskName) {
            console.log(data);
            setTaskNameWarning(false);
        } else {
            console.log("Task Name cannot be empty");
            setTaskNameWarning(true);
            submitFails = true;
        }

        if (taskDate) {
            console.log(taskDate);
            setTaskDateWarning(false);
        } else {
            console.log("Task Date cannot be empty");
            setTaskDateWarning(true);
            submitFails = true;
        }
        if (!submitFails) {
            // backend connection
            // send taks to backend
            console.log(data);
            console.log(taskDate);
            console.log(selectedUsers);
            hideTaskCreationModal();
        }
    }

    const hideTaskCreationModal = () => {
        setTaskDate(null);
        setShowTaskCreationModal(false);
    }

    const [selectedUsers, setSelectedUsers] = useState([]);

    const getFlatUsers = () => {
        let obj = {};
        if(flatContext.users != null) {
            flatContext.users.forEach(u => {
                obj[u.id] = u.username;
            })
        }
        return obj;
        
    }

    return (
        <Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000, height: "95vh", overflow: "scroll"}}
            visible={showTaskCreationModal}
            modalTitle={<ModalTitle title="Add task" align="left"/>}
            onTouchOutside={() => {
                hideTaskCreationModal()
            }}
        >
            <ModalContent>
                <Text style={styles.tinyText}>Task Name </Text>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.accFormTextInput}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Task Name"
                        />
                    )}
                    name="taskName"
                />
                {!showTaskNameWarning ? null : <Text style={styles.warningText}> Task Name cannot be empty </Text>}

                <Button
                    buttonStyle={styles.blueButton}
                    title='Choose Task Date'
                    onPress={openTaskDatePicker}
                />
                <DatePicker
                    isVisible={showTaskDatePicker}
                    mode='range'
                    onCancel={onTaskDatePickerCancel}
                    onConfirm={onTaskDatePickerConfirm}
                />
                {!showTaskDateWarning ? null : <Text style={styles.warningText}> Task Date cannot be empty </Text>}

                <Text style={styles.tinyText}>Task Period (in Days) </Text>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.accFormTextInput}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value.toString()}
                            placeholder="Task Period"
                            keyboardType="numeric"
                        />
                    )}
                    name="taskPeriod"
                />
                <Text style={styles.tinyText}> Task Deadline (in Days) </Text>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.accFormTextInput}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value.toString()}
                            placeholder="Task Deadline"
                            keyboardType="numeric"
                        />
                    )}
                    name="taskDeadline"
                />
                <Text style={styles.tinyText}> Assign Users to Task </Text>
                <CustomMultiPicker
                    options={getFlatUsers()}
                    search={true} 
                    multiple={true} //
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} 
                    callback={(res) => { setSelectedUsers(res); }} 
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle-outline"}
                    unselectedIconName={"ios-radio-button-off-outline"}
                    scrollViewHeight={130}
                />
                <Button
                    buttonStyle={styles.blueButton}
                    title="Create Task"
                    onPress={handleSubmit(createTask)}
                />
                <Button
                    buttonStyle={styles.blueButton}
                    title="Close"
                    onPress={hideTaskCreationModal}
                />
            </ModalContent>
        </Modal>
    );
}
