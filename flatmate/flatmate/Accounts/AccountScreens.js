import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import * as React from "react";
import styles from "./styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import {Modal, Button as BButton} from 'react-bootstrap';
import {useState} from "react";

export function LoginScreen({navigation}) {
    function onLoginPress() {
        console.log('test')
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Flatmate</Text>
                <TextInput placeholder="Username or e-mail" placeholderColor="#c4c3cb" style={styles.accFormTextInput}/>
                <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <Button
                    buttonStyle={styles.accButton}
                    // onPress={() => onLoginPress()}
                    onPress={() => navigation.navigate('ManageScreen')}
                    title="Login"
                />
            </View>
        </View>
    );
}

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
                    buttonStyle={styles.accButton}
                    onPress={() => onRegisterPress()}
                    title="Register"
                />
            </View>
        </View>
    );
}


export function ManageScreen({navigation}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDelete() {
        setShow(false);
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Manage account</Text>

                <Button
                    buttonStyle={styles.accButton}
                    title="Change password"
                    onPress={() => navigation.navigate('ChangePasswordScreen')}
                />

                <Button
                    buttonStyle={styles.warnButton}
                    title="Delete account"
                    onPress={handleShow}
                />


                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Delete account</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-outline">
                            <input type="password" id="typePassword" className="form-control"/>
                            <label className="form-label" htmlFor="typePassword">Password input</label> <!-- nie działa -->
                        </div>
                        <Text style={styles.smallText}>Are you sure want to delete your account?</Text><!-- todo przerobić -->

                    </Modal.Body>

                    <Modal.Footer>
                        <BButton variant="primary" onClick={handleClose}>Cancel</BButton>
                        <BButton variant="danger" onClick={handleDelete}>Delete</BButton>
                    </Modal.Footer>

                </Modal>
            </View>
        </View>
    );
}

export function ChangePasswordScreen() {
    function onChangePasswordPress() {
        console.log('saving data')
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Change password</Text>
                <TextInput placeholder="Old password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <TextInput placeholder="New password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <TextInput placeholder="Retype password" placeholderColor="#c4c3cb" style={styles.accFormTextInput}
                           secureTextEntry={true}/>
                <Button
                    buttonStyle={styles.accButton}
                    onPress={() => onChangePasswordPress()}
                    title="Save"
                />
            </View>
        </View>
    );
}


export function HomeScreen({navigation}) {
    return (
        <View style={styles.accScreenContainer}>
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
        </View>
    );
}