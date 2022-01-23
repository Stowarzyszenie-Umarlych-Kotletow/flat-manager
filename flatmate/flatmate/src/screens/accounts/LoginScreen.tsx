import {Text, TextInput, View} from "react-native";
import styles from "../../static/styles";
import {Button} from "react-native-elements";
import {Controller, useForm} from "react-hook-form";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {LoginRequest} from "../../models/api/auth";
import {useLoginMutation} from "../../features/api/user-api";
import toast from "../../features/toast"
import { showMessage } from "react-native-flash-message";


export function parseLoginData(data) {
    const parsedData: LoginRequest = {
        "username": data.username,
        "password": data.password,
    }
    return parsedData;
}

export function LoginScreen() {
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const [login, {isError, status}] = useLoginMutation();
    const dispatch = useAppDispatch();
    function checkErrors(parsedData){
        let err = false;
        if (parsedData.username == ""){
            showMessage({
                message: "Username cannot be empty",
                type: "danger",
            })
            // dispatch(toast.actions.setMessage("Username cannot be empty"));
            err = true;
        }
        if (parsedData.password == ""){
            showMessage({
                message: "Password cannot be empty",
                type: "danger",
            })
            // dispatch(toast.actions.setMessage("Password cannot be empty"));
            err = true;
        }
        return err;
    }

    async function onLoginPress(data) {
        dispatch(toast.actions.clearMessage());
        let parsedData = parseLoginData(data);
        if (checkErrors(parsedData)){
            return;
        }
        login(parsedData);
    }

    return (
        <View>
            <Text style={styles.loginLogoText}>Flatmate</Text>
            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.textInput}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Username"
                    />
                )}
                name="username"
            />
            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.textInput}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                )}
                name="password"
            />
            <Button
                buttonStyle={styles.blueButton}
                title="Submit"
                onPress={handleSubmit(onLoginPress)}
            />
        </View>
    );
}