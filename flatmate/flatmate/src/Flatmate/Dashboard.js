import * as React from "react";
import styles from "../static/native_elements_styles";
import {Text, View} from "react-native";
import logo from '../static/logo.svg'
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";


export function DashboardScreen({navigation}) {
    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>

                <Text style={styles.logoText}>Dashboard</Text>

                <Button
                    buttonStyle={styles.highButton}
                    title="test"
                    // onPress={() => navigation.navigate('ManageFlats')}
                />

            </View>
        </View>)
}