import { Modal, ModalContent, ModalTitle } from "react-native-modals";
import { TextInput, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import styles from "../../static/styles";
import { Button } from "react-native-elements";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import CustomMultiPicker from "react-native-multiple-select-list";
import { useFlat } from "../../features/hooks";
import { UploadBillModal } from './UploadBillPhotoModal'
import { useAddTransactionGroupMutation } from '../../features/api/transaction-api'
import ocrService from "../../services/ocr.service";
import { Transaction } from "../../models/transaction.model";


const itemDeleteIcon = require("../../static/taskDelete.svg") as string;

type TransactionState = {
	id: number;
	name: string;
	price: string;
}

export function CreateTransactionGroupModal({ setShowAddTransactionGroup }) {
	const { flatId, flat, flatUsers } = useFlat();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [addTransactionGroup] = useAddTransactionGroupMutation();
	const [items, setItems] = useState<TransactionState[]>([]);
	const [showUploadBillModal, setShowUploadBillModal] = useState(false);

	const { control, handleSubmit, formState: { errors } } = useForm({
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

		const transactionGroup = {
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

	function newItem() {
		appendItems([{ name: "", price: "" }]);
	}

	function appendItems(newItems: Transaction[]) {
		let currentId = items.length;
		const editedItems = [
			...items,
			...newItems.map(item => ({
				...item,
				id: currentId += 1
			}))];
		setItems(editedItems);
	}

	function removeItem(id: number) {
		const newItems = items.filter(item => item.id != id);
		setItems(newItems);
	}

	async function uploadPhoto(uri: string) {
		const blob = await (await fetch(uri)).blob();
		const parsedItems = await ocrService.uploadReceipt(blob);
		appendItems(parsedItems.data);

	}
	return (
		<Modal
			width={0.9}
			rounded
			actionsBordered
			style={{ zIndex: 1000 }}
			visible={true}
			modalTitle={<ModalTitle title="Add Transaction Group" align="left" />}
			onTouchOutside={() => { setShowAddTransactionGroup(false) }}
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
					{items.length === 0 ? (<Text> No Items Yet </Text>) : null}

					{items.map((item) => {

						function changeItemsName(value) {
							item.name = value;
							setItems([...items]);
						}

						function changeItemsPrice(value) {
							item.price = value;
							setItems([...items]);
						}

						return (
							<View style={styles.viewRow} key={item.id}>
								<TextInput
									style={styles.textInput}
									placeholder="Name"
									defaultValue={item.name}
									onChangeText={changeItemsName}
								/>
								<TextInput
									style={styles.textInput}
									placeholder="Price"
									defaultValue={item.price}
									onChangeText={changeItemsPrice}
								/>
								<TouchableOpacity
									onPress={() => { removeItem(item.id); }}
								>
									<img src={itemDeleteIcon} alt=" " style={{width: '35px', height: '35px'}}/>
								</TouchableOpacity>
							</View>
						)
					})
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
						<View style={styles.viewRowSpaceAround}>
							<Button
								buttonStyle={styles.blueButtonNarrow}
								title="Add Item"
								onPress={newItem}
							/>
							<Button
								buttonStyle={styles.blueButtonNarrow}
								title="Upload Bill"
								onPress={() => { setShowUploadBillModal(true) }}
							/>
						</View>
						<View style={styles.viewRowSpaceAround}>
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
					</View>

					{showUploadBillModal ? (
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