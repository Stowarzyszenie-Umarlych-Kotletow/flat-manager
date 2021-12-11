import {Text, TextInput, View} from "react-native";
import styles from "../static/native_elements_styles";
import {Button} from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import * as React from "react";
import { UserService } from "../services/UserService"

export function LoginScreen({navigation, setUser}) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          username: '',
          password: '',
        },
    });

    const onSubmit = data => onLoginPress(data);

    function parseData(data) {
        let parsedData = {
            "username": data.username,
            "password": data.password,
        }
        return parsedData;
    }


    async function onLoginPress(data) {
        let parsedData = parseData(data);
        let service = new UserService("http://localhost:8080");
        let recivedData = await service.authUser(parsedData); 
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
                <Button 
                    buttonStyle={styles.bluButton}
                    title="Submit" 
                    onPress={handleSubmit(onSubmit)} 
                />
            </View>
        </View>
    );
}