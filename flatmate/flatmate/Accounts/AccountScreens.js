import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import * as React from "react";
import styles from "./styles";

export function LoginScreen() {
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">

            {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
            <View style={styles.accScreenContainer}>
                <View style={styles.accFormView}>
                    <Text style={styles.logoText}>Login to Flatmate</Text>
                    <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                    <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                               secureTextEntry={true}/>
                    <Button
                        buttonStyle={styles.accButton}
                        // onPress={() => this.onLoginPress()}
                        title="Login"
                    />
                </View>
            </View>
            {/*</TouchableWithoutFeedback>*/}
        </KeyboardAvoidingView>
    );
}

export function RegisterScreen() {
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
            <View style={styles.accScreenContainer}>
                <View style={styles.accFormView}>
                    <Text style={styles.logoText}>Register to Flatmate</Text>
                    <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                    <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                               secureTextEntry={true}/>
                    <TextInput placeholder="Retype password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                               secureTextEntry={true}/>
                    <Button
                        buttonStyle={styles.accButton}
                        // onPress={() => this.onLoginPress()}
                        title="Register"
                    />
                </View>
            </View>
            {/*</TouchableWithoutFeedback>*/}
        </KeyboardAvoidingView>
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