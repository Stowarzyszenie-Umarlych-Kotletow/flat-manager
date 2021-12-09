import * as React from "react";
import styles from "../static/native_elements_styles";
import {Text, View} from "react-native";
import logo from '../static/logo.svg'
import {Button} from "react-native-elements";
import {createStackNavigator} from "@react-navigation/stack";
import {ButtonRow} from '@thumbtack/thumbprint-react';
import {Row, Col} from 'react-bootstrap'

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

                <Text style={styles.logoText}>Manage flats</Text>

                <Row>
                    <Col>
                        <Button
                            buttonStyle={styles.bluButton}
                            title="Create flat"
                        />
                    </Col>
                    {/*<Col>*/}
                    {/**/}
                    {/*    Sample Second Col*/}
                    {/*</Col>*/}
                    <Col>
                        <Button
                            buttonStyle={styles.bluButton}
                            title="Join flat"
                        />
                    </Col>
                </Row>
                <hr/>
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