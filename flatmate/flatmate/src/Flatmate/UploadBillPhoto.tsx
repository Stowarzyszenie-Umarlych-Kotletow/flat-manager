import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';


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


    function uploadPhoto() {
        console.log(imageUri);
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
            modalTitle={<ModalTitle title="Create flat"  align="left" />}
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
                <Button
                    buttonStyle={styles.greenButton}
                    title="Send"
                    onPress={uploadPhoto}
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
