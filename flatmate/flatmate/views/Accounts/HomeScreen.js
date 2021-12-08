import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import * as React from "react";
import styles from "./styles";

export function HomeScreen({
                               navigation
                           }) {
    return (<View style={styles.accScreenContainer}>
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
        </View>);
}