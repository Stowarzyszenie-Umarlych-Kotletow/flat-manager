import {useState} from "react";
import {Text, TextInput, View} from "react-native";
import styles from "../static/native_elements_styles";
import {Button} from "react-native-elements";
import {Button as BButton, FormControl, InputGroup, Modal} from "react-bootstrap";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { UserService } from "../services/UserService"

export function ManageScreen({navigation, setUser, currentFlat, loggedUser}) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          password: '',
        },
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const onSubmit = data => handleDelete(data);

    async function handleDelete(data) {
        console.log("próba usunięcia");
        let password = data.password;
        let service = new UserService("http://localhost:8080");
        let recivedData = await service.getUserById(loggedUser);
        try {
            recivedData = await service.authUser({"username": recivedData["username"], "password": password});
            console.log("próba usunięcia się powiodła");
            setShow(false);
            setUser(null);
            service.deleteUserById(loggedUser);
        } 
        catch {
            console.log("Niepoprawne hasło");
        }
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
                            <Controller
                            control={control}
                            rules={{
                            maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.accFormTextInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password" 
                                placeholderColor="#c4c3cb" 
                                secureTextEntry={true}
                            />
                            )}
                            name="password"
                        />
                        </InputGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <BButton variant="primary" onClick={handleClose}>Cancel</BButton>
                        <Button 
                            buttonStyle={styles.bluButton}
                            title="Delete" 
                            onPress={handleSubmit(onSubmit)} 
                        />
                    </Modal.Footer>

                </Modal>
            </View>
        </View>
    );
}
