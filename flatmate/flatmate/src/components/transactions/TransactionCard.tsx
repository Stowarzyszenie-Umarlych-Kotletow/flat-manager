import * as React from "react";
import {useState} from "react";
import styles from "../../static/styles";
import {Text, View, TouchableOpacity} from "react-native";
import {TransactionDetailsModal} from "./TransactionDetailsModal";
import {useFlat} from "../../features/hooks";
import {formatDate} from "../../helpers/date-helper";
import { CURRENCY } from "../../config";

const deleteIcon = require("../../static/taskDelete.svg") as string;

export function TransactionCard({transactionGroup}) {
  const {flat, flatId, flatTasks, flatUsers} = useFlat();
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);


  function getUsername(userId: string): string {
    for (const user of flatUsers) {
        if(userId == user.id)
            return user.username;
    }
    return "Unknown user";
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setShowTransactionDetails(true)
      }}
    >
      <View style={styles.viewRow}>
        <Text style={styles.cardTitle}>{transactionGroup.name}</Text>
        <Text style={styles.cardText}>{formatDate(transactionGroup.dateCreated)}</Text>
      </View>

      <View style={styles.viewRow}>
        <Text style={styles.cardText}>{getUsername(transactionGroup.createdBy)}</Text>
        <Text style={styles.cardText}>{transactionGroup.sumOfTransactions} {CURRENCY}</Text>
      </View>

      <View style={styles.viewRow}>
        
      </View>
      {showTransactionDetails ? (
        <TransactionDetailsModal setShowTransactionDetailsModal={setShowTransactionDetails}
                                 transactionGroup={transactionGroup}/>
      ) : null}
    </TouchableOpacity>
  );
};