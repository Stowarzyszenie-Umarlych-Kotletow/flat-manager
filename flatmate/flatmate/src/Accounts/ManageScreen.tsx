import * as React from "react";
import {useState} from "react";
import {Text, TextInput, View} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import {Controller, useForm} from "react-hook-form";
import accountService from "../services/account.service";
import {useAppDispatch, useAppSelector} from "../store";
import auth from "../features/auth";
import {Modal, ModalContent, ModalTitle} from "react-native-modals"


export function ManageScreen({navigation, currentFlat}) {
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            password: '',
        },
    });
    const dispatch = useAppDispatch();

    const [showAccountDeletionBox, setShowAccountDeletionBox] = useState(false);
    const [showIncorrectPasswordWarning, setShowIncorrectPasswordWarning] = useState(false);

    async function handleDelete(data) {
        console.log("próba usunięcia");
        let password = data.password;

        try {
            await accountService.deleteAccount({password});
            console.log("próba usunięcia się powiodła");
            handleLogOut();
        } catch {
            console.log("Niepoprawne hasło");
            setShowIncorrectPasswordWarning(true);
        }
    }

    function handleLogOut() {
        dispatch(auth.actions.logout());
    }

    const username = useAppSelector((state) => state.auth.user?.username);

    return (
        <View style={styles.accScreenContainer}>
            <Text style={styles.logoText}>Manage account</Text>
            {currentFlat != null ? (
                <Button
                    buttonStyle={styles.blueButton}
                    title="Manage flats"
                    onPress={() => navigation.navigate('ManageFlatsScreen')}
                />
            ) : (
                <></>
            )
            }

            {/*
            <Button
                buttonStyle={styles.blueButton}
                title="Change password"
                onPress={() => navigation.navigate('ChangePasswordScreen')}
            />
            */}

            <Button
                buttonStyle={styles.blueButton}
                title="Log out"
                onPress={handleLogOut}
            />

            <Button
                buttonStyle={styles.warnButton}
                title="Delete account"
                onPress={() => { setShowAccountDeletionBox(true) }}
            />

            <Modal
                width={0.9}
                rounded
                actionsBordered
                style={{zIndex: 1000}}
                visible={showAccountDeletionBox}
                modalTitle={ <ModalTitle title={"Confirm account removal for " + username} align="left" /> }
                onTouchOutside={() => { setShowAccountDeletionBox(false) }}
            >
                <ModalContent>
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.accFormTextInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                        )}
                        name="password"
                    />
                    <Button
                        buttonStyle={styles.blueButton}
                        title="Cancel"
                        onPress={() => {setShowAccountDeletionBox(false)}}
                    />
                    {!showIncorrectPasswordWarning ? null :
                        <Text style={styles.tinyText}> Incorrect Password</Text>}

                    <Button
                        buttonStyle={styles.warnButton}
                        title="Delete account"
                        onPress={handleSubmit(handleDelete)}
                    />
                </ModalContent>
            </Modal>
        </View>
    );
}
