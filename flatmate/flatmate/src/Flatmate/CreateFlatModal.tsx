import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {TextInput} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store";
import flatSlice from "../features/flat";
import { useCreateFlatMutation } from "../features/api/flat-api";

export function CreateFlatModal({ setShowCreateFlatModal}) {

    const [createFlat] = useCreateFlatMutation();
    const dispatch = useAppDispatch();

    function handleCreateFlat(data: CreateFlatRequest) {
        createFlat(data).unwrap().then((success) => {
            setShowCreateFlatModal(false);
            dispatch(flatSlice.actions.setCurrentFlat(success.id));
        });
    }

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
        },
    });

    return (

        <Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000}}
            visible={true}
            modalTitle={<ModalTitle title="Create flat"  align="left" />}
            onTouchOutside={() => { setShowCreateFlatModal(false)}}
        >
            <ModalContent>
                <Controller
                    control={control}
                    name="name"
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
                    title="Submit"
                    onPress={handleSubmit(handleCreateFlat)}
                />
                <Button
                    buttonStyle={styles.warnButton}
                    title="Cancel"
                    onPress={() => { setShowCreateFlatModal(false) }}
                />
            </ModalContent>
        </Modal>

    )
}
