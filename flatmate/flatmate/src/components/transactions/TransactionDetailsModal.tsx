import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import * as React from "react";
import styles from "../../static/styles";
import {useState} from "react";
import {ScrollView, Text, View, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {Transaction} from "../../models/transaction.model";
import {useFlat} from "../../features/hooks";
import {useDeleteTransactionGroupMutation, useResolveDebtMutation} from "../../features/api/transaction-api";
import {CURRENCY} from "../../config";
import {useAppSelector} from "../../store";
import {ResolveUserDebtRequest} from "../../models/api/transaction";
import {showMessage} from "react-native-flash-message";
import flatSlice from "../../features/flat";

const dollarIcon = require("../../static/dollar.svg") as string;


export function TransactionDetailsModal({setShowTransactionDetailsModal, transactionGroup}) {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {flat, flatId, flatTasks, flatUsers} = useFlat();
  const [deleteTransactionGroup] = useDeleteTransactionGroupMutation();
  const [resolveDebt] = useResolveDebtMutation();

  function getUsername(userId: string): string {
    for (const user of flatUsers) {
      if (userId == user.id)
        return user.username;
    }
    return "Unknown user";
  }

  function handleDeleteTransactionGroup() {
    const dataDict = {
      transactionGroupId: transactionGroup.id,
    };
    deleteTransactionGroup(dataDict).unwrap()
      .then(
        ()=>{
          showMessage({
            message: `Transaction group deleted`,
            type: "success"
          })
        },
        ()=>{
          showMessage({
            message: "Could not delete transaction group",
            type: "danger"
          })
        }
      )
  }

  function getParticipantsButNoOwner() {
    let participants = []
    console.log(transactionGroup.debts)
    for (let user in transactionGroup.usersConnected) {
      for (let debt in transactionGroup.debts) {
        if (transactionGroup.usersConnected[user] == transactionGroup.debts[debt].userId) {
          participants.push(transactionGroup.debts[debt])
        }
      }
    }
    return participants;
  }

  function handleResolveDebt(id) {
    const data: ResolveUserDebtRequest = {
      transactionGroupId: transactionGroup.id,
      userId: id,
    };
    const username = getUsername(id)
    resolveDebt(data).unwrap()
      .then(
        ()=>{
          showMessage({
            message: `Resolved ${username}'s debt`,
            type: "success"
          })
        },
        ()=>{
          showMessage({
            message: "Could not resolve debt",
            type: "danger"
          })
        }
      )
    console.log(id)
    console.log(transactionGroup.id)
  }

  return (
    <Modal
      width={0.9}
      rounded
      actionsBordered
      style={{zIndex: 1000}}
      visible={true}
      modalTitle={<ModalTitle title={transactionGroup.name} align="left"/>}
      onTouchOutside={() => {
        setShowTransactionDetailsModal(false)
      }}
    >
      <ScrollView>
        <ModalContent>
          <Text style={styles.tinyTextCenter}>Items:</Text>
          <View style={styles.borderLeftBlack}>
            {
              Object.values(transactionGroup.transactions).map((transaction: Transaction) => {
                return (
                  <View style={styles.viewRow} key={transaction.name + '' + transaction.price}>
                    <Text style={styles.tinyTextCenter}>{transaction.name}</Text>
                    <Text style={styles.tinyTextCenter}> {(+transaction.price).toFixed(2)} {CURRENCY}</Text>
                  </View>
                );
              })}
          </View>
          <Text style={styles.tinyTextCenter}>Participants:</Text>
          <View style={styles.borderLeftBlack}>
            {
              Object.values(transactionGroup.usersConnected).map((userId: string) => {
                return (
                  <View style={styles.viewRow} key={getUsername(userId)}>
                    <Text style={styles.tinyTextCenter}>{getUsername(userId)}</Text>
                  </View>
                );
              })}
          </View>
          {transactionGroup.createdBy == userId ?(
            <Text style={styles.tinyTextCenter}>Debts to resolve:</Text>
            )
          : null}
          {transactionGroup.createdBy == userId ?
            Object.values(getParticipantsButNoOwner()).map(participant => {
              return (
                <View key={participant.userId} style={styles.card}>
                  <View style={styles.viewRow}>
                    <Text style={styles.smallText}>{getUsername(participant.userId)}: {participant.amount}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleResolveDebt(participant.userId);
                      }}
                    >
                      <img src={dollarIcon} alt=" " style={{width: '20px', height: '20px'}}/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }) : null}
          <Button
            buttonStyle={styles.orangeButton}
            title="Hide Details"
            onPress={() => {
              setShowTransactionDetailsModal(false)
            }}
          />
          <Button
            buttonStyle={styles.redButton}
            title="Delete Transaction Group"
            onPress={() => {
              handleDeleteTransactionGroup();
              setShowTransactionDetailsModal(false);
            }}
          />
        </ModalContent>
      </ScrollView>
    </Modal>
  );
}