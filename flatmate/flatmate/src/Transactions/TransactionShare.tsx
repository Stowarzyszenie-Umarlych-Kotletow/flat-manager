import * as React from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";


export function TransactionShare({transaction}) {
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
    <View>
      {
        Object.values(transaction["shares"]).map((percentage) => {
          return(
            <Text key={percentage["id"]} style={styles.tinyText}>{getUsername(percentage["id"])} - {percentage["percentage"] * transaction["total"] / 100}zł</Text>
          );  
        })}
    </View>
  );
};