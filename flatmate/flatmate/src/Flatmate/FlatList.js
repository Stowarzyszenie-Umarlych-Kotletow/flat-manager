import * as React from "react";
import styles from "../native_elements_styles";
import {Text, View} from "react-native";
import logo from '../logo.svg'
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";


export function FlatListScreen({navigation}) {
    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>

                <Text style={styles.logoText}>Select flat</Text>

                <Button
                    buttonStyle={styles.highButton}
                    title="Gaming house dmowskirgo 69"
                    // onPress={() => navigation.navigate('ChangePasswordScreen')}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Go go power rangers 27"
                    // onPress={() => navigation.navigate('ChangePasswordScreen')}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Daruide sandrstorm 27"
                    // onPress={() => navigation.navigate('ChangePasswordScreen')}
                />
            </View>
        </View>)
}