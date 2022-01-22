import { Text, TextInput, View } from "react-native";
import styles from "../static/styles";
import { Button } from "react-native-elements";
import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {useAppDispatch, useAppSelector} from "../store";
import { useRegisterMutation } from "../features/api/user-api";
import { RegisterRequest } from "../models/api/auth";

export function parseRegisterData(data): RegisterRequest {
    let parsedData = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "username": data.username,
        "email": data.email,
        "password": data.password,
    }
    return parsedData
}

export function RegisterScreen({ navigation }) {
    const schema = Yup.object({
        password: Yup.string().required("Please enter your password")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        confirmPassword: Yup.string().test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value;
        }),
        email: Yup.string().required("Please enter your email").matches(/@/, "Incorrect email")
    }).required();

    const toastMessage = useAppSelector((state) => state.toast.message?.toString());

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema)
    });
    const [register, { isSuccess }] = useRegisterMutation();
    const onSubmit = data => onRegisterPress(data)

    function onRegisterPress(data) {
        let parsedData = parseRegisterData(data);
        register(parsedData).unwrap().then(
            () => {
                // TODO: add success toast
                navigation.goBack();
            }
        );
    }


    return (
        <View style={styles.accScreenContainer}>
            <Text style={styles.logoText}>Flatmate</Text>
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
                        placeholder="First Name"
                    />
                )}
                name="firstName"
            />
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
                        placeholder="Last Name"
                    />
                )}
                name="lastName"
            />
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
                        placeholder="Email"
                    />
                )}
                name="email"
            />
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
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.accFormTextInput}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                )}
                name="password"
            />
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
                        placeholder="Confirm Password"
                        secureTextEntry={true}

                    />
                )}
                name="confirmPassword"
            />
            <Button
                buttonStyle={styles.blueButton}
                title="Submit"
                onPress={handleSubmit(onSubmit)}
            />
            <Text> {errors.email?.message} </Text>
            <Text> {errors.password?.message} </Text>
            <Text> {errors.confirmPassword?.message} </Text>
            <Text> {toastMessage} </Text>
        </View>
    );
}