import * as React from "react";
import styles from "../static/native_elements_styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import Calendar from 'react-calendar'
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';

export function DashboardScreen({navigation}) {

    const [value, onChange] = useState(new Date());

    function handleClickCalendar(){
        console.log(value)
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>

                <Text style={styles.logoText}>Dashboard</Text>
                <div align="center">
                    <Calendar
                        onChange={onChange}
                        value={value}
                        onClickDay={handleClickCalendar}
                    />
                </div>

                <Button
                    buttonStyle={styles.highButton}
                    title="test"

                    // onPress={() => navigation.navigate('ManageFlats')}
                />

            </View>
        </View>)
}