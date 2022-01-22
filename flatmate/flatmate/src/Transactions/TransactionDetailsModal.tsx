import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import * as React from "react";
import styles from "../static/styles";
import {ScrollView, Text, View} from "react-native";
import {Button} from "react-native-elements";


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
      transactionGroup.participants.map(participant => {
      return getUsername(participant)+ " ";
    })}
    </Text>

    <View style={styles.borderLeftBlack}>
    { 
      Object.values(transactionGroup.transactions).map((transaction) => {
      return (
        <View style={styles.viewRow} key={transaction["id"]}>
          <Text style={styles.tinyTextCenter}>{transaction["name"]}</Text>
          <Text style={styles.tinyTextCenter}> {transaction["total"]}zł</Text> 
        </View>
      );
    })}
    </View>
  </ModalContent>
  </ScrollView>
  </Modal>
  );
}