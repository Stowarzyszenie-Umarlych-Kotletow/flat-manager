import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { ScrollView, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { Controller, useForm } from "react-hook-form";
import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import DatePicker from 'react-native-neat-date-picker';
import CustomMultiPicker from "react-native-multiple-select-list";
import { useFlat } from "../features/hooks";
import { useCreateFlatTaskMutation } from "../features/api/flat-api";

export function validateForm(data) {
    return true;
}


export function AddTaskModal({ setShowTaskCreationModal }) {
    // warnings
    const [showTaskNameWarning, setTaskNameWarning] = useState(false);
    const [showTaskDateWarning, setTaskDateWarning] = useState(false);
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
        if (!validateForm(data))
            return;
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
                    <Text style={styles.tinyText}>Task Name </Text>
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
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
                        render={({ field: { onChange, onBlur, value } }) => (
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
                        render={({ field: { onChange, onBlur, value } }) => (
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
                        options={getUserSelectList()}
                        search={true}
                        multiple={true} //
                        placeholder={"Search"}
                        placeholderTextColor={'#757575'}
                        returnValue={"value"}
                        callback={(res: any[]) => { setSelectedUsers(res.filter(val => !!val)); }}
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
                        onPress={handleSubmit(submitTask)}
                    />
                    <Button
                        buttonStyle={styles.blueButton}
                        title="Close"
                        onPress={hideTaskCreationModal}
                    />
                </ModalContent>
            </ScrollView>
        </Modal>
    );
}
