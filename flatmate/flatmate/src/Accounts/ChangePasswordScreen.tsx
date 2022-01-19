import {Text, TextInput, View} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import {Controller, useForm} from "react-hook-form";
import * as React from "react";
import {useState} from "react";
import {useAppDispatch} from "../store";
import {ChangePasswordRequest} from "../models/api/account";


export function parseData(data) {
    const parsedData: ChangePasswordRequest = {
        "password": data.newPassword,
    }
    return parsedData;
}

export function ChangePasswordScreen() {
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
    });
    const [showIncorrectPasswordWarning, setShowIncorrectPasswordWarning] = useState(false);
    const [showDifferentPasswordsWarning, setShowDifferentPasswordsWarning] = useState(false);
    
    const dispatch = useAppDispatch();

    async function onChangePasswordPress(data) {

        if (data.newPassword != data.newPasswordConfirm || !data.newPassword) {
            setShowDifferentPasswordsWarning(true);
        } else {
            setShowDifferentPasswordsWarning(false);
        }
        let parsedData = parseData(data);
        // backend connection
        // change password
        setShowIncorrectPasswordWarning(false);
        // todo
    }

    return (
        <View style={styles.accScreenContainer}>
            <Text style={styles.logoText}>Change password</Text>

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
                        placeholder="Current password"
                        secureTextEntry={true}
                    />
                )}
                name="currentPassword"
            />

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
                        placeholder="New password"
                        secureTextEntry={true}
                    />
                )}
                name="newPassword"
            />

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
                        placeholder="Confirm new password"
                        secureTextEntry={true}
                    />
                )}
                name="newPasswordConfirm"
            />

            {!showIncorrectPasswordWarning ? null :
                <Text style={styles.warningText}> Incorrect Current Password</Text>}
            {!showDifferentPasswordsWarning ? null :
                <Text style={styles.warningText}> Passwords do not match <br/> or <br/>You are trying to push empty
                    password </Text>}
            <Button
                buttonStyle={styles.greenButton}
                title="Change Password"
                onPress={handleSubmit(onChangePasswordPress)}
            />
        </View>
    );
}