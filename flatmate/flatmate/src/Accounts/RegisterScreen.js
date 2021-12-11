import {Text, TextInput, View} from "react-native";
import styles from "../static/native_elements_styles";
import {Button} from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import * as React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { UserService } from "../services/UserService"

export function RegisterScreen({setUser}) {
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

    const onSubmit = data =>onRegisterPress(data)

    function parseData(data) {
        let parsedData = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "username": data.username,
            "email": data.email,
            "password": data.password,
        }
        return parsedData
    }

    async function onRegisterPress(data) {
        let parsedData = parseData(data);
        let service = new UserService("http://localhost:8080");
        let recivedData = await service.createUser(parsedData);
        console.log(recivedData["id"]);
        setUser(recivedData["id"]);
    }


    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
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
                        placeholderColor="#c4c3cb" 
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
                        placeholderColor="#c4c3cb" 
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
                        placeholderColor="#c4c3cb" 
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
                        placeholderColor="#c4c3cb" 
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
                        placeholderColor="#c4c3cb" 
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
                        placeholderColor="#c4c3cb" 
                        secureTextEntry={true}
                        
                    />
                    )}
                    name="confirmPassword"
                />
                <Button 
                    buttonStyle={styles.bluButton}
                    title="Submit" 
                    onPress={handleSubmit(onSubmit)} 
                />
                <p> { errors.email?.message} </p>
                <p> { errors.password?.message} </p>
                <p> { errors.confirmPassword?.message} </p>

            </View>
        </View>
    );
}