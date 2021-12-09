import {Text, TextInput, View} from "react-native";
import styles from "../native_elements_styles";
import {Button} from "react-native-elements";
import * as React from "react";

export function RegisterScreen() {
    function onRegisterPress() {
        console.log('test')
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Flatmate</Text>
                <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                <TextInput placeholder="E-mail" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <TextInput placeholder="Retype password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <Button
                    buttonStyle={styles.bluButton}
                    onPress={() => onRegisterPress()}
                    title="Register"
                />
            </View>
        </View>
    );
}