import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {Controller, useForm} from "react-hook-form";
import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, TextInput} from "react-native";
import {Button} from "react-native-elements";

function parseData(data) {
    let parsedData = {
        "username": data.username,
    }
    return parsedData;
}

export function AddUserToFlatModal({showAddUserToFlatModal, setShowAddUserToFlatModal}) {

    const [showUsernameWarning, setUsernameWarning] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
        },
    });

    async function addUser(data) {
        if (data.username) {
            data = parseData(data);
            // send user to backend
            setUsernameWarning(false);
        } else {
            setUsernameWarning(true);
        }
    }


    return (<Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000}}
            visible={showAddUserToFlatModal}
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
                {!showUsernameWarning ? null : <Text style={styles.warningText}> Username cannot be empty </Text>}
                <Button
                    buttonStyle={styles.blueButton}
                    title="Add User"
                    onPress={handleSubmit(addUser)}
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