import {useState} from "react";
import {Text, View} from "react-native";
import styles from "../static/native_elements_styles";
import {Button} from "react-native-elements";
import {Button as BButton, FormControl, InputGroup, Modal} from "react-bootstrap";
import * as React from "react";

export function ManageScreen({navigation, setUser, currentFlat}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDelete() {
        setShow(false);
        setUser(null)
    }

    function handleLogOut() {
        setUser(null)
    }

    return (
        <View style={styles.accScreenContainer}>
            <View style={styles.accFormView}>
                <Text style={styles.logoText}>Manage account</Text>
                {currentFlat != null ? (
                    <Button
                        buttonStyle={styles.bluButton}
                        title="Manage flats"
                        onPress={() => navigation.navigate('ManageFlatsScreen')}
                    />
                ) : (
                    <></>
                )
                }

                <Button
                    buttonStyle={styles.bluButton}
                    title="Change password"
                    onPress={() => navigation.navigate('ChangePasswordScreen')}
                />

                <Button
                    buttonStyle={styles.bluButton}
                    title="Log out"
                    onPress={handleLogOut}
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
                        <p className="text-sm-left">Are you sure want to delete your account?</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="password"
                                id="typePassword"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

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
