import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import * as React from "react";
import styles from "../static/styles";

export function HomeScreen({navigation}) {
    return (<View style={styles.accScreenContainer}>
        <Text style={styles.loginLogoText}>Flatmate</Text>

        <Button
            buttonStyle={styles.blueButton}
            title="Login"
            onPress={() => navigation.navigate('LoginScreen')}
        />

        <Button
            buttonStyle={styles.blueButton}
            title="Register"
            onPress={() => navigation.navigate('RegisterScreen')}
        />
    </View>);
}