import * as React from "react";
import { useState } from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import styles from "../../static/styles";
import { Button } from "react-native-elements";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store";
import auth from "../../features/auth";
import { Modal, ModalContent, ModalTitle } from "react-native-modals"
import { useFlat } from "../../features/hooks";
import { useDeleteAccountMutation } from "../../features/api/user-api";


export function ManageScreenModal({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const { flatId } = useFlat();
  const [deleteAccount] = useDeleteAccountMutation();

  const [showAccountDeletionBox, setShowAccountDeletionBox] = useState(false);
  const [showIncorrectPasswordWarning, setShowIncorrectPasswordWarning] = useState(false);

  async function handleDelete(data) {
    let password = data.password;

    try {
      await deleteAccount({ password }).unwrap();
      handleLogOut();
    } catch {
      setShowIncorrectPasswordWarning(true);
    }
  }

  function handleLogOut() {
    dispatch(auth.actions.logout());
  }

  const username = useAppSelector((state) => state.auth.user?.username);

  return (
    <View>
      <Text style={styles.logoText}>Manage account</Text>
      {flatId != null ? (
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
        buttonStyle={styles.redButton}
        title="Delete account"
        onPress={() => { setShowAccountDeletionBox(true) }}
      />

      <Modal
        width={0.9}
        rounded
        actionsBordered
        style={{ zIndex: 1000 }}
        visible={showAccountDeletionBox}
        modalTitle={<ModalTitle title={"Confirm account removal for " + username} align="left" />}
        onTouchOutside={() => { setShowAccountDeletionBox(false) }}
      >
			<ScrollView>
			<ModalContent>
				<Controller
					control={control}
					rules={{
						maxLength: 100,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.textInput}
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
					onPress={() => { setShowAccountDeletionBox(false) }}
				/>
				{!showIncorrectPasswordWarning ? null :
					<Text style={styles.tinyTextCenter}> Incorrect Password</Text>}

				<Button
					buttonStyle={styles.redButton}
					title="Delete account"
					onPress={handleSubmit(handleDelete)}
				/>
			</ModalContent>
			</ScrollView>
      </Modal>
    </View>
  );
}
