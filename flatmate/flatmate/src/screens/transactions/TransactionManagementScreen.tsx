import * as React from "react";
import {useState} from "react";
import styles from "../../static/styles";
import { Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { TransactionCard } from "../../components/transactions/TransactionCard"
import { CreateTransactionGroupModal } from "../../components/transactions/CreateTransactionGroupModal";
import { useAppSelector } from "../../store";
import { BottomNavigationBar } from "../../components/main/BottomNavigationBar";
import { useGetTransactionGroupsByFlatIdQuery } from "../../features/api/transaction-api";
import { useFlat } from "../../features/hooks";

export function TransactionManagementScreen({navigation}) {
	const { flat, flatId, flatTasks, flatUsers } = useFlat();
	const {currentData: groups = []} = useGetTransactionGroupsByFlatIdQuery({flatId}, {refetchOnMountOrArgChange: true});

	const [showAddTransactionGroup, setShowAddTransactionGroup] = useState(false);
    const userId = useAppSelector((state) => state.auth.user?.id);

    return (
		<View style={styles.container1Navbar}>
			<Text style={styles.logoText}>Transactions</Text>
			<Button
				buttonStyle={styles.greenButton}
				title="Create Transaction Group"
				onPress={() => setShowAddTransactionGroup(true)}
			/>
			<ScrollView style={styles.container2Navbars} >
				{groups.map((transactionGroup) => {
					return (
						<TransactionCard transactionGroup={transactionGroup} key={transactionGroup.id}/>
				);})}        
			</ScrollView>
			{ showAddTransactionGroup ? (
			<CreateTransactionGroupModal
				setShowAddTransactionGroup={setShowAddTransactionGroup} 
			/>) 
			: null }
		  <BottomNavigationBar navigation={navigation} />
		</View>
		)
}