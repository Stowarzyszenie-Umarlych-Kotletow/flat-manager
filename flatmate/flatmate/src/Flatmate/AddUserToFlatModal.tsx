import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";
import styles from "../static/styles";
import { Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useAppDispatch} from "../store";
import { useFlat } from "../features/hooks";
import { userApi } from "../features/api/user-api";
import { useAddUserToFlatMutation } from "../features/api/flat-api";

export function AddUserToFlatModal({ setShowAddUserToFlatModal }) {

  const [usernameWarning, setUsernameWarning] = useState(null);
  const dispatch = useAppDispatch();
  const { flatId } = useFlat();
  const [addUser] = useAddUserToFlatMutation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
    },
  });

  async function completeAddUser(data) {
    let warning: string = null;
    const username = data.username;
    if (username) {
      try {
        const action = userApi.endpoints.getUserByUsername.initiate({username});
        const userId = (await dispatch(action).unwrap()).id;
        
        await addUser({ flatId, userId }).unwrap();

        setShowAddUserToFlatModal(false);
      } catch (err) {
        warning = `Cannot add user (error ${err.status})`;
      }
    } else {
      warning = "The username must not be empty";
    }
    setUsernameWarning(warning);
  }


  return (
  <Modal
    width={0.9}
    rounded
    actionsBordered
    style={{ zIndex: 1000 }}
    visible={true}
    modalTitle={<ModalTitle title="Add user" align="left" />}
    onTouchOutside={() => {
      setShowAddUserToFlatModal(false);
    }}
  >
	<ScrollView>
	<ModalContent>
		<Controller
			control={control}
			rules={{
				maxLength: 100,
			}}
			render={({ field: { onChange, onBlur, value } }) => (<TextInput
				style={styles.textInput}
				onBlur={onBlur}
				onChangeText={onChange}
				value={value}
				placeholder="Username"
			/>)}
			name="username"
		/>
		{!usernameWarning == null ? null : <Text style={styles.warningText}>{usernameWarning}</Text>}
		<Button
			buttonStyle={styles.blueButton}
			title="Add User"
			onPress={handleSubmit(completeAddUser)}
		/>
		<Button
			buttonStyle={styles.blueButton}
			title="Close"
			onPress={() => {
				setShowAddUserToFlatModal(false);
			}}
		/>
	</ModalContent>
	</ScrollView>
  </Modal>)
}