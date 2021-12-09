import * as React from "react";
import styles from "../static/native_elements_styles";
import {Text, View} from "react-native";
import logo from '../static/logo.svg'
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";


export function ManageFlatsScreen({navigation, currentFlat = null, setCurrentFlat}) {
    function handleClickOnFlat(flat) {
        setCurrentFlat(flat)
        console.log(flat)
        if (currentFlat != null)
            navigation.popToTop()
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>

                <Text style={styles.logoText}>Select flat</Text>

                <Button
                    buttonStyle={styles.highButton}
                    title="Gaming house dmowskirgo 69"
                    onPress={() => handleClickOnFlat(1)}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Go go power rangers 27"
                    onPress={() => handleClickOnFlat(2)}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Daruide sandrstorm 27"
                    onPress={() => handleClickOnFlat(3)}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Daruide sandrstorm 27"
                    onPress={() => handleClickOnFlat(4)}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Daruide sandrstorm 27"
                    onPress={() => handleClickOnFlat(5)}
                />
                <Button
                    buttonStyle={styles.highButton}
                    title="Daruide sandrstorm 27"
                    onPress={() => handleClickOnFlat(6)}
                />
            </View>
        </View>)
}