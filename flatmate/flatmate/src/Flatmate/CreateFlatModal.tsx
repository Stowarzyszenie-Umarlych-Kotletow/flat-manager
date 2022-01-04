import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {TextInput} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";

export function CreateFlatModal({showCreateFlatModal, setShowCreateFlatModal, setCurrentFlat}) {

    function handleCreateFlat(data) {
        setShowCreateFlatModal(false);
        console.log(data.flatname);
        // backend connection
        var flat_id = 123;
        setCurrentFlat(flat_id);
    }

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            flatname: '',
        },
    });

    return (

        <Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000}}
            visible={showCreateFlatModal}
            modalTitle={<ModalTitle title="Create flat"  align="left" />}
            onTouchOutside={() => { setShowCreateFlatModal(false)}}
        >
            <ModalContent>
                <Controller
                    control={control}
                    name="flatname"
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
                    />
                    )}
                />


                <Button
                    buttonStyle={styles.blueButton}
                    title="Cancel"
                    onPress={() => { setShowCreateFlatModal(false) }}
                />
                <Button
                    buttonStyle={styles.blueButton}
                    title="Submit"
                    onPress={handleSubmit(handleCreateFlat)}
                />
            </ModalContent>
        </Modal>

    )
}
