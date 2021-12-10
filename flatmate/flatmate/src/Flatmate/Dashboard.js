import * as React from "react";
import styles from "../static/native_elements_styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import Calendar from 'react-calendar'
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {Button as BButton, FormControl, InputGroup, Modal} from "react-bootstrap";
import Countdown, {zeroPad} from 'react-countdown';
import clippy from '../static/clippy.svg'

export function DashboardScreen({navigation}) {
    const [showGenJoinCode, setShowGenJoinCode] = useState(false);
    const handleCloseGenJoinCode = () => setShowGenJoinCode(false);
    const handleShowGenJoinCode = () => setShowGenJoinCode(true);

    const [value, onChange] = useState(new Date());

    const counterRenderer = ({minutes, seconds}) => (
        <div align="center">
            <span className="text-black">
                Code valid for {zeroPad(minutes)}:{zeroPad(seconds)} min
            </span>
        </div>

    );

    function handleClickCalendar() {
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
                    buttonStyle={styles.bluButton}
                    title="Add user to the flat"
                    onPress={() => handleShowGenJoinCode()}
                />
                <Modal show={showGenJoinCode} onHide={handleCloseGenJoinCode}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add user</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-sm-left" align="center">Join code:</p>

                        <div className="input-group mb-3 justify-content-md-center">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">ASDFAS</span>
                            </div>
                            <BButton className="btn-secondary" data-clipboard-target="ASDFAS">
                                <img src={clippy} alt="Copy to clipboard" width="20px"/>
                            </BButton>
                        </div>
                        <Countdown
                            onComplete={handleCloseGenJoinCode}
                            date={Date.now() + 5 * 60 * 1000}
                            renderer={counterRenderer}
                        />

                    </Modal.Body>

                    <Modal.Footer>
                        <BButton variant="secondary" onClick={handleCloseGenJoinCode}>Close</BButton>
                    </Modal.Footer>

                </Modal>
            </View>
        </View>)
}