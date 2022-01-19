import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, View, TouchableOpacity} from "react-native";
import { TransactionShare } from "./TransactionShare";
import { TransactionDetailsModal } from "./TransactionDetailsModal";


export function TransactionCard({transactionGroup}) {
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

	const [showTransactionDetails, setShowTransactionDetails] = useState(false);


  return (
    <TouchableOpacity 
      style={styles.transactionGroupCard}
      onPress={()=>{setShowTransactionDetails(true)}}
    >
      <View style={styles.viewRow}>
        <Text style={styles.transactionCardText}>{transactionGroup.title}</Text>
        <Text style={styles.transactionCardText}>{transactionGroup.date}</Text>
      </View>

      <View style={styles.viewRow}>
        <Text style={styles.transactionCardText}>{getUsername(transactionGroup.paid_by)}</Text>
        <Text style={styles.transactionCardText}>{transactionGroup.total}PLN</Text>
      </View>

      {showTransactionDetails? (
        <TransactionDetailsModal setShowTransactionDetailsModal={setShowTransactionDetails} transactionGroup={transactionGroup}/>
      ): null}
    </TouchableOpacity>
  );
};