import * as React from "react";
import styles from "../static/native_elements_styles";
import {Text, TextInput, View} from "react-native";
import {Button} from "react-native-elements";
import {Row, Col, Modal, InputGroup, FormControl, Button as BButton} from 'react-bootstrap'
import {useState} from "react";
import { useForm, Controller } from "react-hook-form";

export function ManageFlatsScreen({navigation, currentFlat = null, setCurrentFlat}) {
    const [showJoinFlat, setShowJoinFlat] = useState(false);
    const handleCloseJoinFlat = () => setShowJoinFlat(false);
    const handleShowJoinFlat = () => setShowJoinFlat(true);

    const [showCreateFlat, setShowCreateFlat] = useState(false);
    const handleCloseCreateFlat = () => setShowCreateFlat(false);
    const handleShowCreateFlat = () => setShowCreateFlat(true);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          flatname: '',
        },
    });

    const state = {
        flats: [
            {
                name: "Testowe Mieszkanie",
                id: "ram pam pam"
            },
            {
                name: "Testowe Mieszkanie",
                id: "ram pam pam1s"
            }
        ],
    }

    const onSubmit = data => handleCreateFlat(data)

    function handleJoinFlat(){
        handleCloseJoinFlat()
        setCurrentFlat(123)
        navigation.popToTop()
    }

    function handleCreateFlat(data) {
        console.log(data)
        handleCloseCreateFlat()
        // backend connection
        setCurrentFlat(123)
    }

    function handleClickOnFlat(flat_id) {
        setCurrentFlat(flat_id)
        console.log(flat_id)
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
                            onPress={() => handleShowCreateFlat()}
                        />
                    </Col>
                    <Col>
                        <Button
                            buttonStyle={styles.bluButton}
                            title="Join flat"
                            onPress={() => handleShowJoinFlat()}
                        />
                    </Col>
                </Row>
                <hr/>
                {
                   state.flats.map((flat) => {
                        return(
                            <Button
                                buttonStyle={styles.highButton}
                                title={flat.name}
                                key={flat.id}
                                onPress={() => handleClickOnFlat(flat.id)}
                            />
                );})}
                <Modal show={showJoinFlat} onHide={handleCloseJoinFlat}>

                    <Modal.Header closeButton>
                        <Modal.Title>Join an existing flat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-sm-left">Flat code:</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="6-character code"
                                aria-label="flat-code"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <BButton variant="secondary" onClick={handleCloseJoinFlat}>Cancel</BButton>
                        <BButton variant="primary" onClick={handleJoinFlat}>Join</BButton>
                    </Modal.Footer>
                </Modal>

                <Modal show={showCreateFlat} onHide={handleCloseCreateFlat}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new flat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-sm-left">Flat name:</p>
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
                                placeholder="Name" 
                                placeholderColor="#c4c3cb" 
                            />
                            )}
                            name="flatname"
                        />
                        </InputGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <BButton variant="secondary" onClick={handleCloseCreateFlat}>Cancel</BButton>
                        <Button 
                            buttonStyle={styles.bluButton}
                            title="Submit" 
                            onPress={handleSubmit(onSubmit)} 
                        />
                    </Modal.Footer>

                </Modal>
            </View>
        </View>)
}