import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {Controller, useForm} from "react-hook-form";
import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, TextInput} from "react-native";
import {Button} from "react-native-elements";
import userService from "../services/user.service";
import { useAppDispatch, useAppSelector } from "../store";
import {addUser} from "../features/flat";
import axios, { AxiosError } from "axios";

function parseData(data) {
    let parsedData = {
        "username": data.username,
    }
    return parsedData;
}

export function AddUserToFlatModal({setShowAddUserToFlatModal}) {

    const [usernameWarning, setUsernameWarning] = useState(null);
    const dispatch = useAppDispatch();
    const selectedFlatId = useAppSelector((state) => state.flat.selectedFlatId);

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
        },
    });

    async function completeAddUser(data) {
        let warning: string = null;
        if (data.username) {
            try {
            const userId = (await userService.getUserByUsername(data.username)).data.id;
            await dispatch(addUser({flatId: selectedFlatId, userId})).unwrap();
            
            setShowAddUserToFlatModal(false);
            } catch (err) {
                warning = `Cannot add user (${err.message})`;
            }
        } else {
            warning = "The username must not be empty";
        }
        setUsernameWarning(warning);
    }


    return (<Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000}}
            visible={true}
            modalTitle={<ModalTitle title="Add user" align="left"/>}
            onTouchOutside={() => {
                setShowAddUserToFlatModal(false);
            }}
        >
            <ModalContent>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (<TextInput
                            style={styles.accFormTextInput}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Username"
                        />)}
                    name="username"
                />
                {!usernameWarning == null ? null : <Text style={styles.warningText}>{usernameWarning}</Text>}
                <Button
                    buttonStyle={styles.blueButton}
                    title="Add User"
                    onPress={handleSubmit(completeAddUser)}
                />
                <Button
                    buttonStyle={styles.blueButton}
                    title="Close"
                    onPress={() => {
                        setShowAddUserToFlatModal(false);
                    }}
                />
            </ModalContent>
        </Modal>)
}