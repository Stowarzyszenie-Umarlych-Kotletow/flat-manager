import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import * as React from "react";
import styles from "./styles";

export function LoginScreen({navigation}) {
    function onLoginPress() {
        console.log('test')
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Flatmate</Text>
                <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <Button
                    buttonStyle={styles.accButton}
                    onPress={() => onLoginPress()}
                    title="Login"
                />
            </View>
        </View>
    );
}

export function RegisterScreen() {
    function onRegisterPress() {
        console.log('test')
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Flatmate</Text>
                <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <TextInput placeholder="Retype password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <Button
                    buttonStyle={styles.accButton}
                    onPress={() => onRegisterPress()}
                    title="Register"
                />
            </View>
        </View>
    );
}


export function HomeScreen({navigation}) {
    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Flatmate</Text>
                <Button
                    buttonStyle={styles.accButton}
                    title="Login"
                    onPress={() => navigation.navigate('LoginScreen')}
                />
                <Button
                    buttonStyle={styles.accButton}
                    title="Register"
                    onPress={() => navigation.navigate('RegisterScreen')}
                />
            </View>
        </View>
    );
}