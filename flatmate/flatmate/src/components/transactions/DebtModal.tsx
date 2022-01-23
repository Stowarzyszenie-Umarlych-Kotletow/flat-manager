import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";
import styles from "../../static/styles";
import { Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFlat } from "../../features/hooks";
import { useAppSelector } from "../../store";
import { showMessage } from "react-native-flash-message";
import CustomMultiPicker from "../../../lib/multiple-select";



export function DebtModal({setShowDebt}) {
	const [selectedUser, setSelectedUser] = useState([]);
  const [userWarning, setUserWarning] = useState(null);
  const [amountWarning, setamountWarning] = useState(null);
  const { flatUsers } = useFlat();
  const username = useAppSelector((state) => state.auth.user?.username);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
    },
  });

  function pay(data){
    let formOk = true;
    let warningMsg = '';
    setUserWarning(null);
    setamountWarning(null);
    if (data.amount == '') {
      warningMsg += "Make sure not to leave amount empty\n";
      formOk = false;
    }
    if (isNaN(+data.amount)) {
      warningMsg += "Input a number\n";
      formOk = false;
    }
    if (selectedUser[0] == null) {
      warningMsg += "Make sure to choose a payment maker\n";
      formOk = false;
    }

    // TODO: backend connection, make payment
    if (formOk){
      console.log(data);
      console.log(selectedUser);
      setShowDebt(false);
      showMessage({
        message: "Payment is ok",
        type: "success"
      })
    }
    else {
      showMessage({
        message: warningMsg,
        type: "danger"
      })
    }
  }

  const getUserSelectList = () => {
		let obj = {};
		flatUsers.forEach(u => {
      if (u.username != username)
      {
			  obj[u.id] = u.username;
      }
    })
		return obj;
	}

  return (
    <Modal
      width={0.9}
      rounded
      actionsBordered
      style={{ zIndex: 1000 }}
      visible={true}
      modalTitle={<ModalTitle title="Payment recived" align="left" />}
      onTouchOutside={() => {
        setShowDebt(false);
      }}
    >
    <ScrollView>
    <ModalContent>
      <Text style={styles.smallText}> Choose a person you recived the money from </Text> 
      <CustomMultiPicker
        options={getUserSelectList()}
        search={true}
        multiple={false}
        placeholder={"Search"}
        placeholderTextColor={'#757575'}
        returnValue={"value"}
        callback={(res: any[]) => { setSelectedUser(res.filter(val => !!val)); }}
        rowBackgroundColor={"#eeeeee"}
        rowHeight={40}
        rowRadius={5}
        searchIconColor={"transparent"}
        iconColor={"#00a2dd"}
        iconSize={30}
        selectedIconName={"ios-checkmark-circle-outline"}
        unselectedIconName={"ios-radio-button-off-outline"}
        scrollViewHeight={150}
      />
      {!userWarning == null ? null : <Text style={styles.warningText}>{userWarning}</Text>}

      <Text style={styles.smallText}> Input the amount recieved </Text> 
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
          placeholder="amount"
        />)}
        name="amount"
      />
      {!amountWarning == null ? null : <Text style={styles.warningText}>{amountWarning}</Text>}
      <Button
        buttonStyle={styles.greenButton}
        title="Confirm receiving payment"
        onPress={handleSubmit(pay)}
      />
      <Button
        buttonStyle={styles.orangeButton}
        title="Close"
        onPress={() => {
          setShowDebt(false);
        }}
      />
    </ModalContent>
    </ScrollView>
    </Modal>)
  }