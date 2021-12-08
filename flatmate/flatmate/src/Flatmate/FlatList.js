import * as React from "react";
import styles from "../native_elements_styles";
import {View} from "react-native";
import logo from '../logo.svg'


export function FlatListScreen() {
    return (

        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>

                <div className="icon">
                    <img src={logo} alt="logo" align="center"/>
                    <logo/>
                </div>

            </View>
        </View>)
}