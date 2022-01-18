import * as React from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";


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

  return (
    <View style={styles.transactionCard}>
    <Text style={styles.bigText}>Transactions paid by {getUsername(transactionGroup.paid_by)}</Text>
    { Object.values(transactionGroup.transactions).map((transaction) => {
      return (
        <View key={transaction["id"]}>
          <Text style={styles.smallText}>Name: {transaction["name"]} Total: {transaction["total"]}</Text>
          {/* {
            Object.values(transaction["shares"]).map(([share]) => {
              <Text key={share.id} style={styles.tinyText}>{getUsername(share.id)} - {share.value * transaction["total"] / 100}</Text>
          })} */}
        </View>
      );
    })}
    </View>
  );
};