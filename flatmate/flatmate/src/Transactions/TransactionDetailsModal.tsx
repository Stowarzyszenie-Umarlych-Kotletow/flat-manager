import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import * as React from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import { TransactionShare } from "./TransactionShare";
import { EditTransactionGroup } from "./EditTransactionGroup";
import {Button} from "react-native-elements";
import {useState} from "react";


export function TransactionDetailsModal({setShowTransactionDetailsModal, transactionGroup}) {
  function getUsername(userid) {
		let names = {
			121 : "Romuald",
			122 : "Krzyś",
			123 : "Adam",
			124 : "Edward"
		}
    let username = names[userid];
    return username ? username : "Name not found"
	} 

  const [showEditTransactionGroup, setShowEditTransactionGroup] = useState(false);

  return ( 
  <Modal
    width={0.9}
    rounded
    actionsBordered
    style={{zIndex: 1000}}
    visible={true}
    modalTitle={<ModalTitle title="Transaction Details"  align="left" />}
    onTouchOutside={() => { setShowTransactionDetailsModal(false)}}
>
    <ModalContent>
    <Button
      buttonStyle={styles.warnButton}
      title="Hide Details"
      onPress={() => { setShowTransactionDetailsModal(false) }}
    />
    <Button
      buttonStyle={styles.blueButton}
      title="Edit Transaction"
      onPress={() => { setShowEditTransactionGroup(true) }}
    />
    <Text style={styles.smallTextStart}>
    { 
      transactionGroup.participants.map(participant => {
      return getUsername(participant)+ " ";
    })}
    </Text>

    <View style={styles.transactionItems}>
    { 
      Object.values(transactionGroup.transactions).map((transaction) => {
      return (
          <View style={styles.viewRow} key={transaction["id"]}>
            <Text style={styles.tinyText}>{transaction["name"]}</Text>
            <Text style={styles.tinyText}> {transaction["total"]}zł</Text> 
          </View>
          // { <TransactionShare transaction={transaction}/> }
      );
    })}
    </View>

    { showEditTransactionGroup ? (
        <EditTransactionGroup 
          setShowAddTransactionGroup={setShowEditTransactionGroup} 
          transactionGroup={transactionGroup}
          isNewGroup={false}
        />) 
		: null }
    </ModalContent>
    </Modal>
  );
}