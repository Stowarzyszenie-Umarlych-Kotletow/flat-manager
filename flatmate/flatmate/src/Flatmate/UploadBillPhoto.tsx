import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {Image, TextInput, View} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import {Controller, useForm} from "react-hook-form";

export function UploadBillModal ({ setShowUploadBillModal}) {
    const [imageUri, setImageUri] = useState(null);
    async function addImage() {
        let image_data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            }
        );
        if (!image_data["cancelled"]) {
            setImageUri(image_data["uri"])
        }
    };

    function handleUploadPhoto(data: CreateFlatRequest) {
        // backend connection
        console.log(data.name);
        console.log(imageUri);
    }

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
        },
    });

    function uploadPhoto() {
    }

    const  checkForCameraRollPermission=async()=>{
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("Please grant camera roll permissions inside your system's settings");
        }else{
          console.log('Media Permissions are granted')
        }
    } 

    useEffect(() => {
        checkForCameraRollPermission()
      }, []);

    return (
        <Modal
            width={0.9}
            rounded
            actionsBordered
            style={{zIndex: 1000}}
            visible={true}
            modalTitle={<ModalTitle title="Upload Bill"  align="left" />}
            onTouchOutside={() => { setShowUploadBillModal(false)}}
        >
            <ModalContent>
                <View style={styles.imageUploadContainer}>
                    {
                    imageUri  && <Image source={{ uri: imageUri }} style={{ width: 400, height: 400 }} />
                    }
                    <Button
                        buttonStyle={styles.blueButton}
                        title={imageUri ? 'Change Image' : 'Choose Image'}
                        onPress={addImage}
                    />
                </View>
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
                    buttonStyle={styles.greenButton}
                    title="Send"
                    onPress={handleSubmit(handleUploadPhoto)}
                />
                <Button
                    buttonStyle={styles.warnButton}
                    title="Cancel"
                    onPress={() => { setShowUploadBillModal(false) }}
                />
            </ModalContent>
        </Modal>

    )
}
