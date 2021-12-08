import {Text, TextInput, View} from "react-native";
import styles from "./styles";
import {Button} from "react-native-elements";
import * as React from "react";
import './bootstrap_style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

export function ChangePasswordScreen() {
    function onChangePasswordPress() {
        console.log('saving data')
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Change password</Text>
                <TextInput placeholder="Old password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <TextInput placeholder="New password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <TextInput placeholder="Retype password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <Button
                    buttonStyle={styles.accButton}
                    onPress={() => onChangePasswordPress()}
                    title="Save"
                />
            </View>
        </View>
    );
}