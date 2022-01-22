import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {TextInput, Text, View, ScrollView} from "react-native";
import {useState} from "react";
import styles from "../../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import CustomMultiPicker from "react-native-multiple-select-list";
import { useFlat } from "../../features/hooks";
import { UploadBillModal } from './UploadBillPhotoModal'
import { useAddTransactionGroupMutation } from '../../features/api/transaction-api'


export function CreateTransactionGroupModal({setShowAddTransactionGroup}) {
	const { flatId, flat, flatUsers } = useFlat();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [addTransactionGroup] = useAddTransactionGroupMutation();
  const [items, setItems] = useState({});
  const [transactionsId, setTransactionsId] = useState(0);
	const [showUploadBillModal, setShowUploadBillModal] = useState(false);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        name: '',
    },
  });


  function submitTransactionGroup(data) {
		let slicedItems = [];
		for (let key in items) {
			slicedItems.push({
				name: items[key].name, 
				price: items[key].price
			});
		}

		let transactionGroup = {
			name: data.name,
			usersConnected: selectedUsers,
			flatId: flatId,
			transactions: slicedItems
		}
		handleAddTransactionGroup(transactionGroup);
	}

	function handleAddTransactionGroup(data) {
		addTransactionGroup(data).unwrap().then((success) => {
			setShowAddTransactionGroup(false);
		});
  }
	
	const getUserSelectList = () => {
		let obj = {};
		flatUsers.forEach(u => {
				obj[u.id] = u.username;
		})
		return obj;
	}

  function addItem() {
		let newItems = items;
		newItems[transactionsId] = {
			id: transactionsId,
			name: "",
			price: 0,
		}
		setTransactionsId(transactionsId + 1);
		setItems(newItems);
		//backend connection
		console.log(newItems);
  }

	function removeItem(id) {
		let its = Object.assign({}, items);
		delete its[id];
		setItems(its);
		//backend connection
	}

	function uploadPhoto(uri) {
		console.log(uri);
		//backend connection
	}
  return (
    <Modal
		width={0.9}
    height={0.95}
		rounded
		actionsBordered
		style={{zIndex: 1000}}
		visible={true}
		modalTitle={<ModalTitle title="Add Transaction Group"  align="left" />}
		onTouchOutside={() => { setShowAddTransactionGroup(false)}}
	>
	<ScrollView>
	<ModalContent>
		<View>
			<Text style={styles.tinyTextCenter}> Set Transaction Group Title </Text>
			<Controller
				control={control}
				name="name"
				rules={{
				maxLength: 100,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
				<TextInput
					style={styles.textInput}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
					placeholder="Transaction Group Name"
				/>
				)}
			/>
		</View>
		<Text style={styles.tinyTextCenter}> Items </Text>
		{Object.keys(items).length === 0 ? (<Text> No Items Yet </Text>) : null } 

		{Object.values(items).map((item) => {

				function changeItemsName(value) {
					let new_items = items;
					new_items[item["id"]]["name"] = value;
					setItems(new_items);
					// backend connection
				} 

				function changeItemsPrice(value) {
					let new_items = items;
					new_items[item["id"]]["price"] = value;
					setItems(new_items);
					// backend connection
				} 

			return(
				<View style={styles.viewRow} key={item["id"]}>
					<TextInput
						style={styles.textInput}
						placeholder="Name"
						onChangeText={changeItemsName}
					/>
					<TextInput				
						style={styles.textInput}
						placeholder="Price"
						onChangeText={changeItemsPrice}
					/> 
					<Button
						buttonStyle={styles.redButton}
						title="X"
						onPress={() => {removeItem(item["id"])}}
					/>
				</View>
		)})
		}

		<Text style={styles.tinyTextCenter}> Assign Users to Transaction Group </Text>
		<CustomMultiPicker
			options={getUserSelectList()}
			search={true}
			multiple={true} //
			placeholder={"Search"}
			placeholderTextColor={'#757575'}
			returnValue={"value"}
			callback={(res: any[]) => { setSelectedUsers(res.filter(val => !!val)); }}
			rowBackgroundColor={"#eee"}
			rowHeight={40}
			rowRadius={5}
			iconColor={"#00a2dd"}
			iconSize={30}
			selectedIconName={"ios-checkmark-circle-outline"}
			unselectedIconName={"ios-radio-button-off-outline"}
			scrollViewHeight={130}
		/>


		<View style={styles.viewColumnCenter}>
			<Button
				buttonStyle={styles.blueButtonNarrow}
				title="Add Item"
				onPress={() => {addItem()}}
			/>
			<Button
				buttonStyle={styles.blueButtonNarrow}
				title="Upload Bill"
				onPress={() => {setShowUploadBillModal(true)}}
			/>
      <Button
				buttonStyle={styles.greenButtonNarrow}
				title="Submit"
				onPress={handleSubmit(submitTransactionGroup)}
			/>
			<Button
				buttonStyle={styles.redButtonNarrow}
				title="Cancel"
				onPress={() => { setShowAddTransactionGroup(false) }}
			/>
		</View>

		{ showUploadBillModal ? (
			<UploadBillModal 
				setShowUploadBillModal={setShowUploadBillModal}
				uploadPhoto={uploadPhoto}
			/>
		) : null}
	</ModalContent>
	</ScrollView>
	</Modal>
  );
}