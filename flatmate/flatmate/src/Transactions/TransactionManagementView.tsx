import * as React from "react";
import {useState} from "react";
import styles from "../static/styles";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import { TransactionCard } from "./TransactionCard"
import { CreateTransactionGroup } from "./CreateTransactionGroup";
import { useAppSelector } from "../store";
import { BottomNavigationBar } from "../common/BottomNavigationBar";


export function TransactionManagementView({navigation}) {
	function getTransactionGroups() {
		return [
			{ 
				id: 1,
				paid_by: 123,
				total: 45,
				date: '21/01/2022',
				title: 'Zakupy Carefour',
				transactions: [
					{
						id: 1,
						name: "ciasteczka",
						total: 10,
						shares: [
							{id: 123, percentage : 60, resolved: true},
							{id: 124, percentage : 40, resolved: false},
						],
					},
					{
						id: 2,
						name: "chipsy 4 paczki",
						total: 15,
						shares: [
							{id: 123, percentage : 75, resolved: false},
							{id: 124, percentage : 25, resolved: false},
						],
					},
					{
						id: 3,
						name: "papier toaletowy",
						total: 20,
						shares: [
							{id: 123, percentage : 50, resolved: true},
							{id: 124, percentage : 50, resolved: true},
						],
					}
				],
				participants: [
					123, 122
				]
			},
			{ 
				id: 2,
				paid_by: 124,
				total: 427,
				date: '20/01/2022',
				title: 'Wyjście do restauracji',
				transactions: [
					{
						id: 4,
						name: "mleko czekoladowe",
						total: 12,
						shares: [
							{id: 122, percentage : 50, resolved: false},
							{id: 124, percentage : 50, resolved: false},
						],
					},
					{
						id: 5,
						name: "fajerwerki",
						total: 15,
						shares: [
							{id: 121, percentage : 25, resolved: false},
							{id: 124, percentage : 75, resolved: false},
						],
					},
					{
						id: 6,
						name: "ekspres do kawy",
						total: 400,
						shares: [
							{id: 121, percentage : 25, resolved: false},
							{id: 122, percentage : 25, resolved: false},
							{id: 123, percentage : 25, resolved: false},
							{id: 124, percentage : 25, resolved: false},
						],
					}
				],
				participants: [
					123, 124, 121, 122
				]
			},

		]
	}

	const [showAddTransactionGroup, setShowAddTransactionGroup] = useState(false);
    const userId = useAppSelector((state) => state.auth.user?.id);

    // const {currentData: transactionGroups = []} = getTransactionGroups();

    return (
		<View style={{ maxHeight: 'calc(100vh - 75px)' }}>
			<View style={{ 
				height: 'calc(100vh - 150px)', 
				display: "flex", 
				flexDirection: "column"
				}}
			>
					<Text style={styles.logoText}>Transactions</Text>
			<Button
				buttonStyle={styles.greenButton}
				title="Create Transaction Group"
				onPress={() => setShowAddTransactionGroup(true)}
			/>
			{Object.values(getTransactionGroups()).map((transactionGroup) => {
				return (
					<TransactionCard transactionGroup={transactionGroup} key={transactionGroup.id}/>
			);})}        
			</View>
			{ showAddTransactionGroup ? (
			<CreateTransactionGroup 
				setShowAddTransactionGroup={setShowAddTransactionGroup} 
			/>) 
			: null }
			<BottomNavigationBar
				openUsers={() => { navigation.navigate('Users'); }}
				openTasks={() => { navigation.navigate('Tasks'); }}
				openCalendar={() => { navigation.navigate('ViewCalendarScreen'); }}
				openTransactionManager={() => {navigation.navigate('TransactionManagementView')}}
				openDashboard={()=>{navigation.navigate('DashboardScreen')}}
			/>
		</View>
		)
}