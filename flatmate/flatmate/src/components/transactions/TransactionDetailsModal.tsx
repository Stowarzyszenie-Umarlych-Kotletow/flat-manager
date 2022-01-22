import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import * as React from "react";
import styles from "../../static/styles";
import {ScrollView, Text, View} from "react-native";
import {Button} from "react-native-elements";
import { Transaction } from "../../models/transaction.model";
import { useFlat } from "../../features/hooks";


export function TransactionDetailsModal({setShowTransactionDetailsModal, transactionGroup}) {
  const { flat, flatId, flatTasks, flatUsers } = useFlat();

  function getUsername(userId: string): string {
    for (let user of flatUsers) {
        return user.username;
    }
    return "Unknown user";
  } 


  return ( 
  <Modal
    width={0.9}
    height={0.95}
    rounded
    actionsBordered
    style={{zIndex: 1000}}
    visible={true}
    modalTitle={<ModalTitle title="Transaction Details"  align="left" />}
    onTouchOutside={() => { setShowTransactionDetailsModal(false)}}
  >
  <ScrollView>
  <ModalContent>
    <Button
      buttonStyle={styles.redButton}
      title="Hide Details"
      onPress={() => { setShowTransactionDetailsModal(false) }}
    />
    <Text style={styles.smallText}>
    { 
      transactionGroup.usersConnected.map(participant => {
      return getUsername(participant)+ " ";
    })}
    </Text>

    <View style={styles.borderLeftBlack}>
    { 
      Object.values(transactionGroup.transactions).map((transaction: Transaction) => {
      return (
        <View style={styles.viewRow} key={transaction["id"]}>
          <Text style={styles.tinyTextCenter}>{transaction.name}</Text>
          <Text style={styles.tinyTextCenter}> {transaction.price}zł</Text> 
        </View>
      );
    })}
    </View>
  </ModalContent>
  </ScrollView>
  </Modal>
  );
}