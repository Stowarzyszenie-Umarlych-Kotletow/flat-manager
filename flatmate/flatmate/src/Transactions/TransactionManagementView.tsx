import * as React from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import { TransactionCard } from "./TransactionCard"


export function TransactionManagementView() {
	function getTransactionGroups() {
		return [
			{ 
				id: 1,
				paid_by: 123,
				transactions: [
					{
						id: 1,
						name: "ciasteczka",
						total: 10,
						shares: [
							{id: 123, value : 60},
							{id: 124, value : 40},
						],
					},
					{
						id: 2,
						name: "chipsy 4 paczki",
						total: 15,
						shares: [
							{id: 123, value : 75},
							{id: 124, value : 25},
						],
					},
					{
						id: 3,
						name: "papier toaletowy",
						total: 20,
						shares: [
							{id: 123, value : 50},
							{id: 124, value : 50},
						],
					}
				],
			},
			{ 
				id: 2,
				paid_by: 124,
				transactions: [
					{
						id: 1,
						name: "mleko czekoladowe",
						total: 12,
						shares: [
							{id: 122, value : 50},
							{id: 124, value : 50},
						],
					},
					{
						id: 2,
						name: "fajerwerki",
						total: 15,
						shares: [
							{id: 121, value : 25},
							{id: 124, value : 75},
						],
					},
					{
						id: 3,
						name: "ekspres do kawy",
						total: 400,
						shares: [
							{id: 121, value : 25},
							{id: 122, value : 25},
							{id: 123, value : 25},
							{id: 124, value : 25},
						],
					}
				],
			},

		]
	}

    // const {currentData: transactionGroups = []} = getTransactionGroups();

    return (
    <View style={{
        overflow: "scroll", 
        height: 'calc(100vh - 75px)', 
        display: "flex", 
        flexDirection: "column", 
        paddingBottom: "20px"
        }}
    >
        <Text style={styles.logoText}>Manage flats</Text>

        {Object.values(getTransactionGroups()).map((transactionGroup) => {
            return (
				<TransactionCard transactionGroup={transactionGroup} key={transactionGroup.id}/>
			);
        })}        
    </View>)
}