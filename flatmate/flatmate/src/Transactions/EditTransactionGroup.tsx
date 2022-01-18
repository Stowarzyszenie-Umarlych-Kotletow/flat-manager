import {Modal, ModalContent, ModalTitle} from "react-native-modals";
import {TextInput, Text, View} from "react-native";
import {useState} from "react";
import styles from "../static/styles";
import {Button} from "react-native-elements";
import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import CustomMultiPicker from "react-native-multiple-select-list";
import { useFlat } from "../features/hooks";
import { UploadBillModal } from './UploadBillPhoto'


export function EditTransactionGroup({setShowAddTransactionGroup, transactionGroup, isNewGroup}) {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
        name: transactionGroup["name"],
    },
  });

  function handleAddTransactionGroup(data) {
		setShowAddTransactionGroup(false)
		// backend connection
  }
	
	const { flatId, flat, flatUsers } = useFlat();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const getUserSelectList = () => {
		let obj = {};
		flatUsers.forEach(u => {
				obj[u.id] = u.username;
		})
		return obj;
	}


  function addItem() {
		let new_items = items;
		new_items[transactionsId] = {
			id: transactionsId,
			name: "",
			price: 0,
		}
		setTransactionsId(transactionsId + 1);
		setItems(new_items);
		//backend connection
		console.log(new_items);
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



  const [items, setItems] = useState({});
  const [transactionsId, setTransactionsId] = useState(0);
	const [showUploadBillModal, setShowUploadBillModal] = useState(false);

  return (
    <Modal
		width={0.9}
		rounded
		actionsBordered
		style={{zIndex: 1000, paddingLeft: 10, paddingRight: 10}}
		visible={true}
		modalTitle={<ModalTitle title="Add Transaction Group"  align="left" />}
		onTouchOutside={() => { setShowAddTransactionGroup(false)}}
	>
	<ModalContent>
		{isNewGroup ? (
		<View>
			<Text style={styles.tinyText}> Set Transaction Group Title </Text>
			<Controller
				control={control}
				name="name"
				rules={{
				maxLength: 100,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
				<TextInput
					style={styles.accFormTextInput}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
					placeholder="Transaction Group Name"
				/>
				)}
			/>
		</View>
		): <Text style={styles.bigText}> {transactionGroup.title} </Text>}

		<Text style={styles.tinyText}> Items </Text>
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
            style={styles.accFormTextInput}
						placeholder="Name"
						onChangeText={changeItemsName}
					/>
					<TextInput				
						style={styles.accFormTextInput}
						placeholder="Price"
						onChangeText={changeItemsPrice}
					/> 
					<Button
						buttonStyle={styles.warnButton}
						title="X"
						onPress={() => {removeItem(item["id"])}}
					/>
		 		</View>
		 )})
		}

		<Text style={styles.tinyText}> Assign Users to Transaction Group </Text>
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


		<View style={styles.viewRowCrowdy}>
			<Button
				buttonStyle={styles.blueButtonSmall}
				title="Add Item"
				onPress={() => {addItem()}}
			/>
			<Button
				buttonStyle={styles.blueButtonSmall}
				title="Upload Bill"
				onPress={() => {setShowUploadBillModal(true)}}
			/>
		</View>
	
		
		<View style={styles.viewRowCrowdy}>
			<Button
				buttonStyle={styles.greenButtonSmall}
				title="Submit"
				onPress={handleSubmit(handleAddTransactionGroup)}
			/>
			<Button
				buttonStyle={styles.redButtonSmall}
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
	</Modal>
  );
}